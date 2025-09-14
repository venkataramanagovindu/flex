import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import hostawayHandler from './api/reviews/hostaway.js';
import postApprovalHandler from './api/approvals/[id].post.js';
import deleteApprovalHandler from './api/approvals/[id].delete.js';

const app = express();
app.use(cors());
app.use(express.json());

// Route mappings
app.get('/api/reviews/hostaway', (req, res) => hostawayHandler(req, res));

app.post('/api/reviews/approvals/:id', (req, res) => {
    // Convert Express req.params to match Vercel serverless style
    req.query = { id: req.params.id };
    postApprovalHandler(req, res);
});

app.delete('/api/reviews/approvals/:id', (req, res) => {
    req.query = { id: req.params.id };
    deleteApprovalHandler(req, res);
});

// Start local server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[local backend] listening on http://localhost:${PORT}`);
});
