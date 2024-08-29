import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        let book = await Book.findOne({
          _id: id,
        }).populate({
          path: "category",
          select: "name nametr _id",
          model: Category,
        });





        const related = await Book.find({
          category: book?.category?._id,
          _id: { $ne: book._id }, // Exclude the current book from the related products
      }).sort({viewCount: 'desc'}).limit(4);



// const bookwithrelated = {...book , related}
console.log("RELATED AS:ALS" , related)


        res.status(200).json({book ,related});
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default handler;
