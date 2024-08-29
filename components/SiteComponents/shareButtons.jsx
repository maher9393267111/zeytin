import {
    WhatsappShareButton,
    TelegramShareButton,
    EmailShareButton,
    WhatsappIcon,
    TelegramIcon,
    EmailIcon,
  } from "react-share";
  
  const ShareButtons = ({ product ,t }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/~/product/${product._id}`;
  
    return (
      <div className="flex w-full gap-6 items-center py-2 justify-cente md:justify-start lg:justify-cente">
        <div>
        <h3 className=" text-center  !h-full text-black body-lg md:body-xl xl:h4-bold">
        {t.dir === 'rtl' ? 'شارك المنتج ' : 'Share product'}
        </h3>
        </div>



        <div className="flex gap-3 justify-center">
          <WhatsappShareButton
            url={shareUrl}
            title={product.name}
            separator=":: "
          >
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>
  
          <EmailShareButton
            url={shareUrl}
            subject={product.name}
            body={`این محصول را ببینید: ${shareUrl}`}
          >
            <EmailIcon size={30} round={true} />
          </EmailShareButton>
  
          <TelegramShareButton url={shareUrl} title={product.name}>
            <TelegramIcon size={30} round={true} />
          </TelegramShareButton>
        </div>
      </div>
    );
  };
  
  export default ShareButtons;