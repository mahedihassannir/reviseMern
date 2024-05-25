import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const DeliveryManPrivateRoute = ({ children }) => {
    const location = useLocation();

    const deliveryManToken = localStorage.getItem("dId");

    if (deliveryManToken) {
        return children;
    }

    return <Navigate to="/delivery/login" state={{ from: location }} replace />;
};

export default DeliveryManPrivateRoute;
