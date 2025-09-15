// backend/api/reviews/approvals/[id].js
import { approveReview, unapproveReview } from '../../../../lib/approvals.js';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Missing id' });
  }

  if (req.method === 'POST') {
    const store = approveReview(String(id));
    return res.status(200).json({ approvedReviewIds: store.approvedReviewIds });
  }

  if (req.method === 'DELETE') {
    const store = unapproveReview(String(id));
    return res.status(200).json({ approvedReviewIds: store.approvedReviewIds });
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
