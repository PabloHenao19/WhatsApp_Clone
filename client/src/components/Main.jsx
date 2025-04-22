import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Main() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin, router]);

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

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      <Empty />
    </div>
  );
}

export default Main;

