import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import ItemCard from './ItemCard.jsx'
import 'react-multi-carousel/lib/styles.css'

const RelatedProducts = (props) => {

    const [relatedCardList, setRelatedCardList] = useState([]);
    const [readyToRender, setReadyToRender] = useState(false);
    
    useEffect(() => {

        axios({
            url: `/sqlapi/related/${props.productId}`,
            method: 'get'
        })
        .then((res) => { return(res.data.map(a => a.RelatedID)) })
        .then((relatedProducts) => {

            relatedProducts.map((item) => {

                axios({
                    url: `/sqlapi/products/${item}`,
                    method: 'get'
                })
                .then((itemCard) => {

                    // itemData is the merge of 3 tables: Products, Styles and Photos
                    let itemData = itemCard.data;

                    if (itemData.length != 0) {

                        // array of all StyleID's
                        let styleArray = itemData.map((a) => a.StyleID)
                        
                        // For all related products, we pick 1 style and 1 photo at random
                        let randomStyleId = Math.floor(Math.random() * (styleArray.length + 1));
                        var imageUrl = null;

                        if (itemData[randomStyleId]) {

                            imageUrl = itemData[randomStyleId].ThumbnailURL

                            setRelatedCardList((relatedCardList) => [...relatedCardList, (
                                
                                <ItemCard
                                    itemImage={imageUrl}
                                    itemCategory={itemData[randomStyleId].Category}
                                    itemName={itemData[randomStyleId].Name}
                                    itemPrice={'$' + itemData[randomStyleId].DefaultPrice}
                                    itemProductId={item}
                                />
                            )])
                        } else if (itemData[0]) {

                            imageUrl = itemData[0].ThumbnailURL

                            setRelatedCardList((relatedCardList) => [...relatedCardList, (
                                
                                <ItemCard
                                    itemImage={imageUrl}
                                    itemCategory={itemData[0].Category}
                                    itemName={itemData[0].Name}
                                    itemPrice={'$' + itemData[0].DefaultPrice}
                                    itemProductId={item}
                                />
                            )])
                        } else {
                            setRelatedCardList((relatedCardList) => [...relatedCardList, (
                                
                                <ItemCard
                                    itemImage={null}
                                    itemCategory={null}
                                    itemName={null}
                                    itemPrice={'$0'}
                                    itemProductId={item}
                                />
                            )])
                        }
                    }
                })
            })
        })
        .then(() => setReadyToRender(true))

        // axios({url: `api/products/${props.productId}/related`, method: 'get'})
        // .then((res) => { return(res.data) })
        // .then((relatedProducts) => {
        // axios({url: `api/products/${item}`, method: 'get'})
        // .then((itemProducts) => {
        //     axios({url: `api/products/${item}/styles`, method: 'get'})
        //     .then((itemStyles) => {
  }, [])

  // This responsive variable was added from the react-multi-carousel docs (https://www.npmjs.com/package/react-multi-carousel)
  // The important option here is the items (number of cards shown at one time)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      paritialVisibilityGutter: 60
    }
  };

  let returnRender = readyToRender ? ( <Carousel responsive={responsive}>{relatedCardList}</Carousel> ) : (<div>Loading...</div>)
  
  return returnRender
}

export default RelatedProducts;
