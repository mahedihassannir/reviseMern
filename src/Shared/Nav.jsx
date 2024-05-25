import { useContext } from "react";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

import { FaCartPlus } from "react-icons/fa";
import { contexM } from "../Proviuders/ContexProvider";
import { useState } from "react";
const Nav = () => {

    const handleLogut = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("dId");
        alert("log out")
    }

    const admin = localStorage.getItem("adminToken");
    const deliveryMan = localStorage.getItem("dId");

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

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-5 px-1">

                        <div className="mr-10">
                            {admin || deliveryMan ? (
                                <Link onClick={handleLogut}>Logout</Link>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}

                        </div>

                        <Link to="/">Home</Link>

                        <Link to="/users">Users</Link>
                        <Link to="/sellers">Sellers</Link>
                        <Link to="/seller_profile">Profiles</Link>
                        <Link to="/All_delivery">All delivery</Link>
                        <Link to="/with_draw_req">Withdraw Req</Link>
                        <Link to="/review">review</Link>
                        <Link to="/wish_list">wish_list</Link>
                        <Link to="/all_products">all_products</Link>
                        <Link to="/reports">reports</Link>
                        <Link to="/user_helpline">user_helpline</Link>
                        <Link to="/seller_helpline">seller_helpline</Link>
                        <Link to="/create_delivery_man">seller_register</Link>
                        <Link to="/user_register">user_register</Link>

                        {
                            <img className="rounded-full h-40" src={""} alt="" />

                        }



                    </ul>
                </div>
                <div className="navbar-end">
                    {admin || deliveryMan ? (
                        <Link onClick={handleLogut}>Logout</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Nav;