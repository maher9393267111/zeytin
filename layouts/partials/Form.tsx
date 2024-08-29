


import React, { useState ,useMemo } from "react";

import { useLanguageContext } from "@/context/languageContext";

import { useTranslation } from "@/context/useTranslation";






const MessageBox = () => {
  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);


  console.log("DA", t);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function Submit(e:any) {
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




  return (
    <div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-4">
      <h1 className="h5-bold lg:body-lg xl:h5-bold mb-1">
{t.dir === 'rtl' ? 'تواصل معنا' : 'Contact'}

      </h1>
      <form
    onSubmit={(e) => Submit(e)}
        className="flex flex-col gap-y-5"
        autoComplete="off"
      >
        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-3">
            <div>
              <input
                type="text"
                className="input-white-outline lg:caption-md xl:caption-lg lg:min-w-[220px] xl:min-w-[350px] xl:px-2 xl:py-3"
                placeholder={t?.contact_page?.name}
                required
             
                onChange={(e) => {
                    setName(e.target.value);
                
                  }}
                  value={name}
                
              />
             
            </div>
            <div>
              <input
                type="text"
                className="input-white-outline lg:caption-md xl:caption-lg lg:min-w-[220px] xl:min-w-[350px] xl:px-2 xl:py-3"
                placeholder={t?.contact_page?.phone}
             required

                    
             onChange={(e) => {
                setPhone(e.target.value);
            
              }}
              value={phone}
            
              />
            
            </div>
            <div>
              <input
                type="text"
                className="input-white-outline lg:caption-md xl:caption-lg lg:min-w-[220px] xl:min-w-[350px] xl:px-2 xl:py-3"
                placeholder={t?.contact_page?.email}
             required
                disabled={isLoading}
                       
                onChange={(e) => {
                    setEmail(e.target.value);
                
                  }}
                  value={email}



              />
            
            </div>
          </div>
          <div className="relative self-stretch">
            <textarea
              className="input-white-outline lg:caption-md xl:caption-lg h-full lg:min-w-[220px] xl:min-w-[350px] xl:px-2 xl:py-3"
              placeholder={t?.contact_page?.message}
           
                     
              onChange={(e) => {
                setMessage(e.target.value);
            
              }}
              value={message}

              disabled={isLoading}
            ></textarea>
     


          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-end">
          <button
            className={`button-white-outline lg:body-sm lg:mt-2 lg:px-6 lg:py-1 xl:px-7 xl:py-3`}
            disabled={isLoading}
          >
            
            
          {t?.contact_page?.send}
                        {/* {isLoading ? (
              <Oval
                width={20}
                height={20}
                wrapperClass={"text-white"}
                strokeWidthSecondary={10}
                strokeWidth={5}
                color={"#000"}
                secondaryColor={"#1C2833"}
              />
            ) : (
              "ارسال پیام"
            )} */}



          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
