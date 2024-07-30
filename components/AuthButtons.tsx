"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
// import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <div className="grid  justify-items-center m-auto w-full cursor-pointer">
    <div className="max-w mx-auto card bg-[#1b2528] mt-4 mb-10 hover:bg-[#fbbf24] text-[#fbbf24] hover:text-[#1b2528]"
    onClick={handleClick}>
        <div className="card-body flex flex-col items-center justify-center">
        <h1 className="card-title m-auto  text-bold text-base md:text-base ">
            Continue with Google
          </h1>
        <Image src={googleLogo} alt="Google Logo" width={40} height={40} className="justify-items-center" />
          </div>
          </div>
        </div>
          

  );
}

