import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/book";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";
import { features } from "process";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "POST":
      try {
        const { title, story,titletr ,storytr,price, category, author, cover ,rating ,sizes ,image ,     saudiprice,
          omanprice,
          qatarprice,
          egyptprice,
          tprice,
          emiratesprice, } = req.body;
        const newBook = await Book.create({
          title,
          titletr,
          story,
          storytr,
          price,
          category,
          author,
          cover,
          addBy: user._id,
          rating,sizes ,
          features,
          image,
          saudiprice,
          omanprice,
          qatarprice,
          egyptprice,
          emiratesprice,
          tprice
        });
        res.status(201).json(newBook._id);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
