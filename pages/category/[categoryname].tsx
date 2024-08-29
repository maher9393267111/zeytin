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

export default function MenuPage({ param, search }: any) {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  //const category = router.query.categoryname ? router.query.categoryname   : ''
  const category = param === "all" ? "" : param;
  const { data, isLoading, error } = useProducts({ page, category, search });


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


  // if (!data?.books) return <Loading />;
  // if (data?.books?.length === 0) return <NoData />;


  return (
    <div className=" m-h-[100vh] md:px-[52px] md:py-[50px] py-12 px-2 product-area lg:!-mt-12 ">


<UseInitGeneralAnimationIntersectionObserver />


      <PageLayout>
      {/* <section className="bg-white text-slate-900" id="product-sample">
          <div
            className={cn(
              "mx-auto flex max-w-main gap-8 px-16 py-36",
              "flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between",
            )}
          >
            <article className="flex flex-col gap-6 text-xl">
              <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
                منتجاتنا
              </h2>
            </article>
            <article
              className={cn(
                "grid gap-x-16 gap-y-8",
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {[
                {
                  src: "/images/new/11.jpeg",
                  title: "زيتون دولسي",
                  description:
                    " مخلل علي الطريقة الفليسطينية محفوظ بالزيت الزيتون و الليمون بدون مواد حافظة ٧٥٠ ملي لتر و سعره ١٠٠",
                },
                {
                  src: "/images/new/12.jpeg",
                  title: "زيت زيتون اكسترا",
                  description:
                    "فيرجن معصور علي البار والزجاجه ٥٠٠ ملي لتر و السعر ٢٠٠ جنيه",
                },
              ].map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex w-full max-w-[20rem] flex-col gap-2 overflow-hidden rounded-xl bg-special-primary-500 bg-opacity-5"
                >
                  <div className="aspect-[9/16] h-[22rem] w-full overflow-hidden">
                    <Img
                      src={item.src}
                      alt=""
                      width={500}
                      height={500}
                      className={cn(
                        "h-full  !w-full !object-cover",
                        "scale-125",
                        "transition-transform delay-300 duration-500 ease-in-out",
                      )}
                      data-intersection-observer-element={true}
                      data-intersection-observer-on-intersect-remove="scale-125"
                      data-intersection-observer-unobserve-after-intersect={
                        true
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 px-4 pb-4 pt-2 text-center">
                    <h3>
                      <strong>{item.title}</strong>
                    </h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </article>
          </div>
        </section> */}


   

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
  const { categoryname } = context.params;
  const searchTerm = context?.query?.term ? context?.query?.term : "";

  return {
    props: {
      param: categoryname,
      search: searchTerm,
    },
  };
};
