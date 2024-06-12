import React, { useEffect } from 'react';
import { BsChatRightDotsFill } from 'react-icons/bs';
import { HiAcademicCap, HiArchiveBoxXMark, HiChartBar, HiHome, HiMiniAdjustmentsHorizontal, HiMiniCalculator, HiMiniUsers, HiOutlineFolder, HiUsers } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TbMapSearch } from "react-icons/tb";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { FiRefreshCcw } from 'react-icons/fi';


const Users = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home")
    const authToken = localStorage.getItem("userToken");
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/all_users`, {
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
                setUsers(data);
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

    console.log(users);
    return (
        <div className='text-[#0A1727]'>
            <div>
                {/* title and data refres  */}
                <div className='bg-white p-2 md:p-3 rounded flex items-center justify-between '>
                    <h3 className='text-2xl font-bold'>total: {users?.result?.length} users</h3>

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
                            {/* order table head  */}
                            <thead>
                                <tr className='uppercase   py-5 text-blue-600'>
                                    <th className='w-[8%] '>#Order</th>
                                    <th className='w-[20%] '>refer by</th>
                                    <th className='w-[20%]'>refer details</th>
                                    <th className='w-[20%]'>order History</th>
                                    <th className='w-[20%]'>Order Status</th>
                                    <th className='w-[12%]'>User Details</th>
                                </tr>
                            </thead>

                            {/* order tabel body  */}
                            {
                                users?.result?.map(res => <tbody key={res._id} className='font-bold'>
                                    <tr className=' '>
                                        {/* id col  */}
                                        <td className='text-blue-600 w-[4%] '>
                                            <span>no</span>
                                            
                                        </td>
                                        

                                        {/* product and product image  */}
                                        <td className=' w-[20%]'>
                                            <div className='flex items-center'>
                                                <div>
                                                    <img className='w-10 h-10'
                                                        src={res.profileImage}
                                                        alt=''
                                                    />
                                                </div>
                                                <div>
                                                    <span>{res?.referredBy}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* category  */}
                                        <td className=' w-[20%]'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-[25px] h-[25px] bg-[#035ECF] rounded'></div>
                                                <span>{res?.referrals?.length}</span>
                                                <span>Balance: {res?.balance}</span>

                                            </div>
                                        </td>

                                        {/* payment */}
                                        <td className=' w-[20%] flex-col items-start'>
                                            <p className=''>
                                                <span>{res?.orderHistory?.length}</span>

                                            </p>
                                            <small>
                                                <p className='text-gray-500'>Order History</p>
                                            </small>
                                        </td>

                                        {/* order status  */}
                                        <td className=' w-[60px]'>
                                            <div className='uppercase py-1 px-3 bg-[#035ECF] text-white rounded-md'>
                                                {res.accountStatus}
                                            </div>
                                        </td>
                                        {/* rating  */}
                                        <td className=' w-[12%]'>
                                            name: {res.name}
                                            <br />
                                            email: {res.email}
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

export default Users;
