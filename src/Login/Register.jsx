import { useContext } from "react";
import { contexM } from "../Proviuders/ContexProvider";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {

    const { handleCrate, UpdateUser } = useContext(contexM)

    // const infos = { email: user.email, name: user.displayName, image: user.PhotoUrl }



    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const from = e.target

        const name = from.name.value
        const PhotoUrl = from.PhotoUrl.value
        const email = from.email.value
        const password = from.password.value

        const infos = { name, email, password, PhotoUrl }

        fetch(`http://localhost:5000/userinfos`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(infos)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);


            })



        handleCrate(email, password)
            .then(res => {
                const user = res.user
                console.log(user);
                UpdateUser(name, PhotoUrl)

                navigate('/')
            })
            .catch(err => {
                console.log(err);
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