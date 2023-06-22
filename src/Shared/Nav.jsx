import { useContext } from "react";
import { Link } from "react-router-dom";
import { contexM } from "../Proviuders/ContexProvider";
import useCart from "../Hooks/useCart";

import { FaCartPlus } from "react-icons/fa";
const Nav = () => {
    const [cart] = useCart()

    const { user, HandleSigOut } = useContext(contexM)




    const handleLogut = () => {

        HandleSigOut()
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-5 px-1">

                        <Link to="/">Home</Link>

                        <Link className="flex btn btn-secondary items-center" to="/order"> <FaCartPlus className="mr-2"></FaCartPlus> + {
                            cart?.length || 0
                        }</Link>

                        {
                            user ? <img className="rounded-full h-40" src={user.photoURL} alt="" />
                                : ""
                        }



                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user ?
                            <button onClick={handleLogut}>Logout</button>
                            :
                            <Link to="/login">Login</Link>

                    }







                </div>
            </div>
        </div>
    );
};

export default Nav;