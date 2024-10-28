import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { userAgent } from "next/server";
import React from "react";
import {FcGoogle} from 'react-icons/fc'

function Login() {
  const handleogin = async ()=>{
    const provider = new GoogleAuthProvider ()
    const {
      user:{displayName: name, email, photoURL: profileImage}
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if(email){

      }
    } catch(err){
      console.log(err);
      
    }
  };


  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <img
          src="/whatsapp.gif"
          alt="whatsapp"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleogin}>
        <FcGoogle className="text-4xl"/>
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default Login;

