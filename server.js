const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'pilatesweek7';

const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const members = db.collection('member');

    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/analytics/members', async (req, res) => {
      try {
        const result = await members.aggregate([
          {
            $lookup: {
              from: "bookings",
              localField: "memberId",
              foreignField: "userId",
              as: "bookingInfo"
            }
          },
          { $unwind: "$bookingInfo" },
          {
            $lookup: {
              from: "classes",
              localField: "bookingInfo.classId",
              foreignField: "classId",
              as: "classInfo"
            }
          },
          { $unwind: "$classInfo" },
          {
            $group: {
              _id: "$memberId",
              name: { $first: "$name" },
              totalBookings: { $sum: 1 },
              classesJoined: { $addToSet: "$classInfo.title" },
              uniqueSchedules: { $addToSet: "$classInfo.schedule" }
            }
          }
        ]).toArray();

        res.json(result);
      } catch (err) {
        console.error('Error while aggregating:', err);
        res.status(500).send('Internal server error');
      }
    });

    // ✅ FIXED: Console log with correct backticks
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Could not connect to MongoDB:', err);
  }
}

startServer();
