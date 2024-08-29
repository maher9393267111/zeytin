import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import useSWR from 'swr';
import { fetchData, postData } from '@/hooks/Global';
import { CircularLoading as Loading } from '@/components/loading';
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";

import { TextInput } from "@/components/inputs";
const SettingsPageLayout = () => {
  const url = `/api/settings`;
  const { data, error, mutate } = useSWR(url, fetchData);
  const [settings, setSettings] = useState({});
  const [buttonState, setButtonState] = useState('');

  useEffect(() => {
    if (data && data.settings) {
      setSettings(data.settings);
    }
  }, [data]);

  const phoneHeader = useRef();
  const phoneFooter = useRef();
  const email = useRef();
  const shortAddress = useRef();
  const address = useRef();
  const description = useRef();
  const copyright = useRef();
  const facebook = useRef();
  const instagram = useRef();
  const twitter = useRef();
  const youtube = useRef();
  const pinterest = useRef();
  const security1 = useRef();
  const security2 = useRef();
  const support1 = useRef();
  const support2 = useRef();
  const delivery1 = useRef();
  const delivery2 = useRef();

  const handleForm = async (e: any) => {
    e.preventDefault();
    console.log("formdata-->"  )
    //setButtonState('loading');
    try {
        const footerBanner = {
            security: {
              title: security1?.current?.value?.trim() ,
              description: security2?.current?.value?.trim() ,
            },
            support: {
              title: support1?.current?.value?.trim() ,
              description: support2?.current?.value?.trim() ,
            },
            delivery: {
              title: delivery1?.current?.value?.trim() ,
              description: delivery2?.current?.value?.trim() ,
            },
          };
          const social = {
            facebook: facebook?.current?.value?.trim() ,
            instagram: instagram?.current?.value?.trim() ,
            twitter: twitter?.current?.value?.trim() ,
            youtube: youtube?.current?.value?.trim() ,
            pinterest: pinterest?.current?.value?.trim() ,
          };
          
          const data = {
            phoneHeader: (phoneHeader?.current?.value ?? '').trim(),
            shortAddress: (shortAddress?.current?.value ?? '').trim(),
            phoneFooter: (phoneFooter?.current?.value ?? '').trim(),
            email: (email?.current?.value ?? '').trim(),
            address: (address?.current?.value ?? '').trim(),
            description: (description?.current?.value ?? '').trim(),
            copyright: (copyright?.current?.value ?? '').trim(),
            social: social,
            footerBanner: footerBanner,
          };



    

      console.log("formdata-->" , data)

      const response = await postData(`/api/settings?scope=layout`, data);
      response.success
        ? message.success('Setting Updated Successfully')
        : message.error(`Something Went Wrong (500)`);
    } catch (err) {
      message.error(`Something Went Wrong (${err?.message})`);
    }
    setButtonState('');

    mutate()
  };

    function socialSettings() {
        return (
          <div className="card mb-5 p-12 border-0 shadow">
            <div className="card-header caption-lg bg-white py-3 fw-bold">
            Social links
            </div>


<div>
<input
          
          className="input-gray-outline mb-3 px-4 caption-lg p-2 !w-full"
          placeholder={"Facebook"}
          type="url"
          ref={facebook}
          defaultValue={settings?.social?.facebook}
    
          required='true'

    
  />


<input
          
          className="input-gray-outline mb-3 px-4 caption-lg p-2 !w-full"
          placeholder={"Instagram"}
          type="url"
          ref={instagram}
          defaultValue={settings?.social?.instagram}
    
          required='true'

      
    
    
  />


<input
          
          className="input-gray-outline mb-3 px-4 caption-lg p-2 !w-full"
          placeholder={"Twitter"}
          type="url"
          ref={twitter}
          defaultValue={settings?.social?.twitter}
    
          required='true'

      
    
    
  />


<input
          
          className="input-gray-outline mb-3 px-4 caption-lg p-2 !w-full"
          placeholder={"Yotube"}
          type="url"
          ref={youtube}
          defaultValue={settings?.social?.youtube}
    
          required='true'

      
    
    
  />

<input
          
          className="input-gray-outline mb-3 px-4 caption-lg p-2 !w-full"
          placeholder={"Pinterest"}
          type="url"
          ref={pinterest}
          defaultValue={settings?.social?.pinterest}
    
          required='true'

      
    
    
  />



</div>



            {/* <div className="card-body">
              <div className="py-3">
                <label htmlFor="inp-6" className="form-label">
                  Facebook
                </label>
                <input
                  type="url"
                  ref={facebook}
                  defaultValue={settings?.social?.facebook}
                  id="inp-6"
                  className="form-control"
                />
              </div>
              <div className="py-3">
                <label htmlFor="inp-7" className="form-label">
                  Instagram
                </label>
                <input
                  type="url"
                  ref={instagram}
                  defaultValue={settings?.social?.instagram}
                  id="inp-7"
                  className="form-control"
                />
              </div>
              <div className="py-3">
                <label htmlFor="inp-8" className="form-label">
                  Twitter
                </label>
                <input
                  type="url"
                  ref={twitter}
                  defaultValue={settings?.social?.twitter}
                  id="inp-8"
                  className="form-control"
                />
              </div>
              <div className="py-3">
                <label htmlFor="inp-9" className="form-label">
                  Youtube
                </label>
                <input
                  type="url"
                  ref={youtube}
                  defaultValue={settings?.social?.youtube}
                  id="inp-9"
                  className="form-control"
                />
              </div>
              <div className="py-3">
                <label htmlFor="inp-10" className="form-label">
                  Pinterest
                </label>
                <input
                  type="url"
                  ref={pinterest}
                  defaultValue={settings?.social?.pinterest}
                  id="inp-10"
                  className="form-control"
                />
              </div>
            </div> */}






          </div>
        );
      }


  return (
    <PageLayout title="صفحة الطلبيات">
    <div className=' about-area about-ar min-h-24 bg-whit px-12'>
           

      {error ? (
        <div className="text-center text-danger">failed to load</div>
      ) : !settings?._id ? (
        <Loading />
      ) : (
        <form className=' p-12 ' onSubmit={handleForm}>
          {socialSettings()}
          <div className="py-3">
          <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                إنشاء التصنيف
              </Button>
            </Grid>
          </div>
        </form>
      )}

 


    </div>
    </PageLayout>
  );
};

export default SettingsPageLayout;

