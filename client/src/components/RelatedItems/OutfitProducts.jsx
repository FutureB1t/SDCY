import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import axios from 'axios';

const OutfitProducts = (props) => {

  const [productList, setProductList] = useState(localStorage.getItem('magicX1') ? localStorage.getItem('magicX1').split('#') : []);
  const [outfitRenderList, setOutfitRenderList] = useState([]);
  const [hasClicked, setHasClicked] = useState(false);

  const selectedWindowsItemID = window.location.search.replace('?p_id=', '');

  const addOutfitItem = (id) => {

      axios({ url: `api/products/` + id, method: 'get' })
      .then((res) => { return(res.data) })
      .then((resProduct) => {

        axios({ url: `api/products/` + id + `/styles`, method: 'get' })
        .then((resStyle) => {

          let addData = outfitRenderList => [...outfitRenderList,

            <ItemCard
              itemImage={resStyle.data.results[0].photos[0].thumbnail_url}
              itemCategory={resProduct.category}
              itemName={resProduct.name}
              itemPrice={resProduct.default_price}
              itemStyle={resProduct.name}
              itemProductId={id}
            />
          ];
          setOutfitRenderList(addData);
        })
      })
      .catch((err) => console.log('outfitInfo error: ', err));
  }

  const checkIfOutfitExists = (id) => {

      let getAllOutFitIDs = [];
      for (var i = 0; i < outfitRenderList.length; i++) {

        getAllOutFitIDs.push(outfitRenderList[i].id)
      }

      if (getAllOutFitIDs.indexOf(id) === -1) {
        return false
      } else {
        return true
      }
  }

  useEffect(() => {

      localStorage.setItem('magicX1', productList.join('#'));

      if (hasClicked === false) {
      if (productList.length != 0) {


        for (var i = 0; i < productList.length; i++) {

          if (checkIfOutfitExists(productList[i]) === false) {

            addOutfitItem(productList[i])
          }
        }
      }}

  }, [productList, hasClicked]);

  const handleClick = () => {

    setHasClicked(true);

   if (productList.length === 0) {

    setProductList([selectedWindowsItemID])
    addOutfitItem(selectedWindowsItemID)

   } else {

    if (productList.indexOf(selectedWindowsItemID) === -1) {
        setProductList(productList => [...productList, selectedWindowsItemID])
        addOutfitItem(selectedWindowsItemID)
    }
   }
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    }
  };

  let returnRender = (
    <div>

      <div className='carouselInnerDiv'>
        <button className='outfitButton' onClick={handleClick}>+</button>
        <p className="outfitRelated">Add to Outfit</p>
      </div>

      <Carousel responsive={responsive}>{outfitRenderList}</Carousel>
    </div>
  )

  return returnRender
}

export default OutfitProducts;
