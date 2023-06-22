
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contexM } from "../Proviuders/ContexProvider";
import { useState } from "react";
import Swal from "sweetalert2";



const Register = () => {


    // err section 
    const [err, Seterr] = useState(null)
    // ends

    const navigate = useNavigate()

    // constex from contex

    const { createuser } = useContext(contexM)

    const handleLogin = (e) => {
        e.preventDefault()
        const from = e.target

        const name = from.name.value
        const PhotoUrl = from.PhotoUrl.value
        const email = from.email.value
        const password = from.password.value

        const infos = { name, email, password, PhotoUrl }

        createuser(email, password)
            .then(res => {
                const user = res.user
                console.log(user);
                // navigate if user registered successfully 
                navigate('/')
                // alert 
                if (user.email) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                console.log(err);
                Seterr(err.massage)
            })



    }


    return (
        <div>
            <div>

                <h1 className="text-3xl text-center font-bold text-blue-600">Hey bro you are in register page</h1>

                <div className="hero min-h-screen ">
                    <div className="hero-content  w-1/2 flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">name</span>
                                    </label>
                                    <input name="name" type="text" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">PhotoUrl</span>
                                    </label>
                                    <input name="PhotoUrl" type="url" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name="email" type="text" placeholder="email" className="input input-bordered" />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="password" className="input input-bordered" />


                                </div>
                                <Link to="/login">
                                    <p className="link">
                                        bro have an account
                                    </p>
                                </Link>

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;