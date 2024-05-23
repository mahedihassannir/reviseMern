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
                const response = await fetch(`http://localhost:5000/api/v1/admin/all_seller_profiles`, {
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
                {/* order table head  */}
                <thead>
                    <tr className='uppercase   py-5 text-blue-600'>
                        <th className='w-[50%] '>Seller</th>
                        <th className='w-[15%] '>Requested Date</th>
                        <th className='w-[15%]'>Distict</th>
                        <th className='w-[15%]'>Status</th>
                        <th className='w-[5%]'>Action</th>
                    </tr>
                </thead>

                {/* order tabel body  */}
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
                                            Data Foundry
                                        </p>
                                        <div className='text-gray-500 mt-2'>
                                            <p className=''>{data.mobile_number}</p>
                                            <p className=''>{data.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex-1 h-[140px] '>
                                        <div className='h-full w-full bg-white animate-pulse p-3 flex items-center justify-center rounded'>
                                            <TbMapSearch className='text-6xl font-thin' />
                                        </div>
                                        {/* <iframe
                                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.770376577181!2d90.31164257414545!3d24.003884378999956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755dd7615555555%3A0x67030a6233412e0b!2sKashimpur%20Central%20Jail!5e0!3m2!1sen!2sbd!4v1692862296372!5m2!1sen!2sbd'
                                    width='100%'
                                    height='140'
                                    // style='border:0;'
                                    allowfullscreen=''
                                    loading='lazy'
                                    referrerpolicy='no-referrer-when-downgrade'
                                ></iframe> */}
                                    </div>
                                </div>
                            </td>

                            {/* REQUESTED DATE  */}
                            <td className=' w-[15%] flex items-start'>
                                <p>February 26, 2021</p>
                            </td>

                            {/* DISTICT  */}
                            <td className=' w-[15%] flex items-start'>
                                <p>{data.store_address}</p>
                            </td>

                            {/* STATUS */}
                            <td className=' w-[15%] flex items-start'>
                                <p>{data.profileStatus}</p>
                            </td>

                            {/* action  */}
                            <td className=' w-[5%] flex items-start  '>
                                <div
                                    onClick={() => setModalIsOpen(!modalIsOpen)}
                                    className='p-[6px] hover:bg-[#F5F5F5] rounded flex items-center justify-center text-sm cursor-pointer mx-auto relative'
                                >
                                    <PiDotsThreeVerticalBold />

                                    <div
                                        className={`  bg-white absolute top-[100%] text-[11px] right-0 overflow-hidden duration-300 shadow-md ${modalIsOpen
                                            ? "max-h-[500px]"
                                            : "max-h-[0px]"
                                            }`}
                                    >
                                        <ul className='w-[100px] '>
                                            <li className='py-1 px-3 hover:bg-gray-200 text-green-600'>
                                                Accept
                                            </li>
                                            <li className='py-1 px-3 hover:bg-gray-200 text-lime-600'>
                                                Progress
                                            </li>
                                            <li className='py-1 px-3 hover:bg-gray-200 text-red-600'>
                                                Delete
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>)
                }
            </table>
        </div>
    );
};

export default AllSellerProfille;