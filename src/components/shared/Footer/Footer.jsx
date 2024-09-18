import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "../../../../public/assets/logo.svg"
const Footer = () => {
    return (
        <footer className="footer  container mx-auto bg-base-200 text-base-content p-10">
        <aside>
        <Link href={"/"}>
        <Image width={100} height={100} alt="logo" src={logo}/>
        </Link>
          <p>
            SIZZADHOSEN@
            <br />
          Software Developer
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href={'/service'} className="link link-hover">Services</Link>
          <Link href={'/'} className="link link-hover">Home</Link>
       
       
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href={'/about'} className="link link-hover">About us</Link>
          <Link href={'/contact'} className="link link-hover">Contact</Link>
       
       
      
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href={'/blog'} className="link link-hover">Blog</Link>
          <a className="link link-hover">Privacy policy</a>
       
        </nav>
      </footer>
    );
};

export default Footer;