import { useQuery } from "@tanstack/react-query";
const GetDeliveryReqHook = () => {
    const adminToken = localStorage.getItem("adminToken");
    // here is the refatch method and data:cart
    
    const { refetch, data: allDelivery = [] } = useQuery({

        queryKey: ['allDelivery', "ddm"],

        queryFn: async () => {

            const res = await fetch(`https://api.ecom-bd.com/api/v1/admin/allDeliveries`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`
                },
            });
            return res.json();
        },
    });
    return [allDelivery, refetch] // return the values 
};
export default GetDeliveryReqHook;