import React, { useRef, useEffect } from "react"; // Importa React y dos hooks: useRef para referenciar elementos del DOM, y useEffect para manejar efectos secundarios.
import { IoClose } from "react-icons/io5"; // Importa el ícono de "cerrar" desde react-icons
import { FaCamera } from "react-icons/fa"; // Importa el ícono de cámara desde react-icons

// Componente funcional que recibe dos props: hide (función para cerrar el componente) y setImage (función para guardar la imagen tomada)
function CapturePhoto({ hide, setImage }) {

  // Crea una referencia al elemento <video> del DOM
  const videoRef = useRef(null);

  // Hook que se ejecuta cuando el componente se monta
  useEffect(() => {
    let stream = null; // Aquí se guardará el stream de la cámara

    // Función asincrónica para iniciar la cámara
    const startCamera = async () => {
      try {
        // Solicita acceso al video (cámara) sin audio
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        // Si el video está referenciado, se le asigna el stream y se reproduce
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        // Si hay error al acceder a la cámara, se muestra en consola y un alert
        console.error("Error al acceder a la cámara:", err);
        alert("No se pudo acceder a la cámara. Asegúrate de dar permisos.");
      }
    };

    // Ejecuta la función para iniciar la cámara
    startCamera();

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => {
      if (stream) {
        // Detiene todos los tracks del stream (cierra la cámara)
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      // Elimina la referencia al stream del video
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []); // Dependencia vacía: solo se ejecuta una vez al montar

  // Función que captura la foto desde el video
  const takePhoto = () => {
    const video = videoRef.current;

    // Crea un elemento <canvas> del mismo tamaño del video
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibuja el contenido actual del video sobre el canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convierte el canvas a una imagen (Data URL en formato PNG)
    const imageDataUrl = canvas.toDataURL("image/png");

    // Guarda la imagen usando la función pasada por props
    setImage(imageDataUrl);

    // Verifica si `hide` es una función antes de llamarla para cerrar
    if (typeof hide === "function") {
      hide(false);
    } else {
      console.error("hide no es una función:", hide);
    }
  };

  // Retorna el JSX del componente
  return (
    // Capa semitransparente que cubre toda la pantalla
    <div className="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
      
      {/* Contenedor principal del contenido */}
      <div className="bg-gray-900 rounded-lg p-4 max-h-[80vh] max-w-[80vw] flex flex-col items-center gap-4">
        
        {/* Botón para cerrar */}
        <div
          className="flex justify-end w-full p-2"
          onClick={() => {
            if (typeof hide === "function") {
              hide(false);
            } else {
              console.error("hide no es una función:", hide);
            }
          }}
          role="button"
          aria-label="Cerrar captura de foto"
        >
          <IoClose className="h-10 w-10 text-white cursor-pointer" />
        </div>

        {/* Muestra el video de la cámara */}
        <div className="flex justify-center">
          <video
            id="video"
            width="400"
            height="300"
            autoPlay
            ref={videoRef} // Conecta el elemento <video> con la referencia
            className="rounded-lg"
          ></video>
        </div>

        {/* Botón circular para tomar la foto */}
        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-300 p-2 flex items-center justify-center"
          onClick={takePhoto}
        >
          <FaCamera className="text-2xl text-gray-900" />
        </button>
      </div>
    </div>
  );
}

// Exporta el componente para usarlo en otros archivos
export default CapturePhoto;

