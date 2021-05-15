import React, { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import OutfitProducts from './OutfitProducts.jsx';

const CarouselContainer = (props) => {

  const [readyToRender, setReadyToRender] = useState(true);

  // This responsive variable was added from the react-multi-carousel docs (https://www.npmjs.com/package/react-multi-carousel)
  // The important option here is the items (number of cards shown at one time)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      paritialVisibilityGutter: 60
    }
  };

  let returnRender = readyToRender ? (

    <div className="carouselOuterDiv">

      <h3 className="pRelated">RELATED PRODUCTS</h3>
      <RelatedProducts productId={props.productId}/>
      <h3 className="pRelated">YOUR OUTFIT</h3>
      <OutfitProducts />
    </div>
  ) : (<div>Loading carousel...</div>)
  
  return returnRender
}

export default CarouselContainer;
