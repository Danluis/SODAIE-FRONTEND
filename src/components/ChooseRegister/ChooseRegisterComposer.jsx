import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { updateCredentialRequest } from '../../api/auth.js'; 

export default function ChooseRegisterComposer({ img, NameUser, title, subTitle }) {
    const [redirect, setRedirect] = useState(false);

    const handleRoleUpdate = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const updatedUser = {
                ...user,
                roles: 'composer'
            };

            try {
                await updateCredentialRequest(user.credentials_id, updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setRedirect(true);
            } catch (error) {
                console.error('Error actualizando el rol del usuario:', error.response ? error.response.data : error.message);
            }
        } else {
            console.error('No se encontró el usuario en el localStorage');
        }
    };

    if (redirect) {
        return <Navigate to="/FormGeneralInfo" />;
    }

    return (
        <div className="flex flex-col">
            <br />
            <br />
            <span className="text-2xl mb-4">Acceder como {NameUser}</span>
            <Link
                to="#"
                onClick={handleRoleUpdate}
                className="flex bg-white gap-3 items-center w-[36vw] rounded-xl h-32 cursor-pointer transition-transform transform hover:scale-105"
            >
                <img src={`${img}`} className="object-cover w-1/3 h-full" />
                <div className="flex flex-col text-sm gap-2">
                    <span className="text-xl text-cyan-700 font-semibold ">{title}</span>
                    <span className="text-semiWhite">{subTitle}</span>
                    <span className="text-black font-bold">Acceder como {NameUser}</span>
                </div>
            </Link>
        </div>
    );
}
