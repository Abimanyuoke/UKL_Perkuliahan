"use client"

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";


// Custom arrow kanan
const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black text-white p-2 rounded-full"
            onClick={onClick}
        >
            <IoIosArrowForward />
        </div>
    );
};
const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black text-white p-2 rounded-full"
            onClick={onClick}>
            <IoIosArrowForward />
        </div>
    );
};


const HomePage = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="w-full relative">
            <Slider {...settings}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className='bg-green-700 w-full  flex items-center justify-center text-white text-xl'>
                        <h3>{num}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomePage;



// // Custom arrow kanan
// const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
//     return (
//         <div
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black text-white p-2 rounded-full"
//             onClick={onClick}
//         >
//             <IoIosArrowForward />
//         </div>
//     );
// };

// // Tidak menampilkan panah kiri
// const PrevArrow = () => null;

// const HomePage = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         speed: 3000,
//         autoplaySpeed: 2000,
//         cssEase: "ease-in-out",
//         nextArrow: <NextArrow onClick={undefined} />,
//         prevArrow: <PrevArrow />
//     };

//     return (
//         <div className="w-3/4 mx-auto relative">
//             <Slider {...settings}>
//                 {[1, 2, 3, 4, 5, 6].map((num) => (
//                     <div key={num} className='bg-green-700 w-full h-[100px] flex items-center justify-center text-white text-xl'>
//                         <h3>{num}</h3>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default HomePage;