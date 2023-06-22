import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { contexM } from "../Proviuders/ContexProvider";

const useCart = () => {

    // first get the user from the contex 

    const { user } = useContext(contexM)

    // here is the refatch method and data:cart
    const { refetch, data: cart = [] } = useQuery({

        queryKey: ['Cart', user?.email],

        queryFn: async () => {

            const res = await fetch(` http://localhost:5000/carts?email=${user?.email}`)

            return res.json();

        },
    })


    return [cart, refetch] // return the values 

}
export default useCart;