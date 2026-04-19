const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');

// 1. Database Connections
const authDb = new Sequelize({ dialect: 'sqlite', storage: path.join(__dirname, 'auth.sqlite'), logging: false });
const grievancesDb = new Sequelize({ dialect: 'sqlite', storage: path.join(__dirname, 'grievances.sqlite'), logging: false });
const earningsDb = new Sequelize({ dialect: 'sqlite', storage: path.join(__dirname, 'earnings.sqlite'), logging: false });

// 2. Model Definitions
const User = authDb.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Worker', 'Verifier', 'Advocate'), defaultValue: 'Worker' }
}, { timestamps: false });

const RefreshToken = authDb.define('RefreshToken', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expiryDate: { type: DataTypes.DATE, allowNull: false }
}, { timestamps: false });

const Grievance = grievancesDb.define('Grievance', {
    workerId: { type: DataTypes.STRING, allowNull: false },
    workerName: { type: DataTypes.STRING, allowNull: false },
    platform: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Verified', 'Resolved', 'Escalated'), defaultValue: 'Pending' },
    tags: { type: DataTypes.STRING, defaultValue: '[]' }
}, { timestamps: false });

const Earning = earningsDb.define('Earning', {
    workerId: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    platform: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    deductions: { type: DataTypes.FLOAT, allowNull: false },
    hoursWorked: { type: DataTypes.FLOAT, defaultValue: 0 },
    date: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    screenshotUrl: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'earnings', timestamps: false });

const platforms = ['Uber', 'Careem', 'Bykea', 'Foodpanda', 'InDrive', 'Cheetay', 'Savyour'];
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad'];
const workerNames = ['Ahmed Khan', 'Sarah Jenkins', 'Liu Wei', 'Carlos Rodriguez', 'Priya Sharma'];

async function seed() {
    try {
        console.log('--- SQL SEEDING STARTING (SQLite) ---');
        
        // Sync & Clear
        await authDb.sync({ force: true });
        await grievancesDb.sync({ force: true });
        await earningsDb.sync({ force: true });

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        // 1. Seed Users
        const seededUsers = [];
        for(let name of workerNames) {
            seededUsers.push({ name, email: `${name.toLowerCase().replace(' ', '.')}@fairgig.com`, password, role: 'Worker' });
        }
        seededUsers.push({ name: 'Verifier Pro', email: 'verifier@fairgig.com', password, role: 'Verifier' });
        seededUsers.push({ name: 'Advocate Global', email: 'advocate@fairgig.com', password, role: 'Advocate' });
        
        const createdUsers = await User.bulkCreate(seededUsers);
        const workers = createdUsers.filter(u => u.role === 'Worker');
        console.log(`✅ ${createdUsers.length} Users Created.`);

        // 2. Seed Earnings (150+ logs)
        const earnings = [];
        for (let worker of workers) {
            for (let i = 0; i < 30; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                
                const platform = platforms[Math.floor(Math.random() * platforms.length)];
                const city = cities[Math.floor(Math.random() * cities.length)];
                
                let base = platform === 'Uber' ? 800 : platform === 'Careem' ? 750 : 500;
                let amount = base + (Math.random() * 400);
                let deductions = 5 + (Math.random() * 15);
                
                if (Math.random() > 0.9) deductions += 30; // Anomaly
                if (Math.random() > 0.95) amount = 15; // Crash

                earnings.push({
                    workerId: worker.id.toString(),
                    city,
                    platform,
                    amount: parseFloat(amount.toFixed(2)),
                    deductions: parseFloat(deductions.toFixed(2)),
                    hoursWorked: Math.floor(Math.random() * 8) + 2, // 2-10 hours
                    date: date.toISOString().split('T')[0],
                    status: i < 5 ? 'Pending' : 'Verified', // First 5 are pending for verifier
                    screenshotUrl: i < 5 ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWuB6Q9x6Y6GcN0o7IUVFtD_eAjj5r-4dyR8YhN9b-tq77BwT9yGndy8GlXHDzCWL3VbrEfgPgXe_QgU5dLdjCxh-kBJG-lpa3MKpFYpdKdOk5Thj7ywgOaW2MX5YLRFdu-r31ckBvbbo8ICs7sgHKdRGBIpYHnZ1qzJv7smvuIaLF9LeInq6CbYFf9IVGn58g_fqTegmi78XDo1tbOUhQSYVOZ-AzwaxV7Vsi6-gZzptkzj-bosBduqeOyi2K6NkIABlkl1ISRqGT' : null
                });
            }
        }
        await Earning.bulkCreate(earnings);
        console.log(`✅ ${earnings.length} Earning Logs generated.`);

        // 3. Seed Grievances
        const grievances = [
            {
                workerId: workers[0].id.toString(),
                workerName: workers[0].name,
                platform: 'Uber',
                description: 'Unexpected $40 deduction for Account Adjustment. No clarification.',
                status: 'Pending',
                tags: JSON.stringify(['Payment Dispute'])
            },
            {
                workerId: workers[1].id.toString(),
                workerName: workers[1].name,
                platform: 'Bykea',
                description: 'Bonus payment for weekly target not credited after 24 hours.',
                status: 'Verified',
                tags: JSON.stringify(['Payment Dispute'])
            }
        ];
        await Grievance.bulkCreate(grievances);
        console.log('✅ Grievance Board populated.');

        console.log('--- SQL SEEDING COMPLETE: ZERO-CONFIG SQL READY ---');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
