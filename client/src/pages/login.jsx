/*import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser, router]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const {
        user: { displayName: name, email, photoURL: profileImage },
      } = await signInWithPopup(firebaseAuth, provider);

      const { data } = await axios.post(CHECK_USER_ROUTE, { email });

      const userData = { name, email, profileImage, status: "" };

      if (!data.status) {
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
        dispatch({ type: reducerCases.SET_USER_INFO, userInfo: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("newUser", "true");
        router.push("/onboarding");
      } else {
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: data.user || userData,
        });
        localStorage.setItem("userInfo", JSON.stringify(data.user || userData));
        localStorage.setItem("newUser", "false");
        router.push("/");
      }
    } catch (err) {
      console.error("Error durante el login:", err);
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
        disabled={loading}
        aria-label="Iniciar sesión con Google"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">
          {loading ? "Logging in..." : "Login with Google"}
        </span>
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Login;*/
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Si ya está logueado y no es nuevo, lo deja en la raíz
  useEffect(() => {
    if (userInfo?.id && !newUser && router.pathname === "/login") {
      router.push("/");
    }
  }, [userInfo, newUser, router]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const {
        user: { displayName: name, email, photoURL: profileImage },
      } = await signInWithPopup(firebaseAuth, provider);

      const { data } = await axios.post(CHECK_USER_ROUTE, { email });

      const userData = { name, email, profileImage, status: "" };

      if (!data.status) {
        // Usuario nuevo
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
        dispatch({ type: reducerCases.SET_USER_INFO, userInfo: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("newUser", "true");

        // 🔒 NO redirige automáticamente a onboarding
        // Puedes hacerlo tú desde otro componente si es necesario

        if (router.pathname !== "/") {
          router.push("/"); // o simplemente quédate en la raíz
        }
      } else {
        // Usuario existente
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: data.user || userData,
        });
        localStorage.setItem("userInfo", JSON.stringify(data.user || userData));
        localStorage.setItem("newUser", "false");

        router.push("/");
      }
    } catch (err) {
      console.error("Error durante el login:", err);
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
        disabled={loading}
        aria-label="Iniciar sesión con Google"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">
          {loading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
        </span>
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Login;




