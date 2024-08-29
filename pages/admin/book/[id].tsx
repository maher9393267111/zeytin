import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { message } from "antd";

import { db } from "@/utils/firebaseConfig";
import { uploadImages, deleteImages ,deleteImage } from "@/utils/getData";

import { MdDeleteForever } from "react-icons/md";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Form, Upload, Input, Select, Switch, InputNumber } from "antd";
import useProducts from "@/hooks/useProducts";
import useProductDetails from "@/hooks/useProductDetails";
import TextList from "@/components/SiteComponents/form/textList";
import MultiTextList from "@/components/SiteComponents/form/MultiTextList";
export default function BookUpdatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [story, setStory] = useState("");
  const [price, setPrice] = useState(0);
  const [omanprice, setOmanPrice] = useState(0);
  const [saudiprice, setSaudiPrice] = useState(0);
  const [tprice, setTPrice] = useState(0);
  const [emiratesprice, setEmiratesPrice] = useState(0);
  const [qatarprice, setQatarPrice] = useState(0);
  const [egyptprice, setEgyptPrice] = useState(0);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [storytr, setStorytr] = useState("");
  const [titletr, setTitletr] = useState("");
  const [files, setFiles] = useState([]);
  const [images , setImages] = useState([])
  const [rootImages , setRootImages] = useState([])
  const { mutate ,data } = useProducts();
  const { mutate:mutatesingle } = useProductDetails({id});
  const [form, setForm] = useState({

    sizes: [],
    features:[]
  

  });


  useEffect(() => {
    if (!id) return;
    axios.get(`/api/book/${id}`).then((res) => {
      const { data:{book} } = res;
      setTitle(book?.title);
      setPrice(book?.price);
      setStory(book?.story);
      setStorytr(book?.storytr);
      setRating(book?.rating)
      setOmanPrice(book?.omanprice);
      setQatarPrice(book?.qatarprice);
      setSaudiPrice(book?.saudiprice);
      setEmiratesPrice(book?.emiratesprice);
      setTPrice(book?.tprice);

      setEgyptPrice(book?.egyptprice);

      setImage(book?.cover);

      setTitletr(book?.titletr)
      setForm((prevForm) => ({
        ...prevForm,
        sizes: book?.sizes,
      }));

      setForm((prevForm) => ({
        ...prevForm,
        features: book?.features,
      }));

      setImages(book?.image)
      setRootImages(book?.image)
    });
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    let newimage: string | any = "";

    if (file && image) {
      await deleteImage(image);
      message.success("file && image ");
      newimage = await uploadImages(file, true, "book");
    }

    if (!file && image) {
      newimage = image;
    } else if (file && !image) {
      newimage = await uploadImages(file, true, "book");
      message.success("file && NOOOTTT image");
    }

    console.log("NEWIMAGE", newimage);

let imagesData
    const imagesToDelete = rootImages?.filter(
      (image) => !images.includes(image)
    );
   imagesToDelete?.length > 0 && await deleteImages(imagesToDelete);
    const newImagesUploaded = await uploadImages(files);
    imagesData = [...images, ...newImagesUploaded];


    if(form?.sizes?.length < 1){

      message.error("اضف مقاس واحد على الاقل");
    }




    await axios
      .put(`/api/book/${id}/handler`, {
        title,
        price,
        saudiprice,
        tprice,
        omanprice,
        qatarprice,
        egyptprice,
        emiratesprice,
        story,
        storytr,
        titletr,
        cover: newimage,
        rating:rating,
        sizes:form?.sizes,
        features:form?.features,
        image:imagesData
      })

      //   await mutate()
      // Revalidate the products data

      .then((res) => {
    

        mutate();
        mutatesingle();
message.success("تم تعديل المنتج بنجاح")
    //    router.push(`/~/product/${id}`);
      })
      .catch((err) => message.error("حدث خطأ"));
  };
  if (user && user.role !== "admin") return <NotFound />;
  return (
    <div className="cart-area !bg-whit about-area">
      <Head>
        <title>تعديل المنتج - Outlet Turkey</title>
      </Head>
      <PageLayout title="تعديل المنتج">
        <form className=" p-20 !bg-white" onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                name="title"
                label="عنوان المنتج"
                required
                focused
                value={title}
                onChange={setTitle}
              />


</Grid>


<Grid item xs={12} md={6}>
              <TextInput
                name="title"
                label="عنوان المنتج باللغة الانكليزية"
                required
                value={titletr}
                onChange={setTitletr}
              />
            </Grid>



            <Grid item xs={12} md={4}>
              <TextInput
                name="price"
                label="سعر المنتج"
                type="number"
                required
                value={price}
                onChange={setPrice}
              />



</Grid>
    




    
          



            <Grid item xs={12} md={12}>
              <TextInput
                type="number"
                 
            
                name="star"
                label="تقييم المنتج"
                required
                value={rating}
                onChange={setRating}
              />
            </Grid>


            <Grid item xs={12} md={6}>
            <TextList type="sizes" form={form} setForm={setForm} />
</Grid>


<Grid item xs={12} md={12}>
            <MultiTextList type="features" form={form} setForm={setForm} />
</Grid>




            <Grid item xs={12} md={12}>
              <TextInput
                multiline
                focused
                rows={4}
                name="story"
                label="تفاصيل المنتج"
                required
                value={story}
                onChange={setStory}
              />
            </Grid>


            
            <Grid item xs={12} md={12}>
              <TextInput
                multiline
                rows={4}
                name="story"
                label="تفاصيل المنتج باللغة الانكليزية"
                required
                value={storytr}
                onChange={setStorytr}
              />
            </Grid>

            <Grid item xs={12} md={12}>
            <div>
              <Upload
              className=" !font-estedad"
                accept="image/*"
                maxCount={1}
                // file is data of image will be uploaded to firebase/storage
                beforeUpload={(file: any) => {
                  setFile(file);
                  // setFiles((prev) => [...prev, file]);
                  return false;
                }}
                listType="picture-card"
                onRemove={() => setFile("")}
              >
                 تحميل الصورة الرئيسية
              </Upload>
            </div>

            {image && (
              <div className="   w-28 h-28 rounded-full  relative">
                <img className=" w-28 h-28 rounded-lg  " src={image} alt="" />

                <p
                  onClick={() => setImage("")}
                  className="text-center -top-2 right-2 cursor-pointer absolute text-red-600"
                  >
                  <MdDeleteForever className=" w-8 h-8"/>
                </p>
              </div>
            )}

</Grid>



<Grid item xs={12} md={12}>
<div>
            <Upload
            className=" !font-estedad"
              accept="image/*"
              multiple
              // files is data of images will be uploaded to firebase/storage
              beforeUpload={(file) => {
                setFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="picture-card"
              onRemove={(file) => {
                console.log("fileDATA", file);
                setFiles((prev) => {
                  const index = prev.indexOf(file);
                  const newFileList = prev.slice();
                  newFileList.splice(index, 1);
                  return newFileList;
                });

                console.log("files", files);
              }}
            >
            تحميل الصور الفرعية
            </Upload>
          </div>



<div className="flex flex-wrap gap-3 mt-2 ">
            {images?.map((data, index) => (
              <div key={index} className=" relative">
                <img src={data} className="w-28 h-28 rounded-full " />
                <h1
                  onClick={() => {
                    // prev all previous images
                    setImages((prev) => {
                      // all images put into new array
                      const temp = [...prev];
                      // delete  image with clicked index
                      temp.splice(index, 1);
                      // return this new array after delete clicked image
                      return temp;
                    });
                  }}
                  className="text-center -top-10 right-2 cursor-pointer absolute text-red-600"
                >
                <MdDeleteForever className=" w-8 h-8"/>
                </h1>
              </div>
            ))}
          </div>

</Grid>

            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                تعديل المنتج
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </div>
  );
}
