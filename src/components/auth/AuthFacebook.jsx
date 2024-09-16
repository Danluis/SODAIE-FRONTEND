import { useEffect } from "react";
import FacebookLogin from 'react-facebook-login';
import { useAuthStore } from '../../store/authStore';
import { facebookLoginRequest, registerRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthFacebook() {

    const clientID = import.meta.env.VITE_FACEBOOK_AUTH_CLIEND_ID;
    const { facebookUser, setFacebookUser } = useAuthStore(state => ({
        facebookUser: state.facebookUser,
        setFacebookUser: state.setFacebookUser
    }));
    const { setIsAuthenticated, setIsRegister, setUser, setErrors } = useAuth();
    const navigate = useNavigate();

    const responseFacebook = (response) => {
        if (response.email && response.userID) {
            setFacebookUser({
                email: response.email,
                userID: response.userID
            });
        } else {
            console.log("Error: No se pudo obtener el email o userID de Facebook");
        }
    };

    const sendUserDataToBackend = async (user) => {
        try {
            // Primero, intentamos loguear al usuario.
            const loginResponse = await facebookLoginRequest({
                email: user.email
            });

            if (loginResponse.data) {
                // Si existe, guardamos el usuario y redirigimos según su rol.
                console.log('User logged in:', loginResponse.data);

                // Guardar en localStorage
                localStorage.setItem('user', JSON.stringify(loginResponse.data));
                setUser(loginResponse.data);
                setIsAuthenticated(true);
                setIsRegister(true);

                // Redirigir según el rol del usuario
                if (loginResponse.data.roles === 'admin') {
                    navigate('/AdminPage');
                } else if (loginResponse.data.roles === 'composer') {
                    navigate('/');
                } else {
                    navigate('/');
                }
            }
        } catch (loginError) {
            console.log('User not found, proceeding to register.');
            
            // Si no existe, intentamos registrar al usuario.
            try {
                const registerResponse = await registerRequest({
                    email: user.email,
                    password: user.userID, // Usando userID como contraseña
                });

                console.log('User registered:', registerResponse.data);

                // Guardar en localStorage
                localStorage.setItem('user', JSON.stringify(registerResponse.data));
                setUser(registerResponse.data);
                setIsAuthenticated(true);
                setIsRegister(true);

                // Redirige a /ChooseRegister después de un registro exitoso
                navigate('/ChooseRegister');
            } catch (registerError) {
                console.error('Error registering user:', registerError.message);
                if (Array.isArray(registerError.response.data)) {
                    setErrors(registerError.response.data);
                } else {
                    setErrors([registerError.response.data.message]);
                }
            }
        }
    };

    useEffect(() => {
        if (facebookUser.email && facebookUser.userID) {
            console.log('facebook user: ', facebookUser);
            sendUserDataToBackend(facebookUser);
            
        }
    }, [facebookUser]);

    return (
        <div>
            <FacebookLogin
                appId={clientID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={sendUserDataToBackend}
                callback={responseFacebook}
                textButton='Continuar con Facebook'
                cssClass="text-white flex text-sm rounded-lg font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack"
                icon={<img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook logo" />}
            />
        </div>
    );
}
