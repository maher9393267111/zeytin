import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import english2 from "@/public/turkish2.jpg";
import english from "@/public/english2.png";
import arabic from "@/public/arabic2.png";
import LanguageToggle from "@/context/selectLanguage";

import { useLanguageContext } from "@/context/languageContext";
import { useTranslation } from "@/context/useTranslation";

import _Routes from "@/layouts/partials/routes.json";
import { FormattedMessage } from "react-intl";
import useCategories from "@/hooks/useCategories";
import { v4 as uuidv4 } from "uuid";

// import NProgress from 'nprogress';
// import baseUrl from '../../utils/baseUrl';
// import { handleLogout } from '../../utils/auth';

// Router.onRouteChangeStart = () => NProgress.start();
// Router.onRouteChangeComplete = () => NProgress.done();
// Router.onRouteChangeError = () => NProgress.done();

const StaticHeader = ({}) => {
  const router = useRouter();
  const { user, logout, isLoading, mutate } = useAuth({});
  const [menuActive, setMenuActive] = React.useState(false);
  const [search, setSearch] = React.useState({ search: "" });
  // console.log(user)
  const isRoot = user && user.role == "root";
  const isAdmin = user && user.role == "admin";
  const isRootOrAdmin = isRoot || isAdmin;
  const role = user && user?.role;

  const {
    data: categories,
    isLoading: isLoadingCats,
    error: errorcats,
  } = useCategories();

  const isActive = (route: any) => {
    return route == router.pathname;
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = (e: any) => {
    Router.push({
      pathname: "/category/all",
      query: { term: search.search },
    });
  };

  const menuToggle = () => {
    setMenuActive(!menuActive);
  };

  const userRouters =
    user?.role === "user"
      ? _Routes.user
      : user?.role === "admin"
      ? _Routes.admin
      : [];

  const handleLogout = async () => {
    localStorage.clear();
    console.log("logout⚡⚡⚡⚡⚡⚡");
    await logout();
    router.reload();
    //router.push('/auth/login');
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    console.log("clickccc🌐🌐🌐", router.pathname);
    if (router.pathname === "/") {
      const button = document.querySelector(".my-button");

      button.click();
      console.log("clickccc");
    }
  }, []);

  const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);
  console.log("HEADER", t);

  const selectLanguage = useCallback(
    (language: string) => {
      switch (language) {
        case "en":
          changeLanguage("en");
          break;
        case "ar":
          changeLanguage("ar");
          break;
        default:
          changeLanguage("en");
          break;
      }
    },
    [changeLanguage]
  );

  return (
    <div dir="ltr" className="ui grid navbar-area">
      <div className="computer tablet only row ">
        <div className="ui inverted fixed menu navbar page grid h-[100px]">
          <div className=" flex items-center px-2  ">
            <LanguageToggle
              languages={[
                { label: "English", value: "en", img: english },
                { label: "عربي", value: "ar", img: arabic },
              ]}
              selectedLanguage={language}
              selectLanguage={selectLanguage}
            />
          </div>

          <div className=" flex items-center">
            <img
             className="h-[70px] object-cover w-[70px]   rounded-full "
              // className="h-[90px] object-cover w-[90px]   rounded-full "
              src="https://firebasestorage.googleapis.com/v0/b/test-2221c.appspot.com/o/logo-2.jfif?alt=media&token=8b51a5e3-9500-41ae-806e-10db8d17e38e"
              alt=""
            />
          </div>

          <Link legacyBehavior href="/">
            {/* ${isActive("/") ? "active" : null}` */}
            <a className={`item my-button `}>
              <i className="home icon"></i>
              {/* <button className="my-button hidden my-button">Click me</button> */}

              {t.dir === "rtl" ? "الرئيسية" : "Home"}
            </a>
          </Link>

          <div className="ui simple dropdown item">
            <Link legacyBehavior href="/category/all">
              {t.dir === "rtl" ? "المنتجات" : "Products"}
            </Link>
            <i className="dropdown icon"></i>

            {/* <div className="menu">
            <Link legacyBehavior href="/category/all">
                <a className={`item`}>
                  {t.dir === "rtl" ? "كافة المنتجات" : " All Products"}{" "}
                </a>
              </Link>
              {categories?.map(({ _id, cover, name, nametr }: any) => (
                <Link
                  key={uuidv4()}
                  className="!block item"
                  href={`/category/${_id}`}
                >
                  {t.dir === "rtl" ? name : nametr}
                </Link>
              ))}

      
            </div> */}
          </div>

          <div className="right menu">
            {user ? (
              <>
                <div className="ui simple dropdown item">
                  {user?.name}
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    {userRouters?.map(({ id, route }) => (
                      <Link className="" legacyBehavior href={`/${route!}`}>
                        <a
                          className={`item   !font-estedad`}
                          onClick={menuToggle}
                        >
                          <FormattedMessage id={id} />
                        </a>
                      </Link>
                    ))}

                    <div className="divider"></div>
                    <Link legacyBehavior href="#">
                      <a className={`item`} onClick={handleLogout}>
                        <i className="sign-out icon"></i>
                        {t.dir === "rtl" ? "تسجيل خروج" : "Logout"}
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <React.Fragment>
                <Link legacyBehavior href="/auth/login">
                  <a className={`item`}>
                    {t.dir === "rtl" ? "تسجيل دخول" : "Login"}
                  </a>
                </Link>

                <Link legacyBehavior href="/auth/register">
                  <a className={`item`}>
                    {t.dir === "rtl" ? "انشاء حساب" : "Register"}
                  </a>
                </Link>
              </React.Fragment>
            )}
            <form
              className="ui form  flex  items-center"
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="ui transparent icon input">
                <input
                  className="prompt !font-estedad"
                  type="text"
                  placeholder={t.dir === "rtl" ? "البحث..." : "Search..."}
                  name="search"
                  value={search.search}
                  onChange={handleOnChange}
                />
                <i
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  className="search link icon"
                ></i>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="mobile only row">
        <div className="ui fixed inverted navbar menu">
          <Link legacyBehavior href="/">
            {/* <a className="brand item">Outlet_Turkey</a> */}
            <div className=" flex items-center px-4">
              <img
                className="h-[50px] object-cover w-[50px]  rounded-full "
                src="https://firebasestorage.googleapis.com/v0/b/test-2221c.appspot.com/o/logo-2.jfif?alt=media&token=8b51a5e3-9500-41ae-806e-10db8d17e38e"
                alt=""
              />
            </div>
          </Link>

          <div className="right menu open">
            <div className=" flex items-center px-2  ">
              <LanguageToggle
                languages={[
                  { label: "English", value: "en", img: english },
                  { label: "عربي", value: "ar", img: arabic },
                ]}
                selectedLanguage={language}
                selectLanguage={selectLanguage}
              />
            </div>

            <Link legacyBehavior href="#">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  menuToggle();
                }}
                className="menu item"
              >
                <i className="align justify icon"></i>
              </a>
            </Link>
          </div>
        </div>
        <div
          className={`ui vertical navbar menu ${
            menuActive ? "mobile-active-show" : "mobile-active-hide"
          }`}
        >
          <Link legacyBehavior href="/">
            <a
              className={`item ${isActive("/") ? "active" : null}`}
              onClick={menuToggle}
            >
              <i className="home icon"></i>
              {t.dir === "rtl" ? "الرئيسية" : "Home"}
            </a>
          </Link>

          <div className="ui simple pointing left dropdown item">
            <Link legacyBehavior href="/category/all">
              {t.dir !== "rtl" ? "Products" : "المنتجات"}
            </Link>

            {/* <i className="dropdown icon"></i>
            <div className="menu">
              {categories?.map(({ _id, cover, name, nametr }: any) => (
                <Link
                  key={uuidv4()}
                  className="!block item"
                  href={`/category/${_id}`}
                >
                  {t.dir === "rtl" ? name : nametr}
                </Link>
              ))}

              <Link legacyBehavior href="/category/all">
                <a className={`item`} onClick={menuToggle}>
                  {t.dir === "rtl" ? "كافة المنتجات" : " All Products"}
                </a>
              </Link>
            </div> */}
          </div>
          {/* <Link legacyBehavior href="/~/cart">
            <a
              className={`item ${isActive("/~/cart") ? "active" : null}`}
              onClick={menuToggle}
            >
              {t.dir === "rtl" ? "السلة" : "Cart"}
            </a>
          </Link> */}
          {/* <Link legacyBehavior href="/about">
            <a
              className={`item ${isActive("/about") ? "active" : null}`}
              onClick={menuToggle}
            >
              {t.dir === "rtl" ? "من نحن" : "About"}
            </a>
          </Link> */}

          <div className="menu root-user">
            {user ? (
              <>
                <div className="ui simple dropdown item">
                  {user.name}
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    {userRouters?.map(({ id, route }) => (
                      <Link className="" legacyBehavior href={`/${route!}`}>
                        <a
                          className={`item ${
                            isActive(`/${route}`) ? "active" : null
                          }  !font-estedad`}
                          onClick={menuToggle}
                        >
                          {/* <i className="dashboard icon "></i> */}
                          <FormattedMessage id={id} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <React.Fragment>
                <Link legacyBehavior href="/auth/login">
                  <a
                    className={`item ${
                      isActive("/auth/login") ? "active" : null
                    }`}
                    onClick={menuToggle}
                  >
                    {t.dir === "rtl" ? "تسجيل دخول" : "Login"}
                  </a>
                </Link>

                <Link legacyBehavior href="/auth/register">
                  <a
                    className={`item ${
                      isActive("/auth/signup") ? "active" : null
                    }`}
                    onClick={menuToggle}
                  >
                    {t.dir === "rtl" ? "مستخدم جديد" : "Signup"}
                  </a>
                </Link>
              </React.Fragment>
            )}
            {/* <form
              className="ui form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
                menuToggle();
              }}
            >
              <div className="ui transparent icon input">
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search..."
                  name="search"
                  value={search.search}
                  onChange={handleOnChange}
                />
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                    menuToggle();
                  }}
                  className="search link icon"
                ></i>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticHeader;

// ----------------------

// import { profileLinks } from "../../../data";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useCallback, useMemo ,useState , useEffect } from "react";
// import DropDown from "./DropDown";
// import { ArrowDown2, ShoppingCart, User, MenuBoard } from "iconsax-react";
// import HeaderLinks from "./HeaderLinks";
// import MobileNav from "./MobileNav";
// import english from "@/public/turkish2.jpg";
// import arabic from "@/public/arabic2.png";
// import LanguageToggle from "@/context/selectLanguage";
// import { useLanguageContext } from "@/context/languageContext";
// import { useTranslation } from "@/context/useTranslation";
// import useAuth from "@/hooks/useAuth";
// import _Routes from "@/layouts/partials/routes.json";
// import { FormattedMessage } from "react-intl";
// import useCategories from "@/hooks/useCategories";
// import { MenuItem } from "@material-ui/core";

// // import SearchBox from "../filters/SearchBox";
// // import { usePathname } from "next/navigation";
// // import useUser from "@/hooks/useUser";
// // import LogOut from "./LogOut";
// import { v4 as uuidv4 } from "uuid";

// export default function Header2() {
//   // const pathName = usePathname();

//   const {
//     data: categories,
//     isLoading: isLoadingCats,
//     error: errorcats,
//   } = useCategories();

//   const status = true;
//   const router = useRouter();
//   const { user, logout, isLoading , mutate } = useAuth({

//   });

//   const userRouters =
//     user?.role === "user"
//       ? _Routes.user
//       : user?.role === "admin"
//       ? _Routes.admin
//       : [];

//   const handleLogout = async () => {
//     localStorage.clear();
//     console.log("logout⚡⚡⚡⚡⚡⚡");
//     await logout();
//     router.reload()
//     //router.push('/auth/login');
//   };

//   const { language, changeLanguage } = useLanguageContext();

//   const { translation } = useTranslation();

//   const t = useMemo(() => translation ?? {}, [translation]);
//   console.log("HEADER", t);

//   const selectLanguage = useCallback(
//     (language: string) => {
//       switch (language) {
//         case "en":
//           changeLanguage("en");
//           break;
//         case "ar":
//           changeLanguage("ar");
//           break;
//         default:
//           changeLanguage("en");
//           break;
//       }
//     },
//     [changeLanguage]
//   );

//   // const [orders, setOrders] = useState(0);

//   // useEffect(() => {
//   //   const orders: any = JSON.parse(localStorage.getItem("cart") || "null");
//   //   if (orders) {
//   //     console.log(orders?.length ,'cart data')
//   //     setOrders(orders?.length);
//   //   }
//   // }, []);

//   return (
//     <>
//       <div dir={t.dir === 'rtl' ? 'rtl' : 'ltr' } className="flex items-center border-b-2 b justify-between bg-muted-100 p-5 lg:px-4 lg:py-8 xl:px-14 xl:py-9 2xl:px-28">
//         <MobileNav t={t} categories={categories} />
//         <div className="w-[4rem] md:w-[4rem]">
//           <Link href={"/"}>
//             <Image
//               src={"/logoOutlet.png"}
//               className="h-full w-full object-cover object-center"
//               alt="logo"
//               width={60}
//               height={60}
//             />
//           </Link>
//         </div>

//         <div className=" hidden items-center gap-x-2 lg:flex">
//           <HeaderLinks t={t} />

//           <button className="group relative">
//             <span className="group  flex items-center gap-x-1 rounded-4 bg-primary-800 p-1 text-white md:p-2">
//               <MenuBoard className="h-5 w-5 text-white md:h-6 md:w-6" />
//               <ArrowDown2 className="h-5 w-5 text-white md:h-6 md:w-6" />
//             </span>

//             <DropDown containerClasses="smooth-transition opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
//             <DropDown.Item>
// <div className="text-center  gap-x-2">
//                     {/* <Icon className="h-5 w-5 text-muted-950" /> */}
//                     <Link className=" !block" href={`/category/all`}>{t.dir === 'rtl' ? 'قائمة الطغام' : 'All'}</Link>
//                   </div>

// </DropDown.Item>

//               {categories?.map(({ _id, cover, name, nametr }:any) => (
//                 <DropDown.Item key={uuidv4()}>

//                   <div className="text-center gap-x-2">
//                     {/* <Icon className="h-5 w-5 text-muted-950" /> */}
//                     <Link className="!block" href={`/category/${_id}`}>{ t.dir === 'rtl' ?  name : nametr}</Link>
//                   </div>
//                 </DropDown.Item>
//               ))}

//             </DropDown>
//           </button>
//         </div>

//         <div className="flex items-center gap-x-2">
//           {/* <SearchBox /> */}

// {user?.role !== 'admin' &&
//           <Link
//             href={"/~/~/cart"}
//             className="relative rounded-4 bg-primary-200 p-1 md:p-2"
//           >

// {/* <p className="caption-sm md:caption-md absolute right-0 top-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary-800 text-muted-100 md:right-0.5 md:top-0.5 md:h-5 md:w-5">
//                   {orders}
//                 </p> */}

//             <ShoppingCart className="h-5 w-5 text-primary-800 md:h-6 md:w-6" />
//           </Link>
// }

//           {user ? (
//             <button className="group relative">
//               <span className="group  flex items-center gap-x-1 rounded-4 bg-primary-800 p-1 text-white md:p-2">
//                 <User className="h-5 w-5 text-white md:h-6 md:w-6" />
//                 <ArrowDown2 className="h-5 w-5 text-white md:h-6 md:w-6" />
//               </span>

//               <DropDown containerClasses="smooth-transition opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
//                 {userRouters?.map(({ id, route }) => (
//                   <DropDown.Item key={uuidv4()}>
//                     <div className="flex items-center gap-x-2">
//                       <Link href={`/${route!}`}>
//                         <FormattedMessage id={id} />
//                       </Link>
//                     </div>
//                   </DropDown.Item>
//                 ))}

//                 <DropDown.Item>
//                   <div onClick={handleLogout}>Logout</div>
//                 </DropDown.Item>
//               </DropDown>
//             </button>
//           ) : (
//             <Link
//               href={"/auth/login"}
//               className={`smooth-transition rounded-4 bg-primary-200 p-1 md:p-2 `}
//             >
//               <User className="h-5 w-5 text-primary-800 md:h-6 md:w-6" />
//             </Link>
//           )}

//           <div>
//             <LanguageToggle
//               languages={[
//                 { label: "English", value: "en", img: english },
//                 { label: "عربي", value: "ar", img: arabic },
//               ]}
//               selectedLanguage={language}
//               selectLanguage={selectLanguage}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
