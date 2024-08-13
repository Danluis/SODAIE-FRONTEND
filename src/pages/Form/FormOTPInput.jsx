import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
const FormOTPInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const [token, setToken] = useState('');
  const {forgottenPasswordResponse} = useAuthStore(state => state);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Extract token from query parameters
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [location.search]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value) && value !== '') return; // Solo permitir números

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Foco en el siguiente campo de entrada
    if (value !== '' && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Manejar retroceso
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 4).split('');
    const newOtp = [...otp];
    pasteData.forEach((num, index) => {
      if (/^[0-9]$/.test(num)) {
        newOtp[index] = num;
      }
    });
    setOtp(newOtp);
    inputsRef.current[newOtp.length - 1].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP entered:', otp.join(''));
    console.log('Expected reset code:', forgottenPasswordResponse);
    if (otp.join('') === forgottenPasswordResponse.resetCode) {
      navigate('/FormRestorePassword');
    } else {
      alert('El código no coincide');
    }
  };
  

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
      <Header />
      <div className="flex">
        <Navbar />
        <div className="w-full h-full">
          <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
            <div className="mt-10 flex items-center justify-center mb-48">
              <div className="flex items-center flex-col">
                <span className="text-4xl mb-8">Verificación de Código</span>
                <form onSubmit={handleSubmit} className="w-full flex items-center flex-col">
                  <div className="flex gap-4 mb-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => (inputsRef.current[index] = el)}
                        className="w-12 h-12 text-center text-2xl border rounded-lg bg-semiBlack border-blue-600 text-white"
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-[28rem] p-3 font-semibold bg-cyan-700 rounded-lg mt-4 transition-transform transform hover:scale-105"
                  >
                    Enviar Código
                  </button>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormOTPInput;
