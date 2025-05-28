import React from 'react';
import TopImage from '../components/TopImage';
import{ initialProducts, additionalProducts,initialProductsR, additionalProductsR} from"../data/product";
import Footer from '../layouts/Footer';
import ProductGallery from '../components/ProductGallery';
function ArrivalPage() {
    return (
            <div className="relative bg-black">
        <TopImage/>
        <ProductGallery  initialProducts={initialProducts} additionalProducts={additionalProducts} />
        <Footer/>
        </div>
        
      );
}

export default ArrivalPage;