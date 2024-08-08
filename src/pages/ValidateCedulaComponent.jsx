// ValidateCedulaComponent.jsx
import { useState } from 'react';
import { validateCedulaRequest } from '../api/jce/jce';

const ValidateCedulaComponent = () => {
  const [dni, setDni] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setDni(e.target.value);
  };

  const handleValidate = async () => {
    try {
      const response = await validateCedulaRequest(dni);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Error al validar la cédula');
      setResult(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Validar Cédula</h2>
      <input
        type="text"
        value={dni}
        onChange={handleInputChange}
        placeholder="Ingrese el DNI"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <button
        onClick={handleValidate}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Validar
      </button>
      {result && (
        <p className="text-green-500">Resultado: {JSON.stringify(result)}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ValidateCedulaComponent;
