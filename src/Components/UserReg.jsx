import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserReg = () => {
    const [response, setResponse] = useState();
    // for navigation 
    const navigate = useNavigate();
    // for navigation ends

    const handleReg = (e) => {
        // for no reloade 
        e.preventDefault();
        // for no reloade ends 

        // from iput values
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // temp image
        const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8kVrRKvn48kDPt79Je7wZIuT6nUSr3l5DQ&usqp=CAU"
        // from iput values ends


        console.log({ name, email, password });
        fetch(`https://api.ecom-bd.com/api/v1/auth/user/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setResponse(data)
                if (data.code === 201) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'register Successfully',
                        showConfirmButton: false,
                        timer: 5000
                    });
                    navigate("/");

                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-4 h-auto md:h-[80vh] flex justify-center items-center" >

            <div className="w-11/12 shadow-md py-10 px-2   ">
                <h3 className="text-black pb-4 md:pb-4  md:text-3xl font-semibold ">Register page</h3>

                <h3 className="text-black pb-4 md:pb-10 text-1xl md:text-3xl font-semibold ">Welcome To E-com</h3>




                {/* handle reg  */}
                <form onSubmit={handleReg} className="md:flex   ">

                    {/* this is from div */}
                    <div className="md:w-1/2">
                        <label htmlFor="">
                            <span>আপনার নাম দিন</span>
                        </label>
                        <br />

                        <input name="name" className=" my-2 w-full md:w-3/4 py-3 border-[2px] pl-2 border-gray-400" type="text" placeholder="Please enter your Name" />

                        {/* email */}
                        <br />
                        <label htmlFor="">
                            <span>আপনার ইমেইল দিন</span>
                        </label>
                        <br />

                        <p className="text-red-500 text-sm">{response?.email}</p>
                        <input name="email" className=" my-2 w-full md:w-3/4 py-3 border-[2px] pl-2 border-gray-400" type="email" placeholder="Please enter your Email" />

                        {/* email */}
                        <br />
                        <label className="" htmlFor="">
                            <span>আপনার password দিন </span>
                        </label>
                        <br />

                        <p className="text-red-500 text-sm">{response?.password}</p>
                        <input name="password" className=" my-2 w-full md:w-3/4 py-3 border-[2px] pl-2 border-gray-400" type="password" placeholder="Please enter your Password" />


                        {/* email */}


                    </div>

                    {/* this is btn and other div */}
                    <div className="md:w-1/2   mt-2 md:mt-0">

                        {/* this is redirect to login page */}
                        <div className="">

                            <h3 className="flex gap-1 font-semibold">

                                Have a account ?

                                <span className="text-blue-700 ">
                                    <Link to="/login">
                                        login

                                    </Link>
                                </span>

                                <span>here</span>


                            </h3>
                        </div>

                        {/* this is redirect to login page ends */}




                        {/* login btn  */}
                        <div className="mt-4 text-center md:text-left">

                            <button className=" w-11/12 md:w-3/5 mx-auto bg-orange-600 py-5 rounded-sm text-white font-semibold  ">
                                Register
                            </button>
                        </div>
                        {/* login btn  ends */}




                        <samp className="flex pl-3 my-2 ">
                            Or, login with
                        </samp>

                        <div className="mt-4 text-center md:text-left">

                            <button className="  w-11/12 md:w-3/5 mx-auto bg-blue-600 py-3 rounded-sm text-white font-semibold  ">
                                <span className="flex justify-center items-center">
                                    <span><FaFacebook className="text-3xl text-white mr-4"></FaFacebook></span> <span>Fackbook</span>

                                </span>
                            </button>

                        </div>
                        {/* fackbook login ends */}

                        {/* Google login starts */}
                        <div className="mt-4 text-center md:text-left">

                            {/* <button onClick={handleGoogleLogin} className="  w-11/12 md:w-3/5 mx-auto bg-red-600 py-3 rounded-sm text-white font-semibold  ">
                                <span className="flex justify-center items-center">
                                    <span><FaGoogle className="text-3xl text-white mr-4"></FaGoogle></span> <span>Google</span>

                                </span>
                            </button> */}

                        </div>
                        {/* google  login ends */}


                    </div>

                </form>
                {/* handle reg ends  */}

            </div>




        </ div >
    );
};

export default UserReg;