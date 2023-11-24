import React from 'react'
import loginIMG from '../../assets/login.png'
import bgfrom from '../../assets/bg.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
// import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    // const [disabled, setDisabled] = useState(true)
    const { signIn, googleSignIn } = useAuth()
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"


    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Login Successfully",
                    showClass: {
                        popup: ` animate__animated animate__fadeInUp animate__faster `
                    },
                    hideClass: {
                        popup: ` animate__animated animate__fadeOutDown animate__faster `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    title: "Good job!",
                    text: "Signed In Successful",
                    icon: "success"
                });
                navigate("/");
            })
            .catch(error => {
                console.log(error.message);
            })
        // {
        //     const userInfo = {
        //         email: result.user?.email,
        //         name: result.user?.displayName
        // }

        // }
        // axiosPublic.post('/users', userInfo)
        //     .then(res => {
        //         if (res.data.insertedId) {
        //             console.log('user added to the database', res.data);
        //             Swal.fire({
        //                 title: "Good job!",
        //                 text: "User Profile Successfully Updated",
        //                 icon: "success"
        //             });
        //         }
        //         navigate('/');
        //     })
        //     .catch(err => console.log(err.message))
    }


    return (
        <div>
            <div className="hero min-h-[900px] mt-12 w-full bg-base-200 object-cover" style={{ backgroundImage: `url(${bgfrom})` }}>
                <div className="bg-opacity-0"></div>
                <div className="hero-content flex-col lg:flex-row lg:gap-24 justify-around border-2 lg:h-[650px] w-[1400px] px-16 shadow-2xl">
                    <div className="text-center lg:text-left">
                        <img src={loginIMG} alt="" className='mr-44 w-full' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md px-8 py-5">
                        <form onSubmit={handleLogin} className="w-full max-w-md">
                            {/* <img className="w-auto h-7 sm:h-8" src={logo} alt="" /> */}

                            <h1 className="mt-3 lg:text-4xl font-bold text-gray-100 capitalize text-3xl text-center">Login</h1>

                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                            </div>

                            <div className="mt-6">
                                <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-400 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50">
                                    Sign in
                                </button>
                                <p className="mt-4 text-center text-gray-200">or sign in with</p>

                                <a href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50">
                                    <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>

                                    <span onClick={() => handleGoogleSignIn()} className="mx-2 text-gray-200 hover:text-gray-700">Sign in with Google</span>
                                </a>

                                <div className="mt-6 text-center ">
                                    <Link to="/signup" className="text-sm text-blue-100 hover:underline">
                                        Don’t have an account yet? Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login