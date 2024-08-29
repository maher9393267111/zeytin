import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "GET":


    const {q} = req.query
    console.log("QUERY ORDERS---->" , q)

    let statics = null

    //🟨🟨🟨🟨 GET ORDERS IN TODAY ONLY 🟨🟨🟨🟨
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const day = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday,
            $lt: endOfToday,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.book",
          total: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            _id: 1,
            title: 1,
            cover: 1,
          },
          total: 1,
        },
      },
    ]);



    // Orders This Week

    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    const startOfPrevWeek = new Date(today.getTime() - (dayOfWeek + 7) * oneDay);
    const endOfPrevWeek = new Date(startOfPrevWeek.getTime() + (6 * oneDay));
    const week = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfPrevWeek,
            $lt: endOfPrevWeek,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.book",
          total: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            _id: 1,
            title: 1,
            cover: 1,
          },
          total: 1,
        },
      },
    ]);





    // orders this month
    const oneMonth = 30 * oneDay; // Number of milliseconds in a month (approximate)

    const startOfPrevMonth = new Date(today.getTime() - oneMonth);
    const endOfPrevMonth = new Date(startOfPrevMonth.getTime() + (30 * oneDay));

    const month = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfPrevMonth,
            $lt: endOfPrevMonth,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.book",
          total: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            _id: 1,
            title: 1,
            cover: 1,
          },
          total: 1,
        },
      },
    ]);






    // 🟨🟨🟨🟨 get ORDERS IN ALL TIME  🟨🟨🟨🟨

      const all = await Order.aggregate([
        /* if you want to get the best selling books
        {
          $match: {
            variant: "delivered",
          },
        },
        */
        {
          $unwind: "$items",
        },
        {
          $group: {
            _id: "$items.book",
            total: {
              $sum: "$items.quantity",
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "book",
          },
        },
        {
          $unwind: "$book",
        },
        {
          $project: {
            _id: 0,
            book: {
              _id: 1,
              title: 1,
              cover: 1,
            },
            total: 1,
          },
        },
      ]);


      statics = q === 'all' ? all : q === 'day' ? day : q === 'week' ? week : q === 'month' ? month : all

      res.status(200).json(statics);
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
