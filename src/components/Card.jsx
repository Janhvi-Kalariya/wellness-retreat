import React, { useState, useEffect, useRef } from 'react'; 

const Card = (props) => {
    const { img, title, description, date, location, price } = props;
    function formatDate(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        // const hours = String(date.getHours()).padStart(2, '0');
        // const minutes = String(date.getMinutes()).padStart(2, '0');
        // const seconds = String(date.getSeconds()).padStart(2, '0');
        // console.log(date,"date")
      
        return `${day}-${month}-${year}`;
      }
    return(
        <>
        <div className='bg-[#E0D9CF] rounded-xl p-4 card'>
            <div className=''>
                <img src={img} alt='retreat-img' className='rounded-xl retreat-card-img'></img>
            </div>
            <div className='text-start pt-5'>
                <h1 className='text-xl font-bold'>{title}</h1>
                <p className='mb-3'>{description}</p>
                <p><span className='font-bold'>Date:&nbsp;</span>{formatDate(date)}</p>
                <p><span className='font-bold'>Location:&nbsp;</span>{location}</p>
                <p><span className='font-bold'>Price:&nbsp;</span>{price}</p>
            </div>
        </div>
        </>
    );
};
export default Card;