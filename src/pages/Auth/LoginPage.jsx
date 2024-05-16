import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function LoginPage() {

    const {register,handleSubmit, formState: {errors}} = useForm()

    const {signin, errors: signinErrors} = useAuth()

    const onSubmit = handleSubmit((data) => {
        signin(data);
    })

    return (
        <div className="flex h-screen items-center justify-center bg-zinc-900">
            
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                
            {
                signinErrors.map((error, i) => {
                    return (
                        <div key={i} className="bg-red-500 p-2 text-white text-center">
                            {error}
                        </div>
                    );
                })
            }

                <h1 className="text-2xl font-bold text-white">Login</h1>

                <form onSubmit={onSubmit}>

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
                    <button type="submit" className="text-white my-2">
                        Login
                    </button>
                </form>

                <p className="flex gap-x-2 justify-between text-white">
                    Dont have an account yet? <Link to={'/register'} className="text-sky-500">Sign up</Link>
                </p>
            </div>
            
        </div>
    )
}