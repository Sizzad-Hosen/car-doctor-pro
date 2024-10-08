"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import Swal from 'sweetalert2';
import SocialLogin from '@/components/shared/SocialLogin';
import Image from 'next/image';
import Link from 'next/link';
import login from "../../../public/assets/images/login/login.svg";


const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorData.message || 'Something went wrong!',
        });
        return;
      }

      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: "Signup Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      from.reset(); // Clear the form fields after successful signup

    } catch (err) {
      console.error('Error submitting form:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <section>
      <div className="hero mx-auto text-gray-800 bg-slate-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center mr-10 lg:text-left">
            <h1 className="text-5xl mb-10 font-bold">Signup now!</h1>
            <Image width={400} height={500} alt="image" src={login} />
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
            <p className='p-2 text-center'>Already have an account? <Link className='text-blue-600' href={"/login"}>Login</Link></p>
            <div className="divider">OR</div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
