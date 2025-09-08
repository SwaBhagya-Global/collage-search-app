// app/api/colleges/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnection';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const view = url.searchParams.get('view');

  try {
    const client = await clientPromise;
    const db = client.db(); // Use the default database from connection string
    const collegesCollection = db.collection('colleges');

    if (view === 'home') {
      // Latest Colleges: 12 with ranking != null, sorted by ascending ranking
      const latestColleges = await collegesCollection.aggregate([
        {
          $addFields: {
            isRankingNull: {
              $cond: [
                { $or: [{ $eq: ["$ranking", null] }, { $not: ["$ranking"] }] },
                1,
                0
              ]
            }
          }
        },
        {
          $sort: {
            isRankingNull: 1,  // ranking not null first
            ranking: 1         // then sort by ranking ascending
          }
        },
        { $limit: 12 }
      ]).toArray();

      // Top Rated Colleges: rating >= 4.5, sorted by descending rating
      const topRatedColleges = await collegesCollection.find({ rating: { $gte: 4.5 } })
        .sort({ rating: -1 })
        .limit(12)
        .toArray();

      return NextResponse.json({
        success: true,
        data: {
          trending: latestColleges,
          topRated: topRatedColleges
        }
      });
    }

    // Default: return all colleges sorted by createdAt descending
    const colleges = await collegesCollection.find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: colleges,
      count: colleges.length
    });

  } catch (error: any) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching colleges',
      error: error.message
    }, { status: 500 });
  }
}
