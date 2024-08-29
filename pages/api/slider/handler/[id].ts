import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Slider from "@/models/slider";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "DELETE":
      try {
        const { id } = req.query;
        await Slider.findByIdAndDelete(id);
        
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;
        const { desc ,desctr ,cover ,category} = req.body;
        await Slider.updateOne({ _id: id }, {desc ,desctr ,cover ,category });
        res.status(200).json({ success: true, message: "Category updated !" });
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
