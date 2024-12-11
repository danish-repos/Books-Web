import { connectToDatabase } from '../../../../helpers/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const author = await db.collection('authors').findOne({ id: parseInt(id, 10) });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
