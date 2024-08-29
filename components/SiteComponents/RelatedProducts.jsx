import React from 'react';
import Link from 'next/link';
import { HandlePrice ,HandleDolar } from '@/utils/HandlePrice';

const RelatedProducts = ({related = [] ,t}) => {   
    
    const country = localStorage.getItem('country') || "";

    return(
        <div className="related-products-area">
            <div className="section-title">
                <h2>

                    {t?.dir === 'rtl' ? 'منتجات مشابهة' : 'Related Products'}
                    
                    
                    
                    </h2>
            </div>

            <div className="ui centered stackable four cards">
                {related?.length ? (related?.map(p => (
                    <Link legacyBehavior     href={`/~/product/${p?._id}`}
                    key={p._id}>
                        <a className="ui green fluid card single-grocery-products-box">
                            <div className="image">
                                <img className='!h-[300px]' src={p?.cover} alt={p?.title} />
                            </div>
                            <div className="content">
                                <div className="header">
                                {t.dir === "rtl" ? p?.title : p?.titletr}
                                </div>
                                <div className="meta">
                                    {HandlePrice(p ,country)} {HandleDolar(t.dir ,country)}
                                    {/* {p.price}$ */}
                                </div>
                            </div>
                        </a>
                    </Link>
                ))): null}
            </div>
        </div>
    );
}

export default RelatedProducts;