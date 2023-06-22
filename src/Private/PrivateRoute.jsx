import { useContext } from "react";
import { contexM } from "../Proviuders/ContexProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {


    // user from auth contex
    const { user, loader } = useContext(contexM)

    const location = useLocation()


    // loader 
    if (!loader) {
        return <div>
            <p>......Mahedi</p>
        </div>
    }
    // ends


    // if user in this website so no private 
    if (user) {
        children
    }

    // not != user then return to the login page
    return <Navigate state={{ from: location }} to={'/login'} replace={true}></Navigate>





};

export default PrivateRoute;