import { useState } from "react";
import Image from "next/image";

const ProductGallery = ({images ,cover}:any) => {
  // const [imagesdata, setImages] = useState({
  //  images
  // });

  const [activeImg, setActiveImage] = useState(cover);
  return (
    <div className=" ">
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex flex-col gap-5 w-[90%] m-auto ">
          {/* <img
            src={activeImg}
            alt=""
            className="w-full h-full aspect-square object-cover rounded-xl"
          /> */}

                <Image
                  className="book__cover drop-shadow-md hover:drop-shadow-xl"
                  src={activeImg}

                alt="product image"
                  width={400}
                  height={350}
                  objectFit="cover"
                  unoptimized={true}
                  loading="lazy"
                  
                  />


{images && images?.length > 0 &&
          <div className="md:flex mb-4  hidden flex-wrap flex-row justify-cente h-24 gap-2">
      
          <Image
      width={400}
      height={350}
      objectFit="cover"
      unoptimized={true}
      loading="lazy"
      src={cover}
      alt=""
      className="!w-24 !h-24 rounded-md cursor-pointer"


      onClick={() => setActiveImage(cover)}
    />



{images?.slice(0,4).map((imagedata) => (
      <Image
      width={400}
      height={350}
      objectFit="cover"
      unoptimized={true}
      loading="lazy"
      src={imagedata}
      alt=""
      className="!w-24 !h-24 rounded-md cursor-pointer"


      onClick={() => setActiveImage(imagedata)}
    />

          ))} 

       


          </div>
}


        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
