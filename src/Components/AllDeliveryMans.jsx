import { useEffect, useState } from "react";

const AllDeliveryMans = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home")
    const authToken = localStorage.getItem("userToken");
    const [deliveryMans, setDeliveryMans] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { modalIsOpen, setModalIsOpen } = useState();
    console.log(modalIsOpen)


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/all_delivery_mans`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to all users');
                }
                const data = await response.json();
                setDeliveryMans(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (adminToken) {
            fetchProducts();
        }

    }, [adminToken]);

    console.log(deliveryMans);
    return (
        <div className='min-w-[900px] m-10'>
            <table className='text-[11px]  w-full'>
                {
                    deliveryMans?.result?.map(data => <tbody key={data._id} className='font-bold'>
                        <tr className=''>
                            {/* Seller info name map image  */}
                            <td className=' w-[50%] '>
                                <div className='flex items-start   gap-3 w-full pr-5'>
                                    {/* seller image  */}
                                    <div className='w-[140px] h-32  p-2 border border-blue-600'>
                                        <img className='w-full h-32'
                                            src={data?.imageUrl}
                                            alt=''
                                        />
                                    </div>

                                    <div>
                                        <p className='text-base leading-3'>
                                            {data.name}
                                        </p>
                                        <div className='text-gray-500 mt-2'>
                                            {/* <p className=''>{data.mobile_number}</p> */}
                                            <p className=''>{data.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex-1 h-[140px] '>
                                        <div className='h-full w-full bg-white animate-pulse p-3 flex items-center justify-center rounded'>
                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            <img className='w-32 h-32' src={data?.imageUrl} alt="" />
                                            {/* <img className='w-32 h-32' src={data.idCards.nidFront} alt="" /> */}

                                        </div>

                                    </div>

                                    <div>
                                        <td className='text-lg border-2  flex items-start'>
                                            <p className="pr-2">monthlyIncome:</p>
                                            <br />
                                            <p className="text-red-400">{data.monthlyIncome
                                            }</p>
                                        </td>

                                        {/* DISTICT  */}


                                    </div>
                                    <div>

                                        {/* STATUS */}
                                        <td className='text-lg border-2 w flex items-start'>
                                            <p>person id :</p>
                                            <br />
                                            <p className="text-red-400"> {data._id}</p>
                                        </td>
                                    </div>

                                    <div className='text-lg border-2'>
                                        <div>
                                            <span>Mother Name :</span>
                                            <br />
                                            <span className="text-red-400">{data.motherName}</span>
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>
                                            <span>Father Name :</span>
                                            <br />
                                            <span className="text-red-400">{data.fatherName}</span>

                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>
                                            <span>Total Delivery :</span>
                                            <br />
                                            <span className="text-red-400">{data?.totalDelivery?.length}</span>

                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            {/* Categories: <br /> {data.categories[0]} */}
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div className=''>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            {/* CreatedAt: <br /> {data.createdAt} */}
                                        </div>
                                    </div>

                                </div>
                            </td>

                            {/* REQUESTED DATE  */}


                            {/* action  */}


                        </tr>

                    </tbody>)
                }
            </table>
        </div>
    );
};

export default AllDeliveryMans;