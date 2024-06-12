import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const WithdrawReq = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home");
    const authToken = localStorage.getItem("userToken");
    const [withdrawl, setWithDraw] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { modalIsOpen, setModalIsOpen } = useState();
    console.log(modalIsOpen)


    useEffect(() => {
     const fetchWithdrawals = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://api.ecom-bd.com/api/v1/admin/withdrawal_req', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`
                    },
                    params: {
                        status: 'Requested'
                    }
                });

                setWithDraw(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (adminToken) {
            fetchWithdrawals();
        }
    }, [adminToken]);

    console.log(withdrawl);

    const [req, setReq] = useState();
    const handleCompleted = async (id) => {
        console.log(id);

        try {
            const response = await axios.post(
                'https://api.ecom-bd.com/api/v1/admin/withdraw/update_status',
                { id, status: 'Completed' },
                {
                    headers: { Authorization: `Bearer ${adminToken}` }
                }
            );

            const adminWithdrawReq = response.data;
            if (adminWithdrawReq?.code === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Completed Successfully',
                    showConfirmButton: false,
                    timer: 500
                });
            }
            setReq(adminWithdrawReq);
            // Handle success: Optionally refresh the withdrawal data or update UI
            console.log('Withdrawal request completed successfully:', adminWithdrawReq);
        } catch (error) {
            console.error('Error updating withdrawal status:', error);
        }
    };
    console.log(req);
    const handleReject = async (id) => {
        console.log(id);

        try {
            const response = await axios.post(
                'https://api.ecom-bd.com/api/v1/admin/withdraw/update_status',
                { id, status: 'Rejected' },
                {
                    headers: { Authorization: `Bearer ${adminToken}` }
                }
            );
            const adminWithdrawReq = response.data;
            if (adminWithdrawReq?.code === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rejected Successfully',
                    showConfirmButton: false,
                    timer:500
                });
            }
            // Handle success: Optionally refresh the withdrawal data or update UI
            console.log('Withdrawal request rejected successfully:', adminWithdrawReq);
        } catch (error) {
            console.error('Error updating withdrawal status:', error);
        }
    };

    return (
        <div className='text-[#0A1727]'>
            <ToastContainer />
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
                                        <td className='text-green-600 w-[4%] '>
                                            <button onClick={() => handleReject(res._id)} className='py-5 px-6 bg-red-500 rounded-md font-semibold text-white '>
                                                Cancel
                                            </button>

                                        </td>
                                        {/* id col  */}
                                        <td className='text-blue-600 w-[4%] '>
                                            <button onClick={() => handleCompleted(res._id)} className='py-5 px-6 bg-green-500 rounded-md font-semibold text-white '>
                                                Done
                                            </button>

                                        </td>


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
    );
};

export default WithdrawReq;