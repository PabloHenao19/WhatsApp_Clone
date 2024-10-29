import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const router = useRouter();
  const [{}, dispatch] = useStateProvider();

  const handleLogin = async () => { 
    const provider = new GoogleAuthProvider();

    try {
      const { user: { displayName: name, email, photoURL: profileImage }} = await signInWithPopup(firebaseAuth, provider);
      console.log("Email:", email); // Verifica que se haya obtenido un email
      
      const { data } = await axios.post(CHECK_USER_ROUTE, { email });
      console.log("API Response Data:", data); // Verifica la respuesta de la API

      if (!data.status) {
        dispatch({
          type: reducerCases.SET_NEW_USER,
          newUser: true
        });

        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            name,
            email,
            profileImage,
            status: "",
          }
        });

        router.push("/onboarding");
      } else {
        console.log("User already exists"); // Indica que el usuario ya existe
      }
    } catch (err) {
      console.error("Error during login:", err); // Captura cualquier error
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default Login;



