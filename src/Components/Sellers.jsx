import React, { useEffect, useState } from 'react';
import { TbMapSearch } from "react-icons/tb";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { FiRefreshCcw } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const Sellers = () => {
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
                const response = await fetch(`http://localhost:5000/api/v1/admin/all_sellers    `, {
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
        <div className='text-[#0A1727]'>
            <div>
                {/* title and data refres  */}
                <div className='bg-white p-2 md:p-3 rounded flex items-center justify-between '>
                    <h3 className='text-2xl font-bold'>total: {sellers?.result?.length} sellers</h3>

                    <div className='flex items-center text-[11px] font-bold gap-2 md:gap-3'>
                        <div className='flex items-center gap-1 md:gap-2 cursor-pointer group'>
                            <p>Data Referesh</p>
                            <FiRefreshCcw className='group-hover:text-[#3B82DA] group-hover:animate-spin' />
                        </div>

                        <div className='px-3 md:px-8 border border-[#0a172783] py-1 rounded'>
                            <p>August 22, 2023 01:20 AM</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                {/* orders OrdersDetails */}
                <div className='mt-4  rounded overflow-x-auto '>

                </div>

                {/* Order table  */}
                <div className='mt-4 bg-white rounded px-3 overflow-x-auto'>
                    <div className='min-w-[900px]'>
                        <table className='text-[11px]  w-full'>
                            {
                                sellers?.result?.map(res => <tbody key={res?._id} className='font-bold'>
                                    <tr className=' '>
                                        {/* id col  */}
                                        <td className='text-blue-600 w-[8%] '>
                                            {res?.createdAt}
                                        </td>

                                        {/* product and product image  */}
                                        <td className=' w-[20%]'>
                                            <div className='flex items-center'>
                                                <div>
                                                    <p>{res.email}</p>
                                                    <div className='text-[10px] text-gray-400'>
                                                        <p>{res.sellerProfile}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* category  */}
                                        <td className=' w-[20%]'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-[25px] h-[25px] bg-[#035ECF] rounded'></div>
                                                id:
                                                <p>{res._id}</p>
                                            </div>
                                        </td>

                                        {/* payment */}
                                        <td className=' w-[20%] flex-col items-start'>

                                            identityId: <span>{res?.identityId}</span>

                                        </td>

                                        {/* order status  */}
                                        <td className=' w-[20%]'>
                                            <div className='uppercase py-1 px-3 bg-[#035ECF] text-white rounded-md'>
                                                {res?.name}
                                            </div>
                                        </td>
                                        {/* rating  */}
                                        <td className=' w-[12%]'>
                                            {/* <Rating
                                        readonly
                                        placeholderRating={3.5}
                                        emptySymbol={
                                            <FaStarHalfAlt className='text-yellow-500' />
                                        }
                                        placeholderSymbol={
                                            <FaStar className='text-yellow-500' />
                                        }
                                    /> */}
                                        </td>
                                    </tr>
                                </tbody>)
                            }
                        </table>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Sellers;