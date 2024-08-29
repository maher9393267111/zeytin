import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { PageLayout } from "@/layouts";
import { Grid, Stack } from "@mui/material";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState, useMemo } from "react";
import NotFound from "@/pages/404";
import { CircularLoading as Loading } from "@/components/loading";
import axios from "axios";
import { useRouter } from "next/router";
import { message } from "antd";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "@/components/icons";
import Image from "next/image";
import moment from "@/utils/moment";
import { RestartAlt } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import useProductDetails from "@/hooks/useProductDetails";
import ProductGallery from "@/components/cards/bookGallery";
import { useTranslation } from "@/context/useTranslation";
import { deleteImage } from "@/utils/getData";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ThinStar } from "@smastrom/react-rating";
import { Item, Label, Input } from "semantic-ui-react";
import Link from "next/link";
import BreadCrumb, {
  BreadCrumbItem,
} from "@/components/SiteComponents/BreadCrumb";


import { HandlePrice , HandleDolar } from "@/utils/HandlePrice";

import ShareButtons from "@/components/SiteComponents/shareButtons";
import ProductTabs  from "@/components/SiteComponents/PoroductDetailsTab"
import RelatedProducts from "@/components/SiteComponents/RelatedProducts"

// import BuyButton from "../BuyButton";
// import { customeStyles, slug } from "@/utils";

export const customeStyles = {
  itemShapes: ThinStar,
  itemStrokeWidth: 1.3,
  activeFillColor: "#ffb23f",
  activeStrokeColor: "#F4B740",
  inactiveStrokeColor: "#F4B740",
};

interface BookDetails {
  _id: string | number | null;
  title?: string;
  story?: string;
  price?: number;
  category?: {
    name: string;
  };
  author?: string;
  cover?: string;
  createdAt?: string;
}

const BookButton = styled(Button)`
  @media (max-width: 600px) {
    width: 100%;
  }
  width: 100%;
`;

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { user } = useAuth({
    // redirectTo: "/auth/login",
    // redirectIfFound: false,
  });

  
  // const [bookDetails, setBookDetails] = useState<BookDetails>();

  const { data, isLoading, error } = useProductDetails({ id });
  const country = localStorage.getItem('country') || "";


  const bookDetails = data?.book
  const related = data?.related

  console.log("DATA_____", bookDetails , "RELATED" , related);

  const { translation } = useTranslation();

  const t = useMemo(
    () => translation.product_details_page ?? {},
    [translation]
  );

  const troot = useMemo(() => translation ?? {}, [translation]);

  console.log("BREAD_Product", troot);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const handleDelete = () => {
    if (!id) return;
    if (!confirm("هل انت متأكد من حذف المنتج ؟")) return;
    axios
      .delete(`/api/book/${id}/handler`)
      .then(async (res) => {
        message.success("تم حذف المنتج بنجاح");
        await deleteImage(bookDetails?.cover);
        //  window.location.reload();
        router.push("/");
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
        console.log(err);
      });
  };

  const handleOrder = () => {
    setLoading(true);
    if (!id) return;
    const book = {
      _id: bookDetails?._id,
      title: bookDetails?.title,
      price: HandlePrice(bookDetails ,country),
      cover: bookDetails?.cover,
      quantity: quantity,
      size: selectedSize,
    };

    if (!selectedSize) {
      message.error(
        t.dir === "rtl"
          ? "الرجاء اختيار المقاس اولا"
          : "Please select size first"
      );
      setLoading(false);
      return;
    }

    const CART_KEY = "cart";
    const LOCAL_ORDERS = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (LOCAL_ORDERS && LOCAL_ORDERS.length > 0) {
      const existingProduct = LOCAL_ORDERS.find(
        (b: Book) => b._id === book._id && b?.size === selectedSize
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        LOCAL_ORDERS.push(book);
      }
    } else {
      LOCAL_ORDERS.push(book);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(LOCAL_ORDERS));
    message.success("تم اضافة المنتج الى السلة");
    setLoading(false);
    //router.push("/~/cart");
  };

  const imagesData =
    bookDetails && bookDetails?.image
      ? [bookDetails?.cover, ...bookDetails?.image]
      : bookDetails?.cover
      ? [...bookDetails?.cover]
      : [];
  const galleryItems = imagesData?.map((image, index) => ({
    original: image,
    thumbnail: image,
    description: `Image ${index + 1}`,
  }));

  React.useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  // useEffect(() => {
  //   if (!id) return;
  //   axios
  //     .get(`/api/book/${id}`)
  //     .then((res) => {
  //       const { data } = res;
  //       data ? setBookDetails({ ...data }) : setBookDetails({ _id: null });
  //     })
  //     .catch((err) => {
  //       setBookDetails({
  //         _id: null,
  //       });
  //     });
  // }, [id]);

  const breadCrumbData = [
    {
      title: t.dir === "rtl" ? "قائمة المنتجات" : "Products",
      href: "/category/all",
      active: true,
    },

    {
      title: t?.dir === "rtl" ? bookDetails?.title : bookDetails?.titletr,
      href: `/category/all`,
      active: false,
    },
  ];

  if (!bookDetails) return <Loading />;
  if (isLoading) return <Loading />;
  if (bookDetails && !bookDetails._id) return <NotFound />;
  return (
    <div className=" !px-4 products-details-area  bg-[#f0f4f8] ">
      <Head>
        <title>Outlet Turkey - صفحة المنتج</title>
      </Head>
      <PageLayout dir={troot.dir} title={t.page_title}>
        <div  dir={troot.dir === "rtl" ? "rtl" : "ltr"} className=" px-4 md:px-12">
         
          {/* <div
            dir={troot.dir === "rtl" ? "rtl" : "ltr"}
            className="col-span- !w-full "
          >
            <div className="col-span-1 !w-ful rounded-8 b-muted-200 p-2 !mx-3 !px-2">
              <BreadCrumb>
                {breadCrumbData?.map((item: any) => (
                  <BreadCrumbItem
                    t={troot.dir}
                    // key={uuidv4()}
                    href={item?.href}
                    active={item?.active}
                  >
                    {item?.title}
                  </BreadCrumbItem>
                ))}
              </BreadCrumb>
            </div>
          </div> */}

          <React.Fragment className="mt-12">
            <Item.Group className=" !font-estedad !text-[17px]">
              <Item >
                {/* <Item.Image size="large" src={bookDetails?.cover} /> */}
                <div className={`${troot.dir === 'rtl' ? '!pl-12' : '!pr-12'}  `}>
                {bookDetails?.image && (
                  <ImageGallery
                    showIndex={true}
                    className={` !w-90 !flex !max-h-56 `}
                    items={galleryItems}
                  />
                )}
                </div>
                <Item.Content className='mx-12'>
                  <Item.Header>
                  {troot.dir === "rtl"
                    ? bookDetails.title
                    : bookDetails?.titletr}
                  </Item.Header>
                  <Item.Description>
                    <p className="price">
                      
                      {/* {bookDetails?.price}$ */}
                      
                     {bookDetails?.price}$
                      

                      </p>
                    <Label>{troot.dir === "rtl"
                    ? "رمز المنتج"
                    : "Sku"}: {bookDetails?._id}</Label>
                  </Item.Description>

                  <ul className="products-info">
                    {/* <li>
                      <span>Vendor:</span>
                      <Link legacyBehavior href="#">
                        <a onClick={(e) => e.preventDefault()}>Lereve</a>
                      </Link>
                    </li> */}
                    <li>
                      <span>  {troot.dir === "rtl"
                    ? "الحالة"
                    : "Avalability"}:</span>
                      <Link legacyBehavior href="#">
                        <a onClick={(e) => e.preventDefault()}>
                        {troot.dir === "rtl"
                    ? "موجود في المتجر"
                    : "In Stock"}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <span className=''>
                      {troot.dir === "rtl"
                    ? " نوعية المنتج: "
                    : " Products Type:"}
                        
                       </span>
                      <Link legacyBehavior href={`/category/${bookDetails?.category?._id}`}>
                        <a>
                        {troot.dir === "rtl"
                    ? bookDetails?.category?.name
                    : bookDetails?.category?.nametr}
                        

                        </a>
                      </Link>
                    </li>
                  </ul>

                  <Item.Extra>
                  <div className=" my-2 ">
                  {bookDetails?.sizes?.length > 0 && (
                    <div className="py-2">
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
                        {bookDetails?.sizes.map((size) => (
                          <label
                            key={size?._id}
                            className="flex !text-md items-center gap-2   border-primary-800 p-3 border rounded-md mb-1.5"
                          >
                     
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                </Item.Extra>

                <Item.Extra>
                  <ShareButtons t={t} product={bookDetails}/>
                </Item.Extra>

             

                  <div className="payment-method flex gap-2">
                    <img src="/images/payment/expresscard.png" />
                    <img src="/images/payment/mastercard.png" />
                    <img src="/images/payment/mastercard2.png" />
                    <img src="/images/payment/visa.png" />
                    <img src="/images/payment/visa2.png" />
                  </div>
                </Item.Content>
              </Item>
            </Item.Group>
          </React.Fragment>


<ProductTabs dir={troot.dir} features={bookDetails?.features} desc ={troot.dir === 'rtl' ? bookDetails?.story : bookDetails?.storytr}/>


<RelatedProducts t={troot} related={related} />






           {/* <div
            dir={troot.dir === "rtl" ? "rtl" : "ltr"}
            className="col-span- !w-full mt-5 rounded-8 mx-2  "
          >
            <div className="rounded-8 !h-auto bg-mute-200 gap-12  flex flex-col md:flex-row md:gap-14 px-4 items-cente ">
              <div className="mt-5">
                {bookDetails?.image && (
                  <ImageGallery
                    showIndex={true}
                    className="!w-90 !flex !max-h-56"
                    items={galleryItems}
                  />
                )}
              </div>

              <div className="fle items-center justify-between md:mt-12">
                <h1 className="body-lg md:body-xl xl:h4-bold">
                  {" "}
                  {troot.dir === "rtl"
                    ? bookDetails.title
                    : bookDetails?.titletr}
                </h1>
                <div
                  dir={troot.dir === "rtl" ? "ltr" : "rtl"}
                  className="flex w-[100px] -scale-x-100 items-center gap-x-2"
                >
                  <Rating
                    value={bookDetails?.rating === 0 ? 1 : bookDetails?.rating}
                    className="h-8"
                    readOnly
                    itemStyles={customeStyles}
                  />
                </div>

                <div className="rounded-8 bg-mute-200 py-3">
                  <p className="text-black body-lg md:body-xl xl:h4-bold">
                    <span>{troot.dir === "rtl" ? "السعر" : "Price"} :</span>
                    {bookDetails?.price.toLocaleString(
                      `${t.dir === "rtl" ? "ar" : "en"}`
                    )}{" "}
                    <span>{t.dir === "rtl" ? "$" : "$"}</span>{" "}
                  </p>

              
                </div>

                <div className=" my-2 ">
                  {bookDetails?.sizes?.length > 0 && (
                    <div className="py-2">
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                        {bookDetails?.sizes.map((size) => (
                          <label
                            key={size?._id}
                            className="flex !text-md items-center gap-2   border-primary-800 p-3 border rounded-md mb-1.5"
                          >
                            <input
                              type="radio"
                              onChange={() => setSelectedSize(size)}
                              checked={selectedSize === size}
                              name="size"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <ShareButtons t={t} product={bookDetails} />
                </div>

                <div className=" !font-estedad !mt-4 !mb-4">
                  <Input
                    className=" !font-estedad"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    action={
                      user && success
                        ? {
                            color: "blue",
                            content:
                              t.dir === "rtl"
                                ? "تم اضافة المنتج بنجاح"
                                : "Product added",
                            icon: "plus cart",
                            disabled: true,
                          }
                        : user
                        ? {
                            color: "violet",
                            content:
                              t.dir === "rtl"
                                ? " اضافة الى السلة"
                                : "Add to cart",
                           
                            loading: loading,
                            disbaled: `${loading}`,
                            onClick: handleOrder,
                          }
                        : {
                            color: "green",
                            content:
                              t.dir === "rtl"
                                ? "سجل دخول لاكمال عملية الشراء"
                                : "Login to purchase",
                            icon: "sign-in",
                            onClick: () => router.push("/auth/login"),
                          }
                    }
                  />
                </div>
              </div>
            </div>

          </div>  */}



          {/* <Grid item xs={12} md={12}>
            <div dir={t.dir} className="book__story mb-5">
              <Typography className="indent-8">
                {t.dir === "rtl" ? bookDetails.story : bookDetails?.storytr}
              </Typography>
            </div>
          </Grid> */}


{/* 
          <Grid item xs={12} md={6}>
            {user?.role === "admin" && (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<EditIcon size={20} fill="#ffffff" />}
                onClick={() => router.push(`/admin/book/${id}`)}
              >
                تعديل المنتج
              </Button>
            )}

       
          </Grid>
          <Grid item xs={12} md={6} className="mb-5">
            {user?.role === "admin" && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<DeleteIcon size={20} fill="#575757" />}
                onClick={handleDelete}
              >
                حذف المنتج
              </Button>
            )}
          </Grid> */}



        </div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={bookDetails?.cover}
            alt={bookDetails.title as string}
          />
        </Dialog>


      </PageLayout>
    </div>
  );
}