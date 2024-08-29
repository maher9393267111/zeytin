Qatar --> Bahrain
Oman --> Kuwait

                


import { useLanguageContext } from "@/context/languageContext";

import { useTranslation } from "@/context/useTranslation";



 const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);




{
  "user": [
    {
      "id": "header.orders",
      "route": "/~/orders"
    },
    {
      "id": "header.cart",
      "route": "/~/cart"
    }
,
{
  "id": "header.whishlist",
  "route": "/~/whishlist"
}


  ],
  "admin": [
    {
      "id": "header.dashboard",
      "route": "/admin/dashboard"
    },
    {
      "id": "header.addBook",
      "route": "/admin/book/create"
    },
    {
      "id": "header.categories",
      "route": "/admin/category"
    },

    {
      "id": "header.createCategory",
      "route": "/admin/category/create"
    },

    {
      "id": "header.sliders",
      "route": "/admin/slider"
    },



    {
      "id": "header.addSlider",
      "route": "/admin/slider/create"
    },

    {
      "id": "header.books",
      "route": "/admin/book"
    }



 
  ]
}
