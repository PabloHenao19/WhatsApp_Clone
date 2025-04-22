import React, { useEffect, useState } from "react"; // Importa hooks necesarios
import Image from "next/image"; // Componente optimizado de imagen de Next.js
import { FaCamera } from "react-icons/fa"; // Icono de cámara
import ContextMenu from "./ContextMenu"; // Menú contextual personalizado
import PhotoPicker from "./PhotoPicker"; // Input de archivo oculto
import PhotoLibrary from "./PhotoLibrary"; // Selector visual de fotos
import CapturePhoto from "./CapturePhoto"; // Componente para tomar fotos con la cámara

function Avatar({ type, image, setImage }) {
  // Controla si se está haciendo hover sobre el avatar
  const [hover, setHover] = useState(false); 
  // Controla la visibilidad del menú contextual
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false); 
  // Guarda coordenadas para posicionar el menú contextual
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  }); 

  // Controla si se debe disparar el input de carga de archivo
  const [grabPhoto, setGrabPhoto] = useState(false); 
  // Controla visibilidad de la librería de fotos
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  // Controla visibilidad de la cámara
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  // Función para mostrar el menú contextual y guardar su posición
  const showContextMenu = (e) => {
    e.preventDefault(); // Previene el menú nativo del navegador
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  // Efecto que activa el input de foto cuando grabPhoto es true
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click(); // Simula un clic para abrir el explorador de archivos

      // Espera a que el usuario regrese al navegador para desactivar grabPhoto
      document.body.onfocus = () => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  // Opciones del menú contextual
  const ContextMenuOptions = [
    { name: "Take Photo", callback: () => setShowCapturePhoto(true) },
    { name: "Chose From Library", callback: () => setShowPhotoLibrary(true) },
    { name: "Upload Photo", callback: () => setGrabPhoto(true) },
    { name: "Remove Photo", callback: () => setImage("/default_avatar.png") },
  ];

  // Maneja el cambio de archivo desde el input oculto
  const PhotoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");

    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };

    reader.readAsDataURL(file); // Convierte el archivo en base64

    // Espera un poco y luego actualiza la imagen de perfil
    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Renderiza diferentes tamaños de avatar */}
      {type === "sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
        </div>
      )}
      {type === "lg" && (
        <div className="relative h-14 w-14">
          <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
        </div>
      )}
      {type === "xl" && (
        <div
          className="relative cursor-pointer z-0"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={showContextMenu}
        >
          {/* Overlay visible solo cuando hay hover */}
          <div
            className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 
            ${hover ? "visible" : "hidden"}`}
            onClick={(e) => showContextMenu(e)}
            id="context-oponer"
          >
            <FaCamera
              className="text-2xl"
              onClick={(e) => showContextMenu(e)}
              id="context-oponer"
            />
            <span>Change <br />Profile <br /> Photo</span>
          </div>
          {/* Imagen del avatar */}
          <div className="flex items-center justify-center h-60 w-60">
            <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
          </div>
        </div>
      )}

      {/* Renderiza el menú contextual si está activo */}
      {isContextMenuVisible && (
        <ContextMenu
          options={ContextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}

      {/* Renderiza la cámara para tomar foto */}
      {showCapturePhoto && (
        <CapturePhoto
          setImage={setImage}
          hide={setShowCapturePhoto}
        />
      )}

      {/* Renderiza la librería de fotos */}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}

      {/* Input oculto para cargar archivo */}
      {grabPhoto && <PhotoPicker onChange={PhotoPickerChange} />}
    </div>
  );
}

export default Avatar;




