
import Link from "next/link";
import { AiFillFacebook } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { PiInstagramLogoFill } from "react-icons/pi";
import { IoLogoWhatsapp } from "react-icons/io";

import { type IconType, type IconBaseProps } from "react-icons";
import { clsx as cn } from "./index";
import { UseInitGeneralAnimationIntersectionObserver } from "./use-init-general-animation-intersection-observer";
import Img from "./img";
// import ShowCaseCarousel from "./_components/show-case-carousel";

const socialLinks: {
  children: { type: "icon"; Icon: IconType; props?: IconBaseProps };
  title: string;
  href: string;
}[] = [
  {
    title: "facebook",
    href: "https://www.facebook.com/profile.php?id=61551354688229&mibextid=LQQJ4d",
    children: {
      type: "icon",
      Icon: AiFillFacebook,
    },
  },
  {
    title: "tikTok",
    href: "https://www.tiktok.com/@zytoonah?_t=8fsY9B7oAs9&_r=1",
    children: {
      type: "icon",
      Icon: BiLogoTiktok,
    },
  },
  {
    title: "instagram",
    href: "https://instagram.com/zytoonah.eg?igshid=MzRlODBiNWFlZA==",
    children: {
      type: "icon",
      Icon: PiInstagramLogoFill,
    },
  },
  {
    title: "telephone",
    href: "tel:+201281238888",
    children: {
      type: "icon",
      Icon: BsFillTelephoneFill,
    },
  },
  {
    title: "whatsapp",
    href: "https://wa.me/201281238888",
    children: {
      type: "icon",
      Icon: IoLogoWhatsapp,
    },
  },
];

export default function Main({dir}) {
  return (
    <>
      <UseInitGeneralAnimationIntersectionObserver />
   


      <main className="flex flex-col bg-white text-slate-900">
        <section className="relative h-screen max-h-[60rem] min-h-[30rem] text-white">
          <Img
            src="https://organikzeytindali.com/wp-content/uploads/2024/03/olive-oil-and-purple-olives.jpg"
            width={1024}
            height={1024}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 h-full w-full bg-black/30" />
          <div className="relative mx-auto flex h-full w-full max-w-main items-center justify-center text-center">
            <div className="relative flex w-11/12 flex-col gap-8 rounded-lg bg-black/10 px-8 py-16 text-xl">
              <h1 className="text-5xl">
                {dir==='rtl' ? ' مرحبًا بك في مزرعة الزيتون ' : "Welcome to the olive farm Zaytouna"}
               
              </h1>
              <p className="leading-relaxed">
                حيث تلتقي العناية الحديثة بالزيتون مع عراقة التقليد.
                <br />
                تأسست شركة زيتونة برعاية شركة سماء العرب في عام 2014، ومنذ ذلك
                الحين،
                <br />
                حققت نجاحًا باهرًا في عالم صناعة زيت الزيتون والمنتجات المشتقة.
              </p>
            </div>
          </div>
        </section>



              <section dir={dir ==='rtl' ? 'rtl' :'rtl'} className="bg-white px-6 text-slate-900  container">
          <div
            className={cn(
              "flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-12 justify-center    after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2  pb-12 pt-36 px-2"
              // "mx-auto flex max-w-main gap-8 px-16 pb-12 pt-36",
              // "flex-col items-center justify-center lg:flex-row lg:justify-between",
            )}
          >
            <article className="flex flex-col gap-6 text-xl">
              <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
                جودة زيت الزيتون فائقة
              </h2>
              <div className="flex flex-col gap-1">
                <p className="max-w-[424px] leading-relaxed">
                  تتميز مزرعتنا بجودة زيت الزيتون الفائقة، حيث يتم حصاد هذه
                  الثمار النبيلة بعناية فائقة وبكل حب. نحن نعمل أيضًا على إنتاج
                  الزيتون المخلل اللذيذ، الذي يشكل جزءًا هامًا من منتجاتنا. بفضل
                  تقنيات التخليل المبتكرة، نقدم لكم تجربة متميزة مع زيتون مخلل
                  ذو نكهة رائعة ومميزة.





                </p>
                <p className="max-w-[424px] leading-relaxed">
                  نحن واثقون من أنكم ستشعرون بالفرق الكبير في كل نكهة من زيت
                  الزيتون الفائق وزيتون المخلل اللذيذ الذي نقدمه بكل فخر
                  واهتمام. اكتشفوا طعمًا لا يُضاهى وقيمة غذائية عالية مع زيتونة.
                </p>
              </div>
            </article>
            <div 
            // className="relative aspect-square h-[32rem] w-[32rem] max-w-[100%] md:max-w-[75%] sm:max-w-full"
            className="w-full lg:w-1/2 rounded-xl lg:rounded-3xl overflow-hidden h-[600px] md:h-[650px] flex max-md:mb-4"
            
            
            >
              {[
                {
                  src:"https://organikzeytindali.com/wp-content/uploads/2024/03/olive-oil-and-olives-.jpg",
                  // src: "/images/new/1.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                       "",
                    // "-translate-x-[20%] -translate-y-[25%]",
                },
                // {
                //   src: "/images/new/3.jpeg",
                //   "data-intersection-observer-element": true,
                //   "data-intersection-observer-on-intersect-add":
                //     "-translate-y-[5%] translate-x-[25%] rotate-[9deg] scale-50",
                // },
                // {
                //   src: "/images/new/4.jpeg",
                //   "data-intersection-observer-element": true,
                //   "data-intersection-observer-on-intersect-add":
                //     "-translate-x-[5%] translate-y-1/4 rotate-12 scale-50",
                // },
              ].map((item, itemIndex) => (
                <Img
                  key={itemIndex}
                  {...item}
                  width={500}
                  height={800}
                  alt=""
                  className={cn(
                    // "absolute inset-0 !h-full !w-full object-cover",
                    // "delay-[0.7s] transition-transform duration-700",
                    "!w-full object-cover !h-full   transition-all"
                  )}
                  data-intersection-observer-unobserve-after-intersect={true}
                />
              ))}
            </div>
          </div>
        </section> 





                 <section
          className={cn("relative text-white")}
          style={{
            backgroundImage: 
            "url(https://organikzeytindali.com/wp-content/uploads/2024/03/olives-and-olive-oil.jpg)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 w-full bg-black/50 sm:bg-black/25" />
          <div
            className={cn(
              "relative mx-auto flex w-full max-w-main flex-col gap-8 py-16 sm:px-16",
            )}
          >
            <div
              className={cn(
                "relative h-screen max-h-[30rem] min-h-[30rem]",
                "flex items-center justify-center lg:justify-end",
              )}
            >
              <article
                className={cn(
                  "sm:text-align-initial text-center",
                  "rounded-0 relative isolate mx-auto flex flex-col gap-4 text-xl sm:mx-0 sm:rounded-full",
                  "justify-center bg-black/50 px-8 py-16 sm:aspect-square sm:h-[30rem] sm:w-[30rem] sm:px-16",
                  "scale-[0.05]",
                  "origin-bottom-left transition-all duration-1000",
                )}
                data-intersection-observer-element={true}
                data-intersection-observer-on-intersect-remove="scale-[0.05]"
                data-intersection-observer-unobserve-after-intersect={true}
              >
                <h2 className="border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl sm:w-fit">
                  محاصيل متنوعة
                </h2>
                <p className="max-w-[424px] leading-relaxed">
                  وبالإضافة إلى الزيتون، نقوم أيضًا بزراعة بعض المحاصيل الأخرى
                  لتنويع منتجاتنا. نحن نولي اهتمامًا كبيرًا لتطوير وتنمية هذه
                  المحاصيل بنفس الاهتمام والحب الذي نوليه للزيتون. نحرص على
                  اختيار أفضل الأصناف وتوفير العناية اللازمة لضمان جودة وكمية
                  ممتازة.
                </p>
              </article>
            </div>
            {/* <ShowCaseCarousel /> */}
          </div>
        </section>






        {/* <section className="bg-white text-slate-900">
          <div
            className={cn(
              "mx-auto flex max-w-main gap-8 px-16 pb-12 pt-36",
              "flex-col items-center justify-center lg:flex-row lg:justify-between",
            )}
          >
            <article className="flex flex-col gap-6 text-xl">
              <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
                جودة زيت الزيتون فائقة
              </h2>
              <div className="flex flex-col gap-1">
                <p className="max-w-[424px] leading-relaxed">
                  تتميز مزرعتنا بجودة زيت الزيتون الفائقة، حيث يتم حصاد هذه
                  الثمار النبيلة بعناية فائقة وبكل حب. نحن نعمل أيضًا على إنتاج
                  الزيتون المخلل اللذيذ، الذي يشكل جزءًا هامًا من منتجاتنا. بفضل
                  تقنيات التخليل المبتكرة، نقدم لكم تجربة متميزة مع زيتون مخلل
                  ذو نكهة رائعة ومميزة.
                </p>
                <p className="max-w-[424px] leading-relaxed">
                  نحن واثقون من أنكم ستشعرون بالفرق الكبير في كل نكهة من زيت
                  الزيتون الفائق وزيتون المخلل اللذيذ الذي نقدمه بكل فخر
                  واهتمام. اكتشفوا طعمًا لا يُضاهى وقيمة غذائية عالية مع زيتونة.
                </p>
              </div>
            </article>
            <div className="relative aspect-square h-[32rem] w-[32rem] max-w-[75%] sm:max-w-full">
              {[
                {
                  src: "/images/new/1.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-x-[20%] -translate-y-[25%] rotate-[6deg] scale-50",
                },
                {
                  src: "/images/new/3.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-y-[5%] translate-x-[25%] rotate-[9deg] scale-50",
                },
                {
                  src: "/images/new/4.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-x-[5%] translate-y-1/4 rotate-12 scale-50",
                },
              ].map((item, itemIndex) => (
                <Img
                  key={itemIndex}
                  {...item}
                  width={500}
                  height={800}
                  alt=""
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover",
                    "delay-[0.7s] transition-transform duration-700",
                  )}
                  data-intersection-observer-unobserve-after-intersect={true}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-900">
          <div
            className={cn(
              "mx-auto flex max-w-main gap-8 px-16 pb-36 pt-16",
              "flex-col items-center justify-center lg:flex-row lg:justify-between",
            )}
          >
            <div className="relative aspect-square h-[32rem] w-[32rem] max-w-[90%] sm:max-w-full">
              {[
                {
                  src: "/images/new/5.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-x-[20%] -translate-y-[25%] -rotate-[6deg] scale-50",
                },
                {
                  src: "/images/new/6.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-y-[5%] translate-x-[25%] -rotate-[9deg] scale-50",
                },
                {
                  src: "/images/new/7.jpeg",
                  "data-intersection-observer-element": true,
                  "data-intersection-observer-on-intersect-add":
                    "-translate-x-[5%] translate-y-1/4 -rotate-12 scale-50",
                },
              ].map((item, itemIndex) => (
                <Img
                  key={itemIndex}
                  {...item}
                  width={500}
                  height={800}
                  alt=""
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover",
                    "delay-[0.7s] transition-transform duration-700",
                  )}
                  data-intersection-observer-unobserve-after-intersect={true}
                />
              ))}
            </div>
            <article className="flex flex-col gap-6 text-xl">
              <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
                أعلى كفائة
              </h2>
              <p className="max-w-[424px] leading-relaxed">
                نحن في مزرعة الزيتون &ldquo;زيتونة&rdquo; نعمل بكل اجتهاد وإخلاص
                لتقديم مجموعة متنوعة من المنتجات الزراعية ذات الجودة العالية.
                نسعى جاهدين لتلبية توقعاتكم وتقديم تجربة مميزة ترضي أذواقكم
                المتنوعة.
              </p>
            </article>
          </div>
        </section> */}




        {/* <section
          className={cn("relative text-white")}
          style={{
            backgroundImage: "url(/images/3443083.jpg)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 w-full bg-black/50 sm:bg-black/25" />
          <div
            className={cn(
              "relative mx-auto flex w-full max-w-main flex-col gap-8 py-16 sm:px-16",
            )}
          >
            <div
              className={cn(
                "relative h-screen max-h-[30rem] min-h-[30rem]",
                "flex items-center justify-center lg:justify-end",
              )}
            >
              <article
                className={cn(
                  "sm:text-align-initial text-center",
                  "rounded-0 relative isolate mx-auto flex flex-col gap-4 text-xl sm:mx-0 sm:rounded-full",
                  "justify-center bg-black/50 px-8 py-16 sm:aspect-square sm:h-[30rem] sm:w-[30rem] sm:px-16",
                  "scale-[0.05]",
                  "origin-bottom-left transition-all duration-1000",
                )}
                data-intersection-observer-element={true}
                data-intersection-observer-on-intersect-remove="scale-[0.05]"
                data-intersection-observer-unobserve-after-intersect={true}
              >
                <h2 className="border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl sm:w-fit">
                  محاصيل متنوعة
                </h2>
                <p className="max-w-[424px] leading-relaxed">
                  وبالإضافة إلى الزيتون، نقوم أيضًا بزراعة بعض المحاصيل الأخرى
                  لتنويع منتجاتنا. نحن نولي اهتمامًا كبيرًا لتطوير وتنمية هذه
                  المحاصيل بنفس الاهتمام والحب الذي نوليه للزيتون. نحرص على
                  اختيار أفضل الأصناف وتوفير العناية اللازمة لضمان جودة وكمية
                  ممتازة.
                </p>
              </article>
            </div>
           
          </div>
        </section> */}



        

     
      </main>
      <footer className="bg-special-primary-500  bg-[#c1c686]">
        <div className="mx-auto flex max-w-main items-center justify-between px-8 py-4">
          {/* <Link href="/" title="home">
            <Img
              src="/images/Screen_Shot_2023-09-15_at_12.38.49_PM-removebg-preview.png"
              alt="zaytona logo"
              width={200}
              height={150}
              className="h-10 w-16"
            />
          </Link> */}

<span  onClick={() => window.location = 'mailto:infi@levant33.com'} className="text-xl cursor-pointer md:text-xl">

infi@levant33.com
</span>

          <ul className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <li key={item.title}>
                <a
                  title={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener norefeer"
                  className="flex !text-black h-8 w-8 items-center justify-center"
                >
                  <item.children.Icon className="w-full h-full" {...(item.children.props ?? {})} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}



// import Link from "next/link";
// import { AiFillFacebook } from "react-icons/ai";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { BiLogoTiktok } from "react-icons/bi";
// import { PiInstagramLogoFill } from "react-icons/pi";
// import { IoLogoWhatsapp } from "react-icons/io";

// import { type IconType, type IconBaseProps } from "react-icons";
// import { clsx as cn } from "./index";
// import { UseInitGeneralAnimationIntersectionObserver } from "./use-init-general-animation-intersection-observer";
// import Img from "./img";
// // import ShowCaseCarousel from "./_components/show-case-carousel";

// const socialLinks: {
//   children: { type: "icon"; Icon: IconType; props?: IconBaseProps };
//   title: string;
//   href: string;
// }[] = [
//   {
//     title: "facebook",
//     href: "https://www.facebook.com/profile.php?id=61551354688229&mibextid=LQQJ4d",
//     children: {
//       type: "icon",
//       Icon: AiFillFacebook,
//     },
//   },
//   {
//     title: "tikTok",
//     href: "https://www.tiktok.com/@zytoonah?_t=8fsY9B7oAs9&_r=1",
//     children: {
//       type: "icon",
//       Icon: BiLogoTiktok,
//     },
//   },
//   {
//     title: "instagram",
//     href: "https://instagram.com/zytoonah.eg?igshid=MzRlODBiNWFlZA==",
//     children: {
//       type: "icon",
//       Icon: PiInstagramLogoFill,
//     },
//   },
//   {
//     title: "telephone",
//     href: "tel:+201281238888",
//     children: {
//       type: "icon",
//       Icon: BsFillTelephoneFill,
//     },
//   },
//   {
//     title: "whatsapp",
//     href: "https://wa.me/201281238888",
//     children: {
//       type: "icon",
//       Icon: IoLogoWhatsapp,
//     },
//   },
// ];

// export default function Main() {
//   return (
//     <>
//       <UseInitGeneralAnimationIntersectionObserver />
//       {/* <header className="fixed inset-x-0 z-10 bg-white/20 backdrop-blur-[1px]">
//         <div className="item-center mx-auto flex h-main-header-h max-w-main items-center justify-between gap-4 px-8 font-medium">
//           <Link href="/" title="home">
//             <Img
//               src="/images/Screen_Shot_2023-09-15_at_12.38.49_PM-removebg-preview.png"
//               alt="zaytona logo"
//               width={200}
//               height={150}
//               className="h-10 w-16"
//             />
//           </Link>
//           <ul className="flex items-center gap-4">
//             {[{ name: "منتجاتنا", href: "#product-sample" }].map((item) => (
//               <li key={item.name}>
//                 <Link href={item.href}>{item.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </header> */}



//       <main className="flex flex-col">
//         <section className="relative h-screen max-h-[60rem] min-h-[30rem] text-white">
//           <Img
//           src="https://organikzeytindali.com/wp-content/uploads/2024/03/olive-oil-and-purple-olives.jpg"
//             // src="/images/new/2.jpeg"
//             width={1024}
//             height={1024}
//             alt=""
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 h-full w-full bg-black/30" />
//           <div className="relative mx-auto flex h-full w-full max-w-main items-center justify-center text-center">
//             <div className="relative flex w-11/12 flex-col gap-8 rounded-lg bg-black/10 px-8 py-16 text-xl">
//               <h1 className="text-5xl">
//                 مرحبًا بك في مزرعة الزيتون &ldquo;زيتونة&rdquo;
//               </h1>
//               <p className="leading-relaxed">
//                 حيث تلتقي العناية الحديثة بالزيتون مع عراقة التقليد.
//                 <br />
//                 تأسست شركة زيتونة برعاية شركة سماء العرب في عام 2014، ومنذ ذلك
//                 الحين،
//                 <br />
//                 حققت نجاحًا باهرًا في عالم صناعة زيت الزيتون والمنتجات المشتقة.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="bg-white px-6 text-slate-900  container">
//           <div
//             className={cn(
//               "flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-12 justify-center after:bg-ngc_orange after:h-4 after:w-8/12 after:absolute after:md:hidden after:top-40 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 md:flex-row-revers  pb-12 pt-36 px-2"
//               // "mx-auto flex max-w-main gap-8 px-16 pb-12 pt-36",
//               // "flex-col items-center justify-center lg:flex-row lg:justify-between",
//             )}
//           >
//             <article className="flex flex-col gap-6 text-xl">
//               <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
//                 جودة زيت الزيتون فائقة
//               </h2>
//               <div className="flex flex-col gap-1">
//                 <p className="max-w-[424px] leading-relaxed">
//                   تتميز مزرعتنا بجودة زيت الزيتون الفائقة، حيث يتم حصاد هذه
//                   الثمار النبيلة بعناية فائقة وبكل حب. نحن نعمل أيضًا على إنتاج
//                   الزيتون المخلل اللذيذ، الذي يشكل جزءًا هامًا من منتجاتنا. بفضل
//                   تقنيات التخليل المبتكرة، نقدم لكم تجربة متميزة مع زيتون مخلل
//                   ذو نكهة رائعة ومميزة.
//                 </p>
//                 <p className="max-w-[424px] leading-relaxed">
//                   نحن واثقون من أنكم ستشعرون بالفرق الكبير في كل نكهة من زيت
//                   الزيتون الفائق وزيتون المخلل اللذيذ الذي نقدمه بكل فخر
//                   واهتمام. اكتشفوا طعمًا لا يُضاهى وقيمة غذائية عالية مع زيتونة.
//                 </p>
//               </div>
//             </article>
//             <div 
//             // className="relative aspect-square h-[32rem] w-[32rem] max-w-[100%] md:max-w-[75%] sm:max-w-full"
//             className="w-full lg:w-1/2 rounded-xl lg:rounded-3xl overflow-hidden h-[600px] md:h-[650px] flex max-md:mb-4"
            
            
//             >
//               {[
//                 {
//                   src:"https://organikzeytindali.com/wp-content/uploads/2024/03/olive-oil-and-olives-.jpg",
//                   // src: "/images/new/1.jpeg",
//                   "data-intersection-observer-element": true,
//                   "data-intersection-observer-on-intersect-add":
//                     "-translate-x-[20%] -translate-y-[25%]",
//                 },
//                 // {
//                 //   src: "/images/new/3.jpeg",
//                 //   "data-intersection-observer-element": true,
//                 //   "data-intersection-observer-on-intersect-add":
//                 //     "-translate-y-[5%] translate-x-[25%] rotate-[9deg] scale-50",
//                 // },
//                 // {
//                 //   src: "/images/new/4.jpeg",
//                 //   "data-intersection-observer-element": true,
//                 //   "data-intersection-observer-on-intersect-add":
//                 //     "-translate-x-[5%] translate-y-1/4 rotate-12 scale-50",
//                 // },
//               ].map((item, itemIndex) => (
//                 <Img
//                   key={itemIndex}
//                   {...item}
//                   width={500}
//                   height={800}
//                   alt=""
//                   className={cn(
//                     // "absolute inset-0 !h-full !w-full object-cover",
//                     // "delay-[0.7s] transition-transform duration-700",
//                     "w-full object-cover h-full   transition-all"
//                   )}
//                   data-intersection-observer-unobserve-after-intersect={true}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>



//         <section className="bg-white px-6 text-slate-900  container">
//           <div
//             className={cn(
//               "flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-12 justify-center after:bg-ngc_orange after:h-4 after:w-8/12 after:absolute after:md:hidden after:top-40 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 md:flex-row-revers  pb-12 pt-36 px-2"
//               // "mx-auto flex max-w-main gap-8 px-16 pb-12 pt-36",
//               // "flex-col items-center justify-center lg:flex-row lg:justify-between",
//             )}
//           >





//             <article className="flex flex-col gap-6 text-xl">
//               <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
//                 جودة زيت الزيتون فائقة
//               </h2>
//               <div className="flex flex-col gap-1">
//                 <p className="max-w-[424px] leading-relaxed">
//                   تتميز مزرعتنا بجودة زيت الزيتون الفائقة، حيث يتم حصاد هذه
//                   الثمار النبيلة بعناية فائقة وبكل حب. نحن نعمل أيضًا على إنتاج
//                   الزيتون المخلل اللذيذ، الذي يشكل جزءًا هامًا من منتجاتنا. بفضل
//                   تقنيات التخليل المبتكرة، نقدم لكم تجربة متميزة مع زيتون مخلل
//                   ذو نكهة رائعة ومميزة.
//                 </p>
//                 <p className="max-w-[424px] leading-relaxed">
//                   نحن واثقون من أنكم ستشعرون بالفرق الكبير في كل نكهة من زيت
//                   الزيتون الفائق وزيتون المخلل اللذيذ الذي نقدمه بكل فخر
//                   واهتمام. اكتشفوا طعمًا لا يُضاهى وقيمة غذائية عالية مع زيتونة.
//                 </p>
//               </div>
//             </article>

//             <div 
//             // className="relative aspect-square h-[32rem] w-[32rem] max-w-[100%] md:max-w-[75%] sm:max-w-full"
//             className="w-full lg:w-1/2 rounded-xl lg:rounded-3xl overflow-hidden h-[600px] md:h-[650px] flex max-md:mb-4"
            
            
//             >
//               {[
//                 {
//                   src:"https://www.dumangurme.com/tema/genel/uploads/haberler/69-2-thegem-blog-default.jpg",
//                   // src: "/images/new/1.jpeg",
//                   "data-intersection-observer-element": true,
//                   "data-intersection-observer-on-intersect-add":
//                     "-translate-x-[20%] -translate-y-[25%]",
//                 },
//                 // {
//                 //   src: "/images/new/3.jpeg",
//                 //   "data-intersection-observer-element": true,
//                 //   "data-intersection-observer-on-intersect-add":
//                 //     "-translate-y-[5%] translate-x-[25%] rotate-[9deg] scale-50",
//                 // },
//                 // {
//                 //   src: "/images/new/4.jpeg",
//                 //   "data-intersection-observer-element": true,
//                 //   "data-intersection-observer-on-intersect-add":
//                 //     "-translate-x-[5%] translate-y-1/4 rotate-12 scale-50",
//                 // },
//               ].map((item, itemIndex) => (
//                 <Img
//                   key={itemIndex}
//                   {...item}
//                   width={500}
//                   height={800}
//                   alt=""
//                   className={cn(
//                     // "absolute inset-0 !h-full !w-full object-cover",
//                     // "delay-[0.7s] transition-transform duration-700",
//                     "w-full object-cover h-full   transition-all"
//                   )}
//                   data-intersection-observer-unobserve-after-intersect={true}
//                 />
//               ))}
//             </div>
         
//           </div>
//         </section>






//         {/* <section className="bg-white text-slate-900">
//           <div
//             className={cn(
//               "mx-auto flex max-w-main gap-8 px-16 pb-36 pt-16",
//               "flex-col items-center justify-center lg:flex-row lg:justify-between",
//             )}
//           >
//             <div className="relative aspect-square h-[32rem] w-[32rem] max-w-[90%] sm:max-w-full">
//               {[
//                 {
//                   src: "/images/new/5.jpeg",
//                   "data-intersection-observer-element": true,
//                   "data-intersection-observer-on-intersect-add":
//                     "-translate-x-[20%] -translate-y-[25%] -rotate-[6deg] scale-50",
//                 },
//                 {
//                   src: "/images/new/6.jpeg",
//                   "data-intersection-observer-element": true,
//                   "data-intersection-observer-on-intersect-add":
//                     "-translate-y-[5%] translate-x-[25%] -rotate-[9deg] scale-50",
//                 },
//                 {
//                   src: "/images/new/7.jpeg",
//                   "data-intersection-observer-element": true,
//                   "data-intersection-observer-on-intersect-add":
//                     "-translate-x-[5%] translate-y-1/4 -rotate-12 scale-50",
//                 },
//               ].map((item, itemIndex) => (
//                 <Img
//                   key={itemIndex}
//                   {...item}
//                   width={500}
//                   height={800}
//                   alt=""
//                   className={cn(
//                     "absolute inset-0 h-full w-full object-cover",
//                     "delay-[0.7s] transition-transform duration-700",
//                   )}
//                   data-intersection-observer-unobserve-after-intersect={true}
//                 />
//               ))}
//             </div>
//             <article className="flex flex-col gap-6 text-xl">
//               <h2 className="w-fit border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl">
//                 أعلى كفائة
//               </h2>
//               <p className="max-w-[424px] leading-relaxed">
//                 نحن في مزرعة الزيتون &ldquo;زيتونة&rdquo; نعمل بكل اجتهاد وإخلاص
//                 لتقديم مجموعة متنوعة من المنتجات الزراعية ذات الجودة العالية.
//                 نسعى جاهدين لتلبية توقعاتكم وتقديم تجربة مميزة ترضي أذواقكم
//                 المتنوعة.
//               </p>
//             </article>
//           </div>
//         </section> */}




//         <section
//           className={cn("relative text-white")}
//           style={{
//             backgroundImage: 
//             "url(https://organikzeytindali.com/wp-content/uploads/2024/03/olives-and-olive-oil.jpg)",
//             backgroundAttachment: "fixed",
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//           }}
//         >
//           <div className="absolute inset-0 w-full bg-black/50 sm:bg-black/25" />
//           <div
//             className={cn(
//               "relative mx-auto flex w-full max-w-main flex-col gap-8 py-16 sm:px-16",
//             )}
//           >
//             <div
//               className={cn(
//                 "relative h-screen max-h-[30rem] min-h-[30rem]",
//                 "flex items-center justify-center lg:justify-end",
//               )}
//             >
//               <article
//                 className={cn(
//                   "sm:text-align-initial text-center",
//                   "rounded-0 relative isolate mx-auto flex flex-col gap-4 text-xl sm:mx-0 sm:rounded-full",
//                   "justify-center bg-black/50 px-8 py-16 sm:aspect-square sm:h-[30rem] sm:w-[30rem] sm:px-16",
//                   "scale-[0.05]",
//                   "origin-bottom-left transition-all duration-1000",
//                 )}
//                 data-intersection-observer-element={true}
//                 data-intersection-observer-on-intersect-remove="scale-[0.05]"
//                 data-intersection-observer-unobserve-after-intersect={true}
//               >
//                 <h2 className="border-b-[0.25rem] border-b-special-primary-500 pb-4 text-4xl sm:w-fit">
//                   محاصيل متنوعة
//                 </h2>
//                 <p className="max-w-[424px] leading-relaxed">
//                   وبالإضافة إلى الزيتون، نقوم أيضًا بزراعة بعض المحاصيل الأخرى
//                   لتنويع منتجاتنا. نحن نولي اهتمامًا كبيرًا لتطوير وتنمية هذه
//                   المحاصيل بنفس الاهتمام والحب الذي نوليه للزيتون. نحرص على
//                   اختيار أفضل الأصناف وتوفير العناية اللازمة لضمان جودة وكمية
//                   ممتازة.
//                 </p>
//               </article>
//             </div>
//             {/* <ShowCaseCarousel /> */}
//           </div>
//         </section>

     
//       </main>
//       <footer className="bg-special-primary-500  bg-[#c1c686]">
//         <div className="mx-auto flex max-w-main items-center justify-between px-8 py-4">
//           <Link href="/" title="home">
//             <Img
//               src="/images/Screen_Shot_2023-09-15_at_12.38.49_PM-removebg-preview.png"
//               alt="zaytona logo"
//               width={200}
//               height={150}
//               className="h-10 w-16"
//             />
//           </Link>

//           <ul className="flex items-center gap-4">
//             {socialLinks.map((item) => (
//               <li key={item.title}>
//                 <a
//                   title={item.title}
//                   href={item.href}
//                   target="_blank"
//                   rel="noopener norefeer"
//                   className="flex !text-black h-8 w-8 items-center justify-center"
//                 >
//                   <item.children.Icon className="w-full h-full" {...(item.children.props ?? {})} />
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </footer>
//     </>
//   );
// }