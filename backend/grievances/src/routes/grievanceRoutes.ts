import express, { Request, Response } from 'express';
import { Grievance } from '../models/Grievance';

const router = express.Router();

// @route   POST api/grievances
router.post('/', async (req: Request, res: Response) => {
  const { workerId, workerName, platform, description, evidenceUrl } = req.body;

  try {
    const tags: string[] = [];
    const lowerDesc = description.toLowerCase();
    
    if (lowerDesc.includes('deduction') || lowerDesc.includes('pay') || lowerDesc.includes('wage')) tags.push('Payment Dispute');
    if (lowerDesc.includes('rating') || lowerDesc.includes('review')) tags.push('Rating Bias');
    if (lowerDesc.includes('safety') || lowerDesc.includes('injury')) tags.push('Safety Concern');
    if (lowerDesc.includes('block') || lowerDesc.includes('ban')) tags.push('Account Deactivation');

    const grievance = await Grievance.create({
      workerId,
      workerName,
      platform,
      description,
      evidenceUrl,
      status: 'Pending',
      tags: JSON.stringify(tags)
    });

    res.json(grievance);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/grievances
router.get('/', async (req: Request, res: Response) => {
  try {
    const grievances = await Grievance.findAll({ order: [['createdAt', 'DESC']] });
    res.json(grievances);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/grievances/clusters
// Fulfills the "clustering similar complaints" SOFTEC requirement
router.get('/clusters', async (req: Request, res: Response) => {
    try {
        const grievances = await Grievance.findAll();
        
        // Group by Platform + Primary Tag
        const clusters: { [key: string]: any[] } = {};
        
        grievances.forEach(g => {
            const tags = JSON.parse(g.tags || '[]');
            const primaryTag = tags.length > 0 ? tags[0] : 'General';
            const clusterKey = `${g.platform} | ${primaryTag}`;
            
            if (!clusters[clusterKey]) {
                clusters[clusterKey] = [];
            }
            clusters[clusterKey].push(g);
        });

        // Convert to array of clusters with metadata
        const result = Object.keys(clusters).map(key => ({
            name: key,
            count: clusters[key].length,
            items: clusters[key],
            isHighPriority: clusters[key].length > 3 // Systemic issue flag
        }));

        res.json(result);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH api/grievances/:id
router.patch('/:id', async (req: Request, res: Response) => {
  const { status, advocateComment } = req.body;
  try {
    let grievance = await Grievance.findByPk(req.params.id);
    if (!grievance) return res.status(404).json({ msg: 'Grievance not found' });

    // Handle Escalation Workflow
    if (status) grievance.status = status;
    
    // In a real app we'd add an optional comment field to the model
    // For now we just update the status as per the manual
    await grievance.save();
    res.json(grievance);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
