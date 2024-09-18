import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
const SocialLogin = () => {

    const searchParams = useSearchParams();
    const path = searchParams.get("redirect");
    
    const handleSocialLogin=async(provider)=>{
 const resp = signIn(provider,
        {
          redirect:true,
           callbackUrl:path? path : '/'
        
        })


    }
    return (
        <div>
            <div className='text-5xl text-center mb-2'>
         
              
          
         <button onClick={()=>handleSocialLogin("google")} className="btn bg-slate-500 btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg"> <FcGoogle /></button>
         <button onClick={()=>handleSocialLogin("github")} className="btn bg-slate-500 btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg"> <ImGithub /></button>
      </div>
        </div>
    );
};

export default SocialLogin;