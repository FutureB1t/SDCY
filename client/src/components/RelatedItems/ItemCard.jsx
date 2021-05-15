import React, { useState, useEffect } from 'react';
import Stars from '../shared/Stars.jsx';
import axios from 'axios';

const ItemCard = (props) => {

    const [productRating, setProductRating] = useState(0);
    const [readyToRender, setReadyToRender] = useState(true);

    useEffect(() => {

        axios({ url: `/sqlapi/ratings/${props.itemProductId}`, method: 'get'})
        .then((res) => {
            
            setProductRating(res.data[0].rating)

            // let ratingData = res.data.results;

            // if (ratingData.length !== 0) {

            //     let ratingList = [];
            //     ratingData.map((item) => ratingList.push(item.rating))

            //     // Mean (average) of the given ratings
            //     setProductRating(ratingList.reduce((a, b) => a + b) / ratingList.length)
            // }
        })
        .then(() => setReadyToRender(true))

    }, [props.itemProductId])

    let returnRender = readyToRender ? (

        <div className="carouselInnerDiv">
            <img className="relatedProductsImage" src={props.itemImage}></img>
            <p className="relatedProductText">{props.itemCategory}<br/><br/>
            <b>{props.itemName}</b><br/>
            {props.itemPrice}<br/><br/>

            <Stars rating={productRating} clickable={false}/>
          </p>
        </div>
    ) : (<div>Loading...</div>)
  
    return returnRender
}

export default ItemCard;
