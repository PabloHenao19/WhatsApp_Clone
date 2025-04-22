// Ruta base de la API
export const HOST = process.env.API_HOST || "http://localhost:3005";

// Ruta base para autenticación
const AUTH_ROUTE = `${HOST}/api/auth`;

// Ruta para verificar un usuario
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;

// Ruta para registrar un usuario
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
