import React from "react";
import ReactDOM from "react-dom";

/**
 * Componente que renderiza un input file de forma oculta
 * mediante un portal, útil para activar desde cualquier parte del DOM.
 */
function PhotoPicker({ onChange }) {
  const element = document.getElementById("photo-picker-element");

  if (!element) {
    console.warn("Elemento con id 'photo-picker-element' no encontrado.");
    return null;
  }

  return ReactDOM.createPortal(
    <input
      type="file"
      hidden
      id="photo-picker"
      accept="image/*"
      onChange={onChange}
    />,
    element
  );
}

export default PhotoPicker;
