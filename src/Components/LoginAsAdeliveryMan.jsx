import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { contexM } from "../Proviuders/ContexProvider";
import { useState } from "react";

const LoginAsAdeliveryMan = () => {

    // user from contex
    const { login } = useContext(contexM)

    // err from logout
    const [err, Seterr] = useState("")
    // ends

    console.log({ err }); // TODO

    // login then we user navigate
    const navigate = useNavigate()
    const location = useLocation()
    const where = location.state?.from?.pathname || '/'
    // ends



    const handleLogin = (e) => {
        e.preventDefault()

        const forom = e.target
        const email = forom.email.value
        const password = forom.password.value

        console.log(email, password);
        fetch(`https://api.ecom-bd.com/api/v1/admin/auth/delivery_man/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.code === 200) {
                    localStorage.setItem("dId", data?.data?.access_token);
                    localStorage.setItem("dAId", data?.data?.id);
                    navigate("/")
                }
            });

    };

    return (
        <div>
            <h1 className="text-3xl text-center font-bold text-red-600">Delivery man Login</h1>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
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
                            {/* err */}
                            <div>
                                <p className="text-red-600">{err}</p>
                            </div>

                            <div>
                                <Link to={"/login"} className="underline">
                                    Login as a admin
                                </Link>
                            </div>
                            {/* ends */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default LoginAsAdeliveryMan;