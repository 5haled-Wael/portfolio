import Visit from '../models/Visit.js';

const addVisit = async (req, res) => {
  await Visit.create({});
  res.sendStatus(201);
};

const getVisitsCount = async (req, res) => {
  const total = await Visit.countDocuments();
  res.status(200).json({ total });
};

const getVisitsTimeline = async (req, res) => {
  const days = Math.min(Number(req.query.days) || 30, 365);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const timeline = await Visit.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
            timezone: 'Africa/Cairo',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res
    .status(200)
    .json(timeline.map(({ _id, count }) => ({ date: _id, count })));
};

export { addVisit, getVisitsCount, getVisitsTimeline };
