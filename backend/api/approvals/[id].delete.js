import { unapproveReview } from '../../lib/approvals.js';

export default async function handler(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ status: 'error', message: 'Missing id' });

    const store = unapproveReview(String(id));
    res.status(200).json({ approvedReviewIds: store.approvedReviewIds, persistence: 'ephemeral' });
}
