import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const userRole = localStorage.getItem("userRole");
    const authToken = localStorage.getItem("authToken");

    if (!authToken || !userRole || !allowedRoles.includes(userRole)) {
        console.log("Access denied: Redirecting to login.");
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
