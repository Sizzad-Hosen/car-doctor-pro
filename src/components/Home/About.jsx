import Head from 'next/head';
import parts from "../../../public/assets/images/about_us/parts.jpg";
import person from "../../../public/assets/images/about_us/person.jpg";
import Image from "next/image";

export const metadata = {
  title: "About", // This will result in "About | Car Doctor"
  description: "Car Doctor app - About page",
};


const About = () => {
    return (
      <>
      
        <div id="about" className="hero min-h-screen bg-gray-50 text-gray-900">
          <div className="hero-content flex-col lg:flex-row">
            <div className="lg:w-1/2 relative">
              <Image alt="image" src={person} className="max-w-sm lw-3/4 rounded-lg shadow-2xl" />
              <Image alt="image" src={parts} className="w-1/2 absolute right-5 top-1/2 border-8 border-white max-w-sm rounded-xl shadow-2xl" />
            </div>
            <div className="lg:w-1/2 p-4 space-y-5">
              <h3 className="text-3xl text-orange-500 font-bold">About Us</h3>
              <h1 className="py-6 text-5xl font-bold">We are qualified & experienced in this field</h1>
              <p className="py-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nostrum quos aperiam, neque earum minima delectus!</p>
              <button className="btn btn-warning">Get More Info</button>
            </div>
          </div>
        </div>
      </>
    );
};

export default About;
