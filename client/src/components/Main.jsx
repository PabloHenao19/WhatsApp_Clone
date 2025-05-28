import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  // Redirigir a la página de login si el usuario no está autenticado
  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin, router]);

  // Verificar el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) return setRedirectLogin(true);

      if (!userInfo && currentUser?.email) {
        try {
          const { data } = await axios.post(CHECK_USER_ROUTE, {
            email: currentUser.email,
          });

          if (!data.status) {
            setRedirectLogin(true);
            return;
          }

          const { id, name, email, profilePicture: profileImage, status } = data.data;

          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
        } catch (error) {
          console.error("Error al verificar usuario:", error);
          setRedirectLogin(true);
        }
      }
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, [dispatch, userInfo]);

  // Obtener los mensajes cuando el usuario está autenticado y tiene un chat activo
  useEffect(() => {
    if (userInfo && currentChatUser) {
      const getMessages = async () => {
        try {
          const { data:{messages} } = await axios.get(
            `${GET_MESSAGE_ROUTE}/${userInfo.id}/${currentChatUser.id}`
          );
          dispatch({type: reducerCases.SET_MESSAGES,messages})

        } catch (error) {
          console.error("Error al obtener mensajes:", error);
        }
      };

      getMessages();
    }
  }, [userInfo, currentChatUser]); // Dependencias para reejecutar el efecto

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {
          currentChatUser ? <Chat /> : <Empty />
        }
      </div>
    </>
  );
}

export default Main;


