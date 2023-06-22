import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Order from "../Pages/Order";
import PrivateRoute from "../Private/PrivateRoute";
import Cart from "../Components/Cart";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: '/cart',
                    element: <Cart></Cart>
                },

                {
                    path: '/login',
                    element: <Login></Login>
                },
                {
                    path: '/register',
                    element: <Register></Register>
                },
                {
                    path: '/order',
                    element: <PrivateRoute> <Order></Order></PrivateRoute>
                },

            ]
        }
    ]
)


export default router