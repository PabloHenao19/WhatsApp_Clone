// Ruta base de la API
export const HOST = process.env.API_HOST || "http://localhost:3005";

// Ruta base para autenticación
const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGES_ROUTE = `${HOST}/api/messages`;

// Ruta para verificar un usuario
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;

// Ruta para registrar un usuario
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;

// Ruta para enlazar contacto

export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`;

export const GET_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/get-message`;