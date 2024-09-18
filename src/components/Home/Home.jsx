import About from "./About";
import Carosel from "./Carosel";
import Services from "./Services";
import { Metadata } from 'next';

export const metadata = {
    title: 'Car Doctor | Home',
    description: 'Car Doctor app - Home page',
  };
const Home = () => {
    return (
        <div className="bg-slate-100 mx-auto container">
            <Carosel />
            <About />
            <Services />
        </div>
    );
};

export default Home;
