import externalApi from "./jceInstance";

// Función para validar cédula
export const validateCedulaRequest = (id) => {
  return externalApi.get(`/cedulas/${id}/validate`);
};
