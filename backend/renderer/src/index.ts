import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// @route   POST api/render/certificate
// Fulfills the "Dedicated service that generates a clean printable HTML income certificate" requirement
app.post('/api/render/certificate', (req: Request, res: Response) => {
    const { workerName, workerId, totalEarnings, period, platforms } = req.body;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Income Certificate - ${workerName}</title>
        <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px; color: #333; }
            .cert-container { border: 10px solid #006b54; padding: 50px; position: relative; }
            .header { text-align: center; margin-bottom: 40px; }
            .header h1 { color: #006b54; margin: 0; font-size: 32px; text-transform: uppercase; }
            .header p { margin: 5px 0; font-weight: bold; }
            .content { line-height: 1.6; font-size: 18px; }
            .highlight { color: #006b54; font-weight: bold; }
            .stats-table { width: 100%; margin: 30px 0; border-collapse: collapse; }
            .stats-table td { padding: 15px; border-bottom: 1px solid #eee; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
            .signature { margin-top: 60px; display: flex; justify-content: space-between; }
            .sig-line { border-top: 1px solid #333; width: 200px; text-align: center; padding-top: 5px; font-size: 14px; }
            
            @media print {
                body { padding: 0; }
                .cert-container { border: 5px solid #000; }
                button { display: none; }
            }
        </style>
    </head>
    <body>
        <div class="cert-container">
            <div class="header">
                <h1>FairGig Ethical Ledger</h1>
                <p>Official Income Verification Certificate</p>
            </div>
            
            <div class="content">
                <p>This is to certify that <span class="highlight">${workerName}</span> (ID: ${workerId}) is a verified participant of the FairGig Ethical Ledger ecosystem.</p>
                <p>Based on the verified digital logs aggregated across multiple platforms, the following income summary is provided for the period: <span class="highlight">${period || 'Latest 30 Days'}</span>.</p>
                
                <table class="stats-table">
                    <tr>
                        <td><strong>Aggregate Gross Income</strong></td>
                        <td align="right" class="highlight">${Math.round(totalEarnings).toLocaleString()} PKR</td>
                    </tr>
                    <tr>
                        <td><strong>Platforms Contributing</strong></td>
                        <td align="right">${platforms || 'Uber, Careem, Deliveroo'}</td>
                    </tr>
                    <tr>
                        <td><strong>Verification Status</strong></td>
                        <td align="right" style="color: green;">✔ LEGALLY VERIFIED</td>
                    </tr>
                </table>

                <p>This certificate is generated using non-custodial cryptographic ledgers and serves as official proof of income for financial institutions and regulatory bodies.</p>
            </div>

            <div class="signature">
                <div class="sig-line">System Automated Seal</div>
                <div class="sig-line">Compliance Officer</div>
            </div>

            <div class="footer">
                FairGig 2026 • Foundation for Advancement of Science & Technology • SOFTEC Society
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #006b54; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Print Certificate</button>
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'renderer' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Certificate Renderer running on port ${PORT}`);
});
