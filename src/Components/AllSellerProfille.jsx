import React, { useEffect, useState } from 'react';
import { TbMapSearch } from "react-icons/tb";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const AllSellerProfille = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home")
    const authToken = localStorage.getItem("userToken");
    const [sellers, setSellers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { modalIsOpen, setModalIsOpen } = useState();
    console.log(modalIsOpen)


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/all_seller_profiles`, {
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
                setSellers(data);
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

    console.log(sellers);
    return (
        <div className='min-w-[900px] m-10'>
            <table className='text-[11px]  w-full'>
                {
                    sellers?.result?.data?.map(data => <tbody key={data.identityId} className='font-bold'>
                        <tr className=''>
                            {/* Seller info name map image  */}
                            <td className=' w-[50%] '>
                                <div className='flex items-start   gap-3 w-full pr-5'>
                                    {/* seller image  */}
                                    <div className='w-[100px] h-32  p-2 border border-blue-600'>
                                        <img className='h-32 w-full'
                                            src={data.store_photo}
                                            alt=''
                                        />
                                    </div>

                                    <div>
                                        <p className='text-base leading-3'>
                                            {data.name}
                                        </p>
                                        <div className='text-gray-500 mt-2'>
                                            <p className=''>{data.mobile_number}</p>
                                            <p className=''>{data.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex-1 h-[140px] '>
                                        <div className='h-full w-full bg-white animate-pulse p-3 flex items-center justify-center rounded'>
                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            <img className='w-32 h-32' src={data.idCards.nidBack} alt="" />
                                            <img className='w-32 h-32' src={data.idCards.nidFront} alt="" />

                                        </div>

                                    </div>

                                    <div>
                                        <td className=' w-[15%] flex items-start'>
                                            <p>{data.updatedAt}</p>
                                        </td>

                                        {/* DISTICT  */}
                                        <td className=' w-[15%] flex items-start'>
                                            <p>{data.store_address}</p>
                                        </td>

                                        {/* STATUS */}
                                        <td className=' w-[15%] flex items-start'>
                                            <p>{data.profileStatus}</p>
                                        </td>

                                    </div>

                                    <div className='text-lg border-2'>
                                        <div>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            <div className='text-md'>
                                                reviews: <span>{data?.reviews?.length}</span>
                                            </div>
                                            <br />
                                            <div className='text-md'>
                                                returns: <span>{data?.returns?.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            profile status <br /><span>{data.profileStatus}</span>
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            Balance: <br />{data.sellerBalance} BDT
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            Categories: <br /> {data.categories[0]}
                                        </div>
                                    </div>
                                    <div className='text-lg border-2'>
                                        <div className=''>

                                            {/* <TbMapSearch className='text-6xl font-thin' /> */}
                                            CreatedAt: <br /> {data.createdAt}
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

export default AllSellerProfille;