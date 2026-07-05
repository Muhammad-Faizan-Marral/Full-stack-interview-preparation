// Q. Write an Express route with pagination (common real-world task).

app.get('/api/transactions', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const transactions = await prisma.transaction.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await prisma.transaction.count();
    res.json({ data: transactions, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});