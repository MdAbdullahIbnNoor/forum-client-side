import React from 'react'
import loginIMG from '../../assets/signup.png';
import bgForm from '../../assets/bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { BsPersonVideo2 } from "react-icons/bs";
import { MdAddPhotoAlternate } from "react-icons/md";
import Swal from 'sweetalert2'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';



const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, googleSignIn, updateUserProfile } = useAuth();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    // const onSubmit = (data) => console.log(data)
    // console.log(watch("name"))

    const onSubmit = (data) => {

        console.log(data.email, data.password);

        createUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                updateUserProfile(data.name, data.photoURL)
                    .then((result) => {
                        // create user entry in the data base
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            role: 'user',
                            badge: 'Bronze',
                            postCount: 0
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database', res.data);
                                    reset();
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "User Profile Successfully Updated",
                                        icon: "success"
                                    });
                                    navigate("/");
                                }
                            })

                    })
                    .catch(err => console.log(err))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleGoogleSignUp = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user',
                    badge: 'Bronze',
                    postCount: 0
                };

                // Posting user info to /users endpoint
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // Check if the user was successfully added to the database
                        if (res.data.insertedId) {
                            console.log('User added to the database', res.data);

                            Swal.fire({
                                title: 'Good job!',
                                text: 'User Profile Successfully Updated',
                                icon: 'success'
                            });

                            // Redirect to the home page
                            navigate('/');
                        } else {
                            console.error('Error adding user to the database');
                        }
                    })
                    .catch(error => {
                        console.error('Error posting user info:', error);
                    });
            })
            .catch(error => {
                console.error('Error signing in with Google:', error);
            });
    }

    return (
        <div>
            <div className="hero min-h-[800px] bg-base-200 my-24 object-cover" style={{ backgroundImage: `url(${bgForm})` }}>
                <div className="bg-opacity-0"></div>
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-24 justify-around border-2 lg:h-[650px] w-[1400px] px-16 shadow-2xl">
                    <div className="text-center lg:text-left">
                        <img src={loginIMG} alt="" className='mr-44 w-10/12' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md px-8 py-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                            {/* <img className="w-auto h-7 sm:h-8" src={logo} alt="" /> */}

                            <h1 className="mt-3 lg:text-4xl font-bold text-sky-400 capitalize text-3xl text-center">Sign Up</h1>

                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <BsPersonVideo2 className="w-5 h-5 mx-3 text-gray-300" />
                                </span>

                                <input type="text" {...register("name", { required: true })} name='name' className="static block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Type Name" />

                            </div>
                            {errors.name && <span className='text-red-600'>This field is required</span>}

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <MdAddPhotoAlternate className="w-5 h-5 mx-3 text-gray-300" />
                                </span>

                                <input type="text" {...register("photoURL", { required: true })} name='photoURL' className="static block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Paste url here" />

                            </div>
                            {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" {...register("email", { required: true })} name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />

                            </div>
                            {errors.email && <span className='text-red-600'>This field is required</span>}

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type="password" {...register("password",
                                    {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                                    }
                                )} name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />

                            </div>
                            {errors.password?.type === 'required' && <span className='text-red-600 block'>This password must be atleast 6 charachter</span>}
                            {(errors.password?.type === 'minLength' || errors.password?.type === 'maxLength') && <span className='text-red-600 block'>This password must be atleast 6 charachter and not more than 20</span>}
                            {errors.password?.type === 'pattern' && <span className='text-red-600 block'>This password must be valid</span>}


                            <div className="mt-6">
                                <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-200 focus:ring-opacity-50">
                                    Sign in
                                </button>
                                <p className="mt-4 text-center text-gray-600">or sign up with</p>

                                <a href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-sky-500 hover:text-gray-100">
                                    <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>

                                    <span onClick={() => handleGoogleSignUp()} className="mx-2">Sign up with Google</span>
                                </a>

                                <div className="mt-6 text-center">
                                    <Link to="/login" className=" text-blue-500 hover:underline">
                                        Have an account? Login
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

export default SignUp