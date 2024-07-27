import React, { useState, useEffect, useRef } from 'react'; 

const HeroCard = (props) => {
    // const { head } = props;
    return(
        <>
        <div className='bg-[#E0D9CF] rounded-xl'>
            <div className='p-4 text-center'>
                <div className='w-1/2 text-center mx-auto'>
                    <img src="https://t3.ftcdn.net/jpg/08/46/32/26/360_F_846322638_UtlPhyLgKNlbaMWoNHTG80F6ndYSyoeF.jpg" alt='hero-yoga-img' className='object-cover rounded-xl'/>
                </div>
                <div className='pt-6'>
                    <h2 className='font-bold text-xl'>Discover Your Inner Peace</h2>
                    <p>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
                </div>
            </div>
        </div>
        </>
    );
};
export default HeroCard;