import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { contexM } from "../Proviuders/ContexProvider";
import { useState } from "react";

const Login = () => {

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

        console.log({ email }, { password });

        // the firebase login system
        login(email, password)
            .then(res => {
                const user = res.user
                console.log({ user });
                navigate(where)
            })
            .catch(err => {
                console.log(err);
                Seterr(err.message)
            })




    }

    return (
        <div>
            <h1 className="text-3xl text-center font-bold text-red-600">Hey bro you are in Login page</h1>
            <div className="hero min-h-screen ">
                <div className="hero-content  w-1/2 flex-col lg:flex-row-reverse">
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
                            {/* captcha */}
                            <div>



                                <input name="validate" type="text" placeholder="validate" className="input input-bordered" />
                            </div>

                            {/* <div>
                                <button onClick={handlePopup} className="btn btn-primary">google</button>
                            </div> */}


                            <Link to="/register">
                                <p className="link">
                                    new to this website please register
                                </p>
                            </Link>
                            {/* err */}
                            <div>
                                <p className="text-red-600">{err}</p>

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

export default Login;