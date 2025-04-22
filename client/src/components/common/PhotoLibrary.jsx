import React from "react";
import { IoClose } from "react-icons/io5";

function PhotoLibrary({ setImage, hidePhotoLibrary }) {
  // Lista de avatares predefinidos
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  // Función para manejar el clic en una imagen
  const handleSelectImage = (img) => {
    setImage(img);
    hidePhotoLibrary(false);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 rounded-lg p-4 max-h-[80vh] max-w-[80vw] overflow-auto">
        {/* Botón para cerrar la galería */}
        <div className="flex justify-end p-2">
          <IoClose
            className="h-10 w-10 text-white cursor-pointer"
            onClick={() => hidePhotoLibrary(false)}
            role="button"
            aria-label="Cerrar galería"
          />
        </div>

        {/* Galería de imágenes */}
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Avatar ${index + 1}`}
              className="h-24 w-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleSelectImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;

