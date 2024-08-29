import React ,{useMemo ,useEffect , useState} from "react";
import "@/styles/globals.css";
import '../public/semantic.min.css';
import '../public/nprogress.css';
import '../public/styles.css';
import '../public/responsive.css';
import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@/site-settings/theme";
import RTL from "@/site-settings/RTL";
import { IntlProvider } from "react-intl";
import msgs from "@/site-settings/site-translations";
import { MainLayout } from "@/layouts";
// import PropTypes from "prop-types";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import { LanguageProvider ,useLanguageContext } from '@/context/languageContext'
// import { useTranslation } from '@/context/useTranslation'
export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  // const { translation } = useTranslation()

  // const t = useMemo(() => translation ?? {}, [translation])


  
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  
  }, []);
  




  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google_analytics" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Script
        id="google_tag_manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}');`,
        }}
      ></Script>

{!isSSR && 
      <ThemeProvider 
      theme={theme}
      
      >
      <LanguageProvider>
        <IntlProvider locale="ar" messages={msgs["ar"]}>
          <RTL>
            <CssBaseline />
            <MainLayout>
            

              <Component {...pageProps} />
              <Analytics />
            </MainLayout>

             
          </RTL>
        </IntlProvider>
        </LanguageProvider>
        <NextNProgress
                color="#a38579"
                startPosition={0.2}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
              />
      </ThemeProvider>
      

}

    </>
  );
}

// App.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
