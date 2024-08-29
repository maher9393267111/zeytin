import Head from "next/head";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { DropDownCategories } from "@/components/category";
import { ImageInput } from "@/components/inputs/ImageInput";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { MdDeleteForever } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";
import { db } from "@/utils/firebaseConfig";
import { useMemo } from "react";
import { uploadImages, deleteImages ,deleteImage } from "@/utils/getData";
import useProducts from "@/hooks/useProducts"
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Form, Upload, Input, Select, Switch, InputNumber } from "antd";
import { useTranslation } from "@/context/useTranslation";
import TextList from "@/components/SiteComponents/form/textList";
import MultiTextList from "@/components/SiteComponents/form/MultiTextList";


import { Rating as ReactRating } from "@smastrom/react-rating";

import { Star } from "@smastrom/react-rating";

 const customeStyles = {
  itemShapes: Star,
  itemStrokeWidth: 1.3,
  activeFillColor: "#ffb23f",
  activeStrokeColor: "#F4B740",
  inactiveStrokeColor: "#F4B740",
};



export default function BookCreatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });


  const {mutate} = useProducts()

  const router = useRouter();
  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [titletr, setTitletr] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [omanprice, setOmanPrice] = useState(0);
  const [saudiprice, setSaudiPrice] = useState(0);
  const [tprice, setTPrice] = useState(0);
  const [emiratesprice, setEmiratesPrice] = useState(0);
  const [qatarprice, setQatarPrice] = useState(0);
  const [egyptprice, setEgyptPrice] = useState(0);
  const [story, setStory] = useState("");
  const [storytr, setStorytr] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);






  const [form, setForm] = useState({

    sizes: [],
    features:[]
  

  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      message.loading("جاري إضافة المنتج");
      if (!category || category?.length === 0)
        return message.error("يجب إختيار تصنيف المنتج");
      const uuid = uuidv4();

      let image: string | any = "";

      if (!file) {
        return message.error("يجب اختيار الصورة ");
      }

      if (file) {
        image = await uploadImages(file, true, "book");
        message.success("تم تحميل الصورة بنجاح");
      }

      let images : any = []

      if (files?.length > 0){
       images = await uploadImages(files);
      }

      if(form?.sizes?.length < 1){

        message.error("اضف مقاس واحد على الاقل");
      }




      // await uploadFile(image, `books/cover/${uuid}${".png"}`);

      //  return console.log('upload response')
      await axios
        .post("/api/book", {
          title,
          titletr,
          author,
          category,
          price,
          saudiprice,
          tprice,
          omanprice,
          qatarprice,
          egyptprice,
          emiratesprice,
          story,
          storytr,
          cover: image,
          rating,
          sizes:form.sizes,
          features:form.features,
          image:images 
        })
        .then((res) => {
          console.log(res);
          mutate()
          message.success("تم إضافة المنتج بنجاح");
          const { data } = res;
          //     router.push(`/~/book/${data}`);
        })
        .catch(() => {
          message.error("حدث خطأ أثناء إضافة المنتج");
        });
    } catch (error) {
      message.error("حدث خطأ أثناء إضافة المنتج");
    }
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
     <div className="cart-area !bg-whit  about-area">
      <Head>
        <title>إضافة منتج جديد - Outlet Turkey</title>
      </Head>
      <PageLayout title="header.addBook">
        <form className=" p-20" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                name="title"
                label="عنوان المنتج"
                required
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

            <Grid item xs={12} md={6}>
              <TextInput
                name="author"
                value={author}
                label="اسم المؤلف"
                onChange={setAuthor}
              />
            </Grid>


           




            <Grid item xs={12} md={6}>
              <DropDownCategories
                setCategory={setCategory}
                selectedCategory={category}
                dir={"rtl"}
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
                 
                rows={4}
                name="story"
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

            <Grid item xs={6} md={6}>
      


         









       




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



              <div  className=" my-6">
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






            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                إضافة المنتج
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </div>
  );
}
