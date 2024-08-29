import React, { useRef, useState, useMemo } from "react";

import { CheckCircleIcon } from "@heroicons/react/outline";
import PageHeader from "../components/SiteComponents/PageHeader";
import { PageLayout } from "@/layouts";
import { NextSeo } from "next-seo";

import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/useTranslation";
import { useRouter } from "next/router";
import Head from "next/head";
function ContactUs() {
  const { translation } = useTranslation();

  const t = useMemo(() => translation.contact_page ?? {}, [translation]);

  const troot = useMemo(() => translation ?? {}, [translation]);
  const router = useRouter();

  console.log("DA", t);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function Submit(e) {
    e.preventDefault();

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        name: name,
        email: email,
        message: message,

        desc: "ارجو التواصل",

        phone: phone,
        type: "contact",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //setPageLoading(false);
        console.log(data);
        alert("شكرا لك سنتواصل معكم قريبا");
        // clear the form
        try {
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        //	setPageLoading(false);
        console.log(error);
      });
  }

  const location =
    troot.dir === "rtl"
      ? "   طريق السلام، طيبة، المدينة المنورة 42353، المملكة العربية السعودية"
      : "As Salam Rd, Tayba, Madinah 42353, Saudi Arabia";

  return (
    <>
      <PageLayout>
        <PageHeader
          title={t.dir === "rtl" ? "تواصل معنا" : "Contact us"}
          imageSrc="/1.jpg"
        />

        <Head>
          <title>Contact Outlet Turkey</title>
          <meta name="description" content="شركة العطور بلاك بيرفوم " />
          <meta name="keywords" content="Outlet Turkey" />

          <link rel="icon" href="/logoOutlet.png" />
        </Head>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "anticipate", stiffness: 900 }}
          className="flex max-h-auto min-h-screen w-full flex-wrap items-center justify-center gap-20 overflow-hidden pt-[8px]"
        >
          <div>
            <>
              <NextSeo title="Outlet Turkey " description="Outlet Turkey" />
              <div className=" caption-md md:caption-lg lg:body-xl mx-auto arabic max-w-7xl px-6 py-8  sm:px-6 md:py-16 lg:px-8">
                <section dir={troot.dir === "rtl" ? "rtl" : "ltr"}>
                  <p className="h6-bold caption-md md:caption-lg lg:body-xl md:h5-bold my-3  text--100">
                    <strong className="md:px-2">
                      {troot.dir === "rtl" ? "الهاتف:" : "Phone:"}
                    </strong>
                    0597590449
                  </p>

                  <p className="h6-bold caption-md md:caption-lg lg:body-xl md:h5-bold my-3  text--100">
                    <strong className="md:px-2">
                      {troot.dir === "rtl" ? "البريد الالكتروني" : "Email :"}
                    </strong>
                    info@wancafe.com.sa
                  </p>

                  <p className="h6-bold caption-md md:caption-lg lg:body-xl md:h5-bold  text--100">
                    {/*               
              <strong className="md:px-2">
                
     
                {troot.dir === 'rtl' ? 'الموقع:' :  'Location:'}
              </strong> */}
                    {location}
                  </p>
                </section>

                <div className="md:grid grid-cols-1 gap-5 py-4 md:grid-cols-2 md:py-8 flex  flex-col-reverse">
                  <section className="h-64 md:h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.1360788305233!2d39.5398802!3d24.4807415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdb974ec2ba559%3A0xde5d21f64815ee52!2z2YjYp9mGINmE2KfZiNmG2KwgV2FuIExvdW5nZQ!5e0!3m2!1sen!2str!4v1722354947351!5m2!1sen!2str"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-lg"
                    />
                  </section>
                  <section className="">
                    <div className="rounded-lg border-2   bg-white p-8 drop-shadow-lg lg:col-span-3 lg:p-12">
                      <form
                        dir={troot.dir === "rtl" ? "rtl" : "ltr"}
                        className="space-y-4"
                        onSubmit={(e) => Submit(e)}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            {/* <TextInput
                            name={t.name}
                            label={t.name}
                            required
                            value={name}
                            onChange={setName}
                          /> */}

                            <input
                              type="text"
                              className="input-gray-outline mb-3 px-4 caption-lg p-4 !w-full"
                              placeholder={t.name}
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                console.log("etargt", e.target.value);
                              }}
                              required

                              // {...register("phoneNumber")}
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            {/* <TextInput
                            name={t.email}
                            label={t.email}
                            required
                            value={email}
                            onChange={setEmail}
                          /> */}

                            <input
                              type="email"
                              className="input-gray-outline mb-3 px-4 caption-lg p-4 !w-full"
                              placeholder={t.email}
                              id="phonenumber"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                console.log("etargt", e.target.value);
                              }}
                              required
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            {/* <TextInput
                            name={t.phone}
                            label={t.phone}
                            required
                            value={phone}
                            onChange={setPhone}
                          /> */}
                            <input
                              type="text"
                              className="input-gray-outline mb-3 px-4 caption-lg p-4 !w-full"
                              placeholder={t.phone}
                              id="phonenumber"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                console.log("etargt", e.target.value);
                              }}
                              required
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            {/* <TextInput
                            multiline
                            rows={4}
                            name={t.message}
                            label={t.message}
                            required
                            value={message}
                            onChange={setMessage}
                          /> */}

                            <input
                              type="text"
                              className="input-gray-outline mb-3 px-4 caption-lg p-4 !w-full"
                              placeholder={t.message}
                              id="phonenumber"
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                console.log("etargt", e.target.value);
                              }}
                              required
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              {t.send}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </>
          </div>
        </motion.section>
      </PageLayout>
    </>
  );
}

export default ContactUs;
