
import React, { useState } from "react";
import {
  CallCalling,
  HambergerMenu,
  Home,
  HomeHashtag,
  MenuBoard,
  Profile2User,
} from "iconsax-react";
import { mobileLinks } from "../../../data/index";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "./Drawer";
import Accordian from "./Accordion";
import { v4 as uuidv4 } from "uuid";

// types
type MobileLinksProps = {
  closeDrawer: () => void;
};


const renderIcon = (type: string) => {
  switch (type) {
    case "home page":
      return <Home className="h-5 w-5 text-black" />;
    case "branch":
      return <HomeHashtag className="h-5 w-5 text-black" />;

    case "menu":
      return <MenuBoard className="h-5 w-5 text-black" />;

    case "about":
      return <Profile2User className="h-5 w-5 text-black" />;

    case "contact":
      return <CallCalling className="h-5 w-5 text-black" />;
  }
};


const MobileLinks = ({ closeDrawer ,t }: any) => {
  // hooks
  const pathName = usePathname();

  // Icon rendering based on button type
 

  return (
    <ul className="px-2">
      {mobileLinks.map((item:any, index: number) => {
        const isActive = pathName === item.href;

        return (
          <li
            key={uuidv4()}
            className={`caption-lg border-muted-500 py-2 [&:not(first-child)]:border-b ${
              isActive && "text-primary-800"
            }`}
          >
            {item.type === "link" ? (
              // item is a link
              <Link
                href={item.href!}
                onClick={closeDrawer}
                className="flex w-full items-center gap-x-2"
              >
                {item.icon && renderIcon(item.value)}
                <p>{t.dir ==='rtl' ? item?.title : item?.titletr}</p>
              </Link>
            ) : (
              // item is a accordion
              <Accordian
             
                icon={renderIcon(item.value)}
                title={item.title}
                contentClasses="flex flex-col pe-5"
                titleContainer="gap-2"
              >
                {item.accordionItems?.map((accordionContent: any) => (
                  <Link
                    onClick={closeDrawer}
                    href={accordionContent.href}
                    key={uuidv4()}
                  >
                    <div className="caption-md mt-2 rounded-8 bg-primary-100 p-2 hover:bg-primary-100">
                      {t.dir ==='rtl' ? accordionContent.title : accordionContent?.titletr}
                    </div>
                  </Link>
                ))}
              </Accordian>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const MobileNav = ({categories ,t}:any) => {
  // Drawer state
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button className="block lg:hidden" onClick={() => setOpen(true)}>
        <HambergerMenu className="h-8 w-8 !text-primary-800" />
      </button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <MobileLinks t={t} closeDrawer={() => setOpen(false)} />

        <Accordian
         isLink={true}
         onClick={() => setOpen(false)}
                icon={renderIcon("menu")}
                title={t.dir ==="rtl" ?  'قائمة الطعام' :"Menu"}
                contentClasses="flex flex-col pe-5 !px-6"
                containerClasses="px-3 py-1"
                titleContainer="gap-2"
              >
                {categories?.map((accordionContent: any) => (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/category/${accordionContent?._id}`}
                    key={uuidv4()}
                  >
                    <div className="caption-md mt-2 rounded-8 bg-primary-200 p-2 hover:bg-primary-200">
                      {t.dir ==='rtl' ? accordionContent?.name  : accordionContent?.nametr}
                    </div>
                  </Link>
                ))}


              </Accordian>







      </Drawer>
    </>
  );
};

export default MobileNav;
