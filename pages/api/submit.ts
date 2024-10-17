'use server';
import { NextApiRequest, NextApiResponse } from 'next';

export default function POST(req: NextApiRequest, res: NextApiResponse) {
	console.log("Runs6")
    if (req.method === 'POST') {
        // Handle the POST request here
        res.status(200).json({ message: 'Data received' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
export default function GET(req: NextApiRequest, res: NextApiResponse) {
	console.log("Runs5")
    if (req.method === 'GET') {
        // Handle the GET request here
        res.status(200).json({ message: 'Data Sent' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}