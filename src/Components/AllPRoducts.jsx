import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllPRoducts = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home");
    const authToken = localStorage.getItem("userToken");
    const [allproducts, setallproducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/all_added_product`, {
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
                setallproducts(data);
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

    console.log(allproducts);
    return (
        <div>

            <section className='mz-auto flex justify-center'>
                <input className='w-1/2 h-10 mx-auto border-2 rounded-md pl-2' placeholder='Enter Your product id' type="text" />
            </section>

            <section>
                <h1 className='text-red-500 text-lg font-semibold mb-5'> Total Products: {allproducts?.result?.data?.length}</h1>
            </section>
            <section className='grid lg:grid-cols-6 md:grid-cols-2 grid-cols-2'>


                {
                    allproducts?.result?.data?.map(res => <div key={res._id} className="">
                        <div key={allproducts?._id}>
                            <Link to={`/manage_products/${res?._id}`}>
                                <div className=' relative lg:w-64 lg:h-[430px] w-[190px] h-[430px]  bg-white hover:shadow-md hover:border-2 hover:duration-300 cursor-pointer'>
                                    <img className='w-full h-56' src={res?.product_images[0]} alt="bag" />
                                    <div className='p-4 bg-white'>
                                        {/* name */}
                                        <p className='font-bold pb-2'>{res?.product_name?.slice(0, 30)}</p>
                                        {/* name ends */}

                                        {/* price sec */}
                                        <p className='text-[#FC9E66] text-lg font-bold'><span className='font-extrabold'>৳</span>{allproducts?.price}</p>
                                        {/* price sec ends */}

                                        <p><del>Tk900</del> -73%</p>
                                        <div className='flex gap-2'>
                                            <div className='flex justify-center items-center'>
                                                <span className='text-yellow-600'><FaStar></FaStar></span>
                                                <span className='text-yellow-600'><FaStar></FaStar></span>
                                                <span className='text-yellow-600'><FaStar></FaStar></span>
                                                <span className='text-yellow-600'><FaStar></FaStar></span>
                                                <span className='text-yellow-600'><FaStar></FaStar></span>
                                            </div>
                                            <p>({res?.review?.length})</p>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {/* <div className=' hover:shadow-md hover:border-2 hover:border-gray-300 hover:ease-in-out cursor-pointer rounded-lg '>
  <div className='relative'>
    <img className='rounded-t-lg' src={singleProduct.image} alt="" />
    <p className='absolute top-0 rounded-t-lg right-0 bg-orange-500  rounded-l-full text-white font-bold px-1'>-10%</p>
    {singleProduct.sold && <p className='absolute top-0  left-2 bg-orange-100 opacity-100 rounded-full text-orange-500 font-semibold px-1'>0 Sold</p>}
    {
      singleProduct.hot && <p className='absolute bottom-0  left-0 bg-orange-500 text-white font-bold px-1 flex items-center'><FaStar />HOT</p>
    }
  </div>
  <div className='pl-2'>
    <div className='h-14 overflow-hidden'>
      <p className='font-bold my-2 overflow-hidden'>{singleProduct.name}</p>
    </div>
    <p className='font-bold mt-8 text-orange-500'><span className='font-extrabold'>৳</span>{singleProduct.price}</p>
  </div>
  <div className='text-center'>
    <Link to={`/products/${singleProduct._id}`}>
      <button className=" mt-4 bg-orange-500 w-full py-1 rounded  text-white font-extrabold">Shop Now</button>
    </Link>
  </div>
</div> */}
                        </div >
                    </div >)
                }
            </section >
        </div >

    );
};

export default AllPRoducts;