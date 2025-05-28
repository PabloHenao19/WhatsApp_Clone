import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Importar axios
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  // ✅ Estado local para guardar los contactos
  const [allContacts, setAllContacts] = useState({}); // Inicializa como objeto vacío


  // ✅ Hook del contexto global, retorna [state, dispatch]
  const [state, dispatch] = useStateProvider();

  // ✅ useEffect se ejecuta una vez al montar el componente
 useEffect(() => {
  const getContacts = async () => {
    try {
      const { data: { users } } = await axios.get(GET_ALL_CONTACTS);
      setAllContacts(users);


      const grouped = user.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
      }, {});
      
      setAllContacts(grouped);
    } catch (err) {
      console.log("Error fetching contacts:", err);
    }
  };

  getContacts();
}, []);



  return (
    <div className="h-full flex flex-col">
      {/* ✅ Encabezado con botón para volver */}
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
          <span>New Chat</span>
        </div>
      </div>
      
      <div className="bg-search-input-container-background h-full flex- auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
      {/* ✅ Barra de búsqueda */}
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        </div>
        <div className="w-full">
          <input
            type="text" // ✅ Corrección del tipo
            placeholder="Search Contacts"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
          />
        </div>
      </div>
      </div>
     {
  Object.entries(allContacts).length > 0 ? (
    Object.entries(allContacts).map(([initialLetter, userList]) => {
      return (
        <div key={Date.now() + initialLetter}>
          <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
          {userList.map(contact => {
            return (
              <ChatLIstItem
                data={contact}
                isContactPage={true}
                key={contact.id}
              />
            );
          })}
        </div>
      );
    })
  ) : (
    <div>No contacts available</div> // Mensaje si no hay contactos
  )
}


      </div>
    </div>
  );
}

export default ContactsList;

