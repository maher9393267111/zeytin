import Link from "next/link";

const HotProducts = ({ products, t, title }) => {




 

  return (
    <div className="grocery-products-area">
      <div className="section-title">
        {/* <span className="sub-title">
          {t.dir === "rtl" ? "المنتجات" : "Products"}
        </span> */}
        <h2>{title}</h2>
      </div>

      <div className="ui centered stackable four cards">
        {products?.map((product) => {
              

         
            return (
                // <div>
             
          <Link
          className="relative"
            legacyBehavior
            href={`/~/product/${product?._id}`}
            key={product._id}
          >
            <a className="ui green fluid card single-grocery-products-box">
              <div className="image relativ">
                <img
                    data-intersection-observer-element={true}
                    data-intersection-observer-on-intersect-remove="scale-125"
                    data-intersection-observer-unobserve-after-intersect={
                      true
                    }
                loading="lazy"
                  className=" !h-[400px]"
                  src={product?.cover}
                  alt={t.dir === "rtl" ? product?.title : product?.titletr}
                />
             
             {/* <div onClick={() => handleOrder(product)}>

             <FaHeart className={` ${existingProduct ? 'text-red-500' : " text-white"}  absolute top-3 right-3  text-2xl`} />


                </div> */}


    
              </div>

              <div className="content">
                <div className="header !font-estedad">
                  {t.dir === "rtl" ? product?.title : product?.titletr}
                </div>
                <div className="meta !font-estedad">
                  {/* ${product?.price} */}
                  
               {product?.price}$
                  
                  
                  </div>
              </div>


           </a>
          </Link>
            )
})}
      </div>
    </div>
  );
};

export default HotProducts;
