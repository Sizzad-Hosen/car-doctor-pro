"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import login from "../../../public/assets/images/login/login.svg";
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';

const SocialLogin = dynamic(() => import('@/components/shared/SocialLogin'), { ssr: false });

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleLogin = async (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: path ? path : "/",
    });

    if (result?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.error,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        router.push(path || '/');
      });
    }
  };
  if (status === 'loading') return null;
  if (status === "authenticated") {
    router.push(path || '/');
  }

  return (
    <section>
      <div className="hero mx-auto text-gray-800 bg-slate-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center mr-10 lg:text-left">
            <h1 className="text-5xl mb-10 font-bold">Login now!</h1>
            <Image width={400} height={500} alt="image" src={login} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
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
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='p-2 text-center'>New here? Please sign up now <Link className='text-blue-600' href={"/signup"}>Signup</Link></p>
            <div className="divider">OR</div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
