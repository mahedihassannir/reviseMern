import { useQuery } from "@tanstack/react-query";
const DeliveryManHomeHook = () => {
    // here is the refatch method and data:cart
    const deliveryMan = localStorage.getItem("dId");
    const id = localStorage.getItem("dAId");

    const { refetch, data:Req = [] } = useQuery({

        queryKey: ['allDelivery', "ddm"],

        queryFn: async () => {

            const res = await fetch(`http://localhost:5000/api/v1/admin/delivery/profile?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${deliveryMan}`
                },
            });
            return res.json();
        },
    });
    return [Req, refetch] // return the values 
};
export default DeliveryManHomeHook;