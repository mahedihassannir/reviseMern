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
import Users from "../Components/Users";
import Sellers from "../Components/Sellers";
import AllSellerProfille from "../Components/AllSellerProfille";
import CreateDeliveryMan from "../Components/CreateDeliveryMan";
import AllDelivery from "../Components/AllDelivery";
import WithdrawReq from "../Components/WithdrawReq";
import Revieew from "../Components/Revieew";
import WishList from "../Components/WishList";
import AllPRoducts from "../Components/AllPRoducts";
import Reports from "../Components/Reports";
import UHelp from "../Components/UHelp";
import SHelp from "../Components/SHelp";
import SellerRegister from "../Components/sellerRegister";
import UserReg from "../Components/UserReg";
import AdminHome from "../Components/AdminHome";
import SellerPersonalDetails from "../Components/SellerPersonalDetails";
import ManageProducts from "../Components/ManageProducts";
import AllDeliveryMans from "../Components/AllDeliveryMans";
import WithDrawRejected from "../Components/WithDrawRejected";
import WithDrawCompleted from "../Components/WithDrawCompleted";
import LoginAsAdeliveryMan from "../Components/LoginAsAdeliveryMan";
import DeliveryManHome from "../Components/deliverySyatemPages/DeliveryManHome";
import DeliveryManPrivateRoute from "../Private/delivaryManRoute";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            children: [
                {
                    path: '/',
                    element:

                        <Home></Home>

                },

                {
                    path: '/home',
                    element:
                        <PrivateRoute>

                            <AdminHome></AdminHome>
                        </PrivateRoute>
                },

                {
                    path: '/login',
                    element: <Login></Login>
                },
                {
                    path: '/users',
                    element:
                        <PrivateRoute>

                            <Users></Users>
                        </PrivateRoute>
                },
                {
                    path: '/sellers',
                    element:
                        <PrivateRoute>

                            <Sellers></Sellers>
                        </PrivateRoute>

                },
                {
                    path: '/seller_profile',
                    element:
                        <PrivateRoute>


                            <AllSellerProfille></AllSellerProfille>
                        </PrivateRoute>
                },
                {
                    path: '/create_delivery_man',
                    element:
                        <PrivateRoute>


                            <CreateDeliveryMan></CreateDeliveryMan>
                        </PrivateRoute>
                },
                {
                    path: '/seller_personal_form',
                    element:
                        <PrivateRoute>


                            <SellerPersonalDetails></SellerPersonalDetails>

                        </PrivateRoute>
                },
                {
                    path: '/All_delivery',
                    element:
                        <PrivateRoute>


                            <AllDelivery></AllDelivery>
                        </PrivateRoute>
                },
                {
                    path: '/with_draw_req',
                    element: <WithdrawReq></WithdrawReq>
                },
                {
                    path: '/review',
                    element: <Revieew></Revieew>
                },
                {
                    path: '/wish_list',
                    element: <WishList></WishList>
                },
                {
                    path: '/all_products',
                    element: <AllPRoducts></AllPRoducts>
                },
                {
                    path: '/reports',
                    element: <Reports></Reports>
                },
                {
                    path: '/user_helpline',
                    element: <UHelp></UHelp>
                },
                {
                    path: '/seller_helpline',
                    element: <SHelp></SHelp>
                },
                {
                    path: '/seller_register',
                    element: <SellerRegister></SellerRegister>
                },
                {
                    path: '/seller_register',
                    element: <SellerRegister></SellerRegister>
                },
                {
                    path: '/user_register',
                    element: <UserReg></UserReg>
                },
                {
                    path: '/manage_products/:id',
                    element: <ManageProducts></ManageProducts>
                },
                {
                    path: '/deliverymans',
                    element: <AllDeliveryMans></AllDeliveryMans>
                },
                {
                    path: '/withdraw_completed',
                    element: <WithDrawCompleted></WithDrawCompleted>
                },
                {
                    path: '/withdraw_rejected',
                    element: <WithDrawRejected></WithDrawRejected>
                },
                {
                    path: '/delivery/login',
                    element: <LoginAsAdeliveryMan></LoginAsAdeliveryMan>
                },
                // all delivery man routes
                {
                    path: '/delivery_man/home',
                    element:
                        <DeliveryManPrivateRoute>
                            <DeliveryManHome></DeliveryManHome>
                        </DeliveryManPrivateRoute>
                },
                {
                    path: '/delivery_man/delivery_req',
                    element:
                        <DeliveryManPrivateRoute>
                            <DeliveryManHome></DeliveryManHome>
                        </DeliveryManPrivateRoute>
                },
                {
                    path: '/delivery_man/home',
                    element:
                        <DeliveryManPrivateRoute>
                            <DeliveryManHome></DeliveryManHome>
                        </DeliveryManPrivateRoute>
                },



            ]
        }
    ]
)


export default router