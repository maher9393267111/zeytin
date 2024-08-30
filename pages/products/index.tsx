import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { PageLayout } from "@/layouts";
import useProducts from "@/hooks/useProducts";

import useCategories from "@/hooks/useCategories";
import useSlider from "@/hooks/useSlider";

import ProductCard from "@/components/SiteComponents/ProductCard";
import { NoData } from "@/components/empty";
import { CircularLoading as Loading } from "@/components/loading";
import CartButton from "@/components/button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Container, Pagination } from "semantic-ui-react";
import BannerSlider from "@/components/SiteComponents/BannerSlider";
import { useLanguageContext } from "@/context/languageContext";

import { clsx as cn } from "@/components/zeytin/utils";
import { UseInitGeneralAnimationIntersectionObserver } from "@/components/zeytin/utils/use-init-general-animation-intersection-observer";
import Img from "@/components/zeytin/utils/img";

import { useTranslation } from "@/context/useTranslation";

export default function MenuALL({  search,catQuery }: any) {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  //const category = router.query.categoryname ? router.query.categoryname   : ''
  
  const { data, isLoading, error } = useProducts({ page, category:catQuery, search:search });


  const handlePageChange = (event: any, value: number) => {
    if (value === page) return;
    setPage(value);

    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };

  const setFilterHandler = (value: any) => {
    return () => {
      //  add query

      const newUrl = `/category/${value?._id}`;
      router.push(newUrl);
    };
  };

  

  const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);


  if (!data?.books) return <Loading />;
  if (data?.books?.length === 0) return <NoData />;


  return (
    <div className=" m-h-[100vh] md:px-[52px] md:py-[50px] py-12 px-2 product-area lg:!-mt-12 ">


<UseInitGeneralAnimationIntersectionObserver />


      <PageLayout>



   

{data?.books &&
<div dir={t.dir === "rtl" ? "rtl" : "ltr"} className="mt-20">
            <ProductCard
              t={t}
              title={t.dir === "rtl" ? "منتجاتنا" : "Our Products"}
              products={data?.books}
            />
          </div>

}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Container textAlign="center">
            {data?.pages > 1 ? (
              <Pagination
                defaultActivePage={page}
                firstItem={null}
                lastItem={null}
                totalPages={data?.pages}
                onPageChange={(e, data) => {
                  console.log(e, data);
                  handlePageChange(e, data?.activePage);
                }}
              />
            ) : null}
          </Container>
        </Box>

        {/* <CartButton /> */}
      </PageLayout>
    </div>
  );
}



export const getServerSideProps = async (context: any) => {
  const  category = context?.query?.query ? context?.query?.query: "";
  const searchTerm = context?.query?.term ? context?.query?.term : "";

  return {
    props: {
      catQuery: category === 'all' ? '' : '',
      search: searchTerm,
    },
  };
};
