import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
export default function RegisterPage() {

    const {register, handleSubmit, formState:{
        errors
    }} = useForm()

    const {signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() =>{
        if(isAuthenticated) navigate('/')
    },[isAuthenticated])
    
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => {
                    return (
                        <div key={i} className="bg-red-500 p-2 text-white">
                            {error}
                        </div>
                    );
                })
            }
            <form onSubmit={handleSubmit(async (values) => {
                signup(values)
            }
            )}>
                <input type="text" 
                {...register('username', { required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="username"
                />
                {errors.username && 
                (<p className="text-red-500">Username is required</p>
                )}

                <input type="email" 
                {...register('email', { required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="email"
                />
                {errors.email && 
                (<p className="text-red-500">Email is required</p>
                )}
                <input type="password" 
                {...register('password', { required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="password"
                />
                {errors.password && 
                (<p className="text-red-500">Password is required</p>
                )}
                <button type="submit" className="text-white">
                    Register
                </button>
            </form>

            <p className="flex gap-x-2 justify-between text-white">
                    Already have an account? {" "}<Link to={'/login'} className="text-sky-500">Login</Link>
            </p>
        </div>
    )
}