import { approveReview, unapproveReview } from '../../../lib/approvals.js';

export default async function handler(req, res) {
  // Allow CORS for your frontend
  res.setHeader('Access-Control-Allow-Origin', 'https://flex-frontend-five.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Missing id' });
  }

  try {
    if (req.method === 'POST') {
      const store = await approveReview(String(id)); // <--- await if async
      return res.status(200).json({ approvedReviewIds: store.approvedReviewIds });
    }

    if (req.method === 'DELETE') {
      const store = await unapproveReview(String(id)); // <--- await if async
      return res.status(200).json({ approvedReviewIds: store.approvedReviewIds });
    }

    res.setHeader('Allow', ['POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: err.message || 'Internal Server Error' });
  }
}
