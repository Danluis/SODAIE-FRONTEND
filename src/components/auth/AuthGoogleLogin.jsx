import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useAuthStore } from '../../store/authStore';
import { googleLoginRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthGoogleLogin() {
    const clientID = import.meta.env.VITE_GOOGLE_AUTH_CLIEND_ID
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
            const response = await googleLoginRequest({
                email: user.email
            });

            console.log('User registered:', response.data);

            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setIsAuthenticated(true);
            setIsRegister(true);

            // Redirigir según el rol del usuario
            if (response.data.roles === 'admin') {
                navigate('/AdminPage');
            } else if (response.data.roles === 'composer') {
                navigate('/Composer');
            } else {
                navigate('/');
            }
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
        if (googleUser.email && googleUser.googleId) {
            sendUserDataToBackend(googleUser);
        }
    }, [googleUser]);

    return (
        <>
            <GoogleLogin
                clientId={clientID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                prompt="select_account" // Forzar selección de cuenta
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
        </>
    );
}
