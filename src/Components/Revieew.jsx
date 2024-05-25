import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

const Revieew = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home");
    const authToken = localStorage.getItem("userToken");
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/v1/admin/review`, {
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
                setReview(data);
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

    console.log(review?.result);
    return (
        <div className='text-[#0A1727]'>
            <div>
                {/* title and data refres  */}
                <div className='bg-white p-2 md:p-3 rounded flex items-center justify-between '>
                    <h3 className='text-2xl font-bold'>total: {review?.result?.length} reviews</h3>

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
                                review?.result?.map(res => <tbody key={res._id} className=' border-2   font-bold'>
                                    <tr className=' '>
                                        {/* product and product image  */}
                                        <td className=' w-[20%]'>
                                            <div className=''>
                                                <div className='text-lg text-red-500'>
                                                    comment: {res.comment}
                                                </div>
                                                <br />
                                                <div className='text-md '>
                                                    <span>{res?.date}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* category  */}
                                        <td className=' w-[20%]'>
                                            <div className='flex items-center gap-4'>
                                                <div className='p-2 bg-[#035ECF] rounded text-white'>
                                                    user : {res?.user}
                                                </div>
                                                <span>rating</span>
                                                <br />
                                                <span >{res?.rating}</span>


                                            </div>
                                        </td>

                                        {/* payment */}
                                        <td className=' w-[20%] flex-col items-start'>

                                            <p className='text-gray-500'>
                                                <span className='text-red-500'>createAt</span>:<br />    {res.createdAt}
                                            </p>

                                        </td>
                                        <td className=' w-[20%] flex-col items-start'>

                                            <p className='text-gray-500'>
                                                <span className='text-red-500'>UpdatedAt</span>
                                                <br />
                                                {res?.updatedAt}
                                            </p>

                                        </td>
                                        <td className=' w-[20%] flex-col items-start'>

                                            <p className='text-gray-500'>
                                                <span className='text-red-500'>Mobile Number</span>
                                                <br />
                                                {res?.seller}
                                            </p>

                                        </td>

                                        {/* order status  */}
                                        <td className=' w-[60px]'>
                                            <div className='uppercase py-1 px-3 bg-[#035ECF] text-white rounded-md'>
                                                productId: <br />
                                                {res?.product[0]}
                                                {res?.product[1]}
                                                {res?.product[2]}
                                            </div>
                                        </td>
                                        {/* rating  */}
                                        <td className=' w-[12%]'>
                                            {/* sellerId: {res.sellerId}
                                        <br /> */}
                                            {/* email: {res.email} */}
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

export default Revieew;