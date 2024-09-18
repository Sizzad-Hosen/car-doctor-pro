"use client";
import React from 'react';
import login from "../../../public/assets/images/login/login.svg"
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/components/shared/SocialLogin';

import Swal from 'sweetalert2'


const Signup = () => {
    const handleSignup = async(e) =>{
        e.preventDefault();
        const from = e.target;
        const name = from.name.value;
        const email = from.email.value;
        const password = from.password.value;
        const newUser = {
            name,email,password
        } 
        console.log(newUser);
     
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
      
            console.log("new user created", res);
             if(res)
             {
               Swal.fire({
                 position: "top-mid",
                 icon: "success",
                 title: "Signup Sucessfully",
                 showConfirmButton: false,
                 timer: 1500
               });

             }

      
          } catch (err) {
            console.error('Error submitting form:', err);
          }

    }
    return (
      <section>
         
        <div className="hero mx-auto text-gray-800 bg-slate-200 min-h-screen">
            
        <div className="hero-content  flex-col lg:flex-row">
          <div className="text-center mr-10 lg:text-left">
         
          <h1 className="text-5xl mb-10 font-bold">Signup now!</h1>
            <Image width={400} height={500} alt="image" src={login}/>

          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
         
            <form onSubmit={handleSignup} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" name='name' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign up</button>
              </div>
            </form>
            <p className=' p-2 text-center'>Already, have an account ? <Link className='text-blue-600' href={"/login"}>Login</Link></p>
            <div className="divider">OR</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
      </section>
    );
};

export default Signup;