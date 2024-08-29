import React from "react";
import Image from "next/image";



const PageHeader = ({ title, imageSrc }) => {
  return (
    <div className="pointer-events-none relative bg-red-500">
      <div className="relative h-[178px] overflow-hidden bg-blac !bg-black/80 md:h-[396px]">
        <Image
    className="!bg-black/80"
          src={imageSrc}
          alt="image slider"
          sizes="(max-width: 392px) 70vw, (max-width: 768px) 80vw , (min-width: 768px) 100vw"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <h1 className="h6-bold md:h3-bold xl:h2-bold   text-muted-100">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
