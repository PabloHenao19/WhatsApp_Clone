import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";

function Onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!newUser && (!userInfo || !userInfo.email)) {
      router.push("/login");
    } else if (!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      if (!userInfo || !userInfo.email) {
        setErrorMessage("Error: No se encontró el email del usuario.");
        return;
      }
      const email = userInfo.email;
      setLoading(true);
      setErrorMessage("");
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { 
              id: data.user.id,
              name, 
              email, 
              profileImage: image, status: about },
          });
          router.push("/onboarding");
        } else {
          const {id,name,email,profilePicture:profileImage,status} = data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { 
              id:data.data.id,
              name:data.data.name, 
              email:data.data.email, 
              profileImage: image, status: about },
          });
          router.push("/");
          setErrorMessage("Error al crear el perfil.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      setErrorMessage("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    if (about.length > 100) {
      setErrorMessage("La descripción no puede exceder 100 caracteres.");
      return false;
    }
    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              type="button"
              aria-label="Create profile"
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={onboardUserHandler}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

