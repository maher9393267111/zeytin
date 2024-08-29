import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Slider from "@/models/slider";
import dbConnect from "@/utils/dbConnect";

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
        const {desc ,desctr ,cover  ,category} = req.body;
        const newCategory = new Slider({
          desc,
          desctr,
          category,
        
          cover,
          addBy: user.id,
        });
        await newCategory.save();
        console.log("NEW_CATEGORY" ,newCategory)
        res.status(201).json(newCategory);
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
