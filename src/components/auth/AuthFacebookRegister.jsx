import { useEffect } from "react";
import FacebookLogin from 'react-facebook-login';
import { useAuthStore } from '../../store/authStore';
import { registerRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthFacebookRegister() {

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
    }

    const sendUserDataToBackend = async (user) => {
        try {
            const response = await registerRequest({
                email: user.email,
                password: user.userID, // Usando userID como contraseña
            });

            console.log('User registered:', response.data);

            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setIsAuthenticated(true);
            setIsRegister(true);

            navigate('/ChooseRegister'); // Redirige a /ChooseRegister después de un registro exitoso
        } catch (error) {
            console.error('Error registering user:', error.message);
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    };

    useEffect(() => {
        if (facebookUser.email && facebookUser.userID) {
            sendUserDataToBackend(facebookUser);
        }
    }, [facebookUser]);

    return (
        <div>
            <FacebookLogin
                appId={clientID}
                autoLoad={true}
                fields="name,email,picture"
                onClick={sendUserDataToBackend}
                callback={responseFacebook}
                textButton='Registrarse con Facebook'
                cssClass="text-white flex text-sm rounded-lg font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack"
                icon={<img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook logo" />}
            />
        </div>
    );
}
