import { useContext } from "react";
import { contexM } from "../Proviuders/ContexProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(contexM)


    const location = useLocation()

    if (loading) {
        return <h1>.....mahedi</h1>
    }



    if (user) {
        return children
    }


    return <Navigate state={{ from: location }} replace to='/login'></Navigate>


};

export default PrivateRoute;