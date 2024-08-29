import type { NextApiRequest, NextApiResponse } from "next";
import Slider from "@/models/slider";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {


        const { category } = req.query;

  
        let filter = {} as any;
        
    
      
    
        if (category !=='') {
             filter.category =  category 
        }
    



        const categories = await Slider.find(filter).sort({ createdAt: -1 });
        res.status(201).json(categories);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "Invalid method" });
      break;
  }
};

export default handler;
