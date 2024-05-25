import { useEffect, useState } from "react";
import { FiRefreshCcw } from 'react-icons/fi';

const WithDrawRejected = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home");
    const authToken = localStorage.getItem("userToken");
    const [withdrawl, setWithDraw] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { modalIsOpen, setModalIsOpen } = useState();
    console.log(modalIsOpen)


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/v1/admin/withdrawal_req?status=Rejected`, {
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
                setWithDraw(data);
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

    console.log(withdrawl);

    return (
        <div>

            <div className='text-[#0A1727]'>
                <div>
                    {/* title and data refres  */}
                    <div className='bg-white p-2 md:p-3 rounded flex items-center justify-between '>
                        <h3 className='text-2xl font-bold'>total: {withdrawl?.result?.length} WithDrawal Req</h3>

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
                                    withdrawl?.result?.map(res => <tbody key={res._id} className='font-bold'>
                                        <tr className=' '>
                                            {/* id col  */}



                                            {/* product and product image  */}
                                            <td className=' w-[20%]'>
                                                <div className=''>
                                                    <div className='text-lg text-red-500'>
                                                        amount: {res.withdrawalAmount} <span className='text-green-500'>Taka</span>
                                                    </div>
                                                    <br />
                                                    <div className='text-md '>
                                                        <span>{res?.withdrawalDate}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* category  */}
                                            <td className=' w-[20%]'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='p-2 bg-[#035ECF] rounded text-white'>
                                                        status :
                                                    </div>
                                                    <span >{res?.withdrawalStatus}</span>


                                                </div>
                                            </td>

                                            {/* payment */}
                                            <td className=' w-[20%] flex-col items-start'>

                                                <p className='text-gray-500'>
                                                    <span className='text-red-500'>paymentMethod</span>:<br />    {res.paymentMethod}
                                                </p>

                                            </td>
                                            <td className=' w-[20%] flex-col items-start'>

                                                <p className='text-gray-500'>
                                                    <span className='text-red-500'>Account Number</span>
                                                    <br />
                                                    {res.bankAccountNumber}
                                                </p>

                                            </td>
                                            <td className=' w-[20%] flex-col items-start'>

                                                <p className='text-gray-500'>
                                                    <span className='text-red-500'>Mobile Number</span>
                                                    <br />
                                                    {res.mobileNumber}
                                                </p>

                                            </td>

                                            {/* order status  */}
                                            <td className=' w-[60px]'>
                                                <div className='uppercase py-1 px-3 bg-[#035ECF] text-white rounded-md'>
                                                    {res.ref}
                                                </div>
                                            </td>
                                            {/* rating  */}
                                            <td className=' w-[12%]'>
                                                sellerId: {res.sellerId}
                                                <br />
                                                {/* email: {res.email} */}
                                            </td>
                                        </tr>
                                    </tbody>)
                                }
                            </table>
                        </div>
                    </div>


                </div>
            </div >

        </div>
    );
};

export default WithDrawRejected;