import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Definir la URL base de tu backend
const BASE_URL = "http://localhost:3000";

// Crear una instancia de Axios con la URL base
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Tiempo de espera de 5 segundos
  headers: {
    "Content-Type": "application/json",
    // Puedes agregar otros encabezados aquí si es necesario
  },
});

// Interceptar y manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error de respuesta:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error("Error de solicitud:", error.request);
      return Promise.reject(
        "Error de solicitud: No se recibió respuesta del servidor"
      );
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      console.error("Error:", error.message);
      return Promise.reject("Error: " + error.message);
    }
  }
);

// Exportar la instancia de Axios para su uso en otros archivos
export default axiosInstance;
