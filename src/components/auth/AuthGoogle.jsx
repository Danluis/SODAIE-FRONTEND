import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useAuthStore } from '../../store/authStore';
import { googleLoginRequest, registerRequest, updateUserRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthGoogle() {
    const clientID = import.meta.env.VITE_GOOGLE_AUTH_CLIEND_ID;
    const { googleUser, setGoogleUser } = useAuthStore(state => ({
        googleUser: state.googleUser,
        setGoogleUser: state.setGoogleUser
    }));
    const { setIsAuthenticated, setIsRegister, setUser, setErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientID,
                scope: "profile email"
            }).then(() => {
                console.log("Google API client initialized");
            }).catch(error => {
                console.error("Error initializing Google API client", error);
            });
        };
        gapi.load("client:auth2", initClient);
    }, [clientID]);

    const onSuccess = (response) => {
        setGoogleUser(response.profileObj);
    };

    const onFailure = (response) => {
        console.log("Something went wrong", response);
    };

    const sendUserDataToBackend = async (user) => {
        try {
            // Intentar iniciar sesión con Google
            const loginResponse = await googleLoginRequest({
                email: user.email
            });
    
            // Suponiendo que la API devuelve los datos del usuario si existe
            console.log('User logged in:', loginResponse.data);
            localStorage.setItem('user', JSON.stringify(loginResponse.data));
            setUser(loginResponse.data);
            setIsAuthenticated(true);
            setIsRegister(false);
    
            // Redirigir según el rol del usuario
            if (loginResponse.data.roles === 'admin') {
                navigate('/AdminPage');
            } else if (loginResponse.data.roles === 'composer') {
                navigate('/');
            } else {
                navigate('/');
            }
        } catch (error) {
            // Manejo del error cuando el usuario no existe
            if (error.response?.status === 400) {
                console.log('User not found, redirecting to registration');
                
                try {
                    // Intentar registrar al usuario si no existe
                    const registerResponse = await registerRequest({
                        email: user.email,
                        password: user.googleId // Usando googleId como contraseña
                    });
    
                    console.log('User registered:', registerResponse.data);
                    localStorage.setItem('user', JSON.stringify(registerResponse.data));
                    setUser(registerResponse.data);
                    setIsAuthenticated(true);
                    setIsRegister(true);

                    // Actualizar la imagen de usuario después de registrarlo
                    const updateResponse = await updateUserRequest(registerResponse.data.credentials_id, {
                        userImageUrl: user.imageUrl  // Actualiza la imagen con la URL de la imagen de Google
                    });

                    console.log('User image updated:', updateResponse.data);
    
                    // Redirigir a la página de registro /ChooseRegister
                    navigate('/ChooseRegister');
                } catch (registerError) {
                    console.error('Error during registration:', registerError.message);
                    setErrors([registerError.response?.data?.message || 'An error occurred during registration']);
                }
            } else {
                // Otros errores posibles
                console.error('Error during login:', error.message);
                setErrors([error.response?.data?.message || 'An error occurred']);
            }
        }
    };
    

    useEffect(() => {
        if (googleUser.email && googleUser.googleId) {
            console.log("Google User:", googleUser);  // Aquí el console.log que pediste
            sendUserDataToBackend(googleUser);
        }
    }, [googleUser]);

    return (
        <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            prompt="select_account"
            render={renderProps => (
                <button
                    className="flex text-sm rounded-lg font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                    Continuar con Google
                </button>
            )}
        />
    );
}
