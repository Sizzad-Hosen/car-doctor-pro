import Link from "next/link"
import img1 from "../../../public/assets/images/banner/1.jpg"
import img2 from "../../../public/assets/images/banner/2.jpg"
import img3 from "../../../public/assets/images/banner/3.jpg"
import img4 from "../../../public/assets/images/banner/4.jpg"
import img5 from "../../../public/assets/images/banner/5.jpg"
import img6 from "../../../public/assets/images/banner/6.jpg"

import Image from "next/image"



const Carosel = () => {

    const common = <>
        <div className="absolute rounded-xl flex bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] items-center h-full  top-0 left-0">
          
          <div className="text-white  pl-12 w-1/2  space-y-7">
            <h2 className="text-3xl font-bold" >Affordable Price For Car Servicing </h2>
            <p>There are many variation of passages of available . But the majority have suffered alternation in some from</p>
         <div >
      <Link href={"/"}>   <button className="btn mb-2  btn-success">DISCOVER MORE</button> </Link>
         <button className="btn ms-2 btn-outline btn-error">LATEST PROJECT</button>

         </div>
         
          </div>
          </div>
  

    
    </>
    return (
        <div className="carousel w-full h-[600px]">

        <div id="slide1" className="carousel-item relative  w-full">
          <Image alt="image" src={img1} className="w-full rounded-xl" />
      {common}
         
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a href="#slide6" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide2" className="btn btn-circle bg-orange-600">❯</a>
          </div>
    
        </div> 

   
        <div id="slide2" className="carousel-item relative w-full">
        <Image alt="image" src={img2} className="w-full rounded-xl" />
          {common}
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5">
            <a href="#slide5" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide3" className="btn btn-circle bg-orange-600">❯</a>
          </div>
        </div> 

   
        <div id="slide3" className="carousel-item relative w-full">
        <Image alt="image" src={img3} className="w-full rounded-xl" />
          {common}
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 ">
            <a href="#slide2" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide4" className="btn btn-circle bg-orange-600">❯</a>
          </div>
        </div> 

        <div id="slide4" className="carousel-item relative w-full">
        <Image alt="image" src={img4} className="w-full rounded-xl" />
          {common}
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 ">
            <a href="#slide3" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide5" className="btn btn-circle bg-orange-600">❯</a>
          </div>
        </div>
        <div id="slide5" className="carousel-item relative w-full">
        <Image alt="image" src={img5} className="w-full rounded-xl" />
          {common}
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 ">
            <a href="#slide4" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide6" className="btn btn-circle bg-orange-600">❯</a>
          </div>
        </div>
        <div id="slide6" className="carousel-item relative w-full">
        <Image alt="image" src={img6} className="w-full rounded-xl" />
          {common}
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 ">
            <a href="#slide5" className="btn btn-circle mr-5">❮</a> 
            <a href="#slide1" className="btn btn-circle bg-orange-600">❯</a>
          </div>
        </div>



      </div>
    );
};
export default Carosel;