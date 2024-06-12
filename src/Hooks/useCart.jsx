import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { contexM } from "../Proviuders/ContexProvider";

const useCart = () => {

    // first get the user from the contex 

    const { user } = useContext(contexM)

    const token = localStorage.getItem('jwt')
    console.log(token);

    // here is the refatch method and data:cart
    const { refetch, data: cart = [] } = useQuery({

        queryKey: ['Cart', user?.email],

        queryFn: async () => {

            const res = await fetch(` https://api.ecom-bd.com/carts?email=${user?.email}`, {
            headers:{authorization:`bearer ${token}`}
    })

    return res.json();

},
    })


return [cart, refetch] // return the values 

}
export default useCart;