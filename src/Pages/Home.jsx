import React, { useEffect } from 'react';
import { BsChatRightDotsFill } from 'react-icons/bs';
import { HiAcademicCap, HiArchiveBoxXMark, HiChartBar, HiHome, HiMiniAdjustmentsHorizontal, HiMiniCalculator, HiMiniUsers, HiOutlineFolder, HiUsers } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGroupArrowsRotate, FaPerson, FaProductHunt } from 'react-icons/fa6';
import { FaRegQuestionCircle } from 'react-icons/fa';

const Home = () => {
    const [activeRoute, setActiveRoute] = useState("Home")
    const isAdmin = true;

    const admin = localStorage.getItem("adminToken");
    const deliveryMan = localStorage.getItem("dId");
    const id = localStorage.getItem("dAId");

    // edns
    const [man, setDeliveryMan] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${deliveryMan}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to all users');
                }
                const data = await response.json();
                setDeliveryMan(data);
            } catch (error) {
                // setError(error.message);

            } finally {
                // setLoading(false);
            }
        };

        if (deliveryMan) {
            fetchProducts();
        }

    }, [deliveryMan]);

    console.log(man);


    return (
        <section>

            {/* admin side bar starts  */}
            {admin ? (
                <div className=' text-black px-5 py-8'>

                    <div className='flex items-center justify-center'>
                        <img
                            className='animate-pulse md:w-[120px] md:h-[120px] rounded-[50%] '
                            src='https://i.ibb.co/YprpF67/435896869-945240464001708-1413687226696707354-n.jpg'
                            alt=''
                        />
                    </div>
                    <div className='text-center'>
                        <h3 className='mt-3 font-semibold text-4xl text-red-500'>Emon</h3>
                        <h4>emon@gmail.com</h4>
                        <Link to='/'>
                            <button className='font-semibold  bg-[#19D895] w-[90%] mt-4  px-12 py-2 rounded-sm'>
                                DELIVERY HEAD
                            </button>
                        </Link>
                    </div>
                    <div className='text-left flex flex-col gap-1 mt-8 mx-3 font-normal'>
                        {/* nav items */}
                        {/* Home */}
                        <Link to={"home"}>
                            <div
                                onClick={() => setActiveRoute("Home")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2 ${activeRoute === "Home"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } cursor-pointer  gap-4`}
                            >
                                <HiHome className='w-4 h-4'></HiHome>
                                <h4> Home</h4>
                            </div>
                        </Link>

                        <Link to={"deliverymans"}>
                            <div
                                onClick={() => setActiveRoute("Investment")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Investment"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } gap-4`}
                            >
                                <FaPerson className='w-4 h-4'></FaPerson>
                                <h4>All Delivery Mans</h4>
                            </div>
                        </Link>
                        <Link to={"All_delivery"}>
                            <div
                                onClick={() => setActiveRoute("Investment")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Investment"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } gap-4`}
                            >
                                <FaProductHunt className='w-4 h-4'></FaProductHunt>
                                <h4>All Delivery</h4>
                            </div>
                        </Link>
                        {/* Transactions */}
                        <Link to={"users"}
                            onClick={() => setActiveRoute("Transactions")}
                            className={`flex hover:bg-[#19D895] duration-700 justify-between relative p-2 ${activeRoute === "Transactions"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } cursor-pointer gap-4`}
                        >
                            <div className='flex items-center gap-4'>
                                <HiChartBar className='w-4 h-4'></HiChartBar>
                                <h4>Users</h4>
                            </div>
                            <div
                                className={`flex hover:bg-[#19D895] duration-700 items-center justify-center py-2 px-3 absolute bg-[#8E6CE5] w-[20px] h-[20px] mt-3 rounded-lg -top-[2px] right-2`}
                            >
                                <small>45</small>
                            </div>
                        </Link>
                        <Link to={"sellers"}
                            onClick={() => setActiveRoute("Sellers")}
                            className={`flex hover:bg-[#19D895] duration-700 justify-between relative p-2 ${activeRoute === "Sellers"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } cursor-pointer gap-4`}
                        >
                            <div className='flex items-center gap-4'>
                                <FaPerson className='w-4 h-4'></FaPerson>
                                <h4>Sellers</h4>
                            </div>
                            <div
                                className={`flex hover:bg-[#19D895] duration-700 items-center justify-center py-2 px-3 absolute bg-[#8E6CE5] w-[20px] h-[20px] mt-3 rounded-lg -top-[2px] right-2`}
                            >
                                <small>45</small>
                            </div>
                        </Link>

                        {/* Orders */}
                        <Link to={"seller_profile"}>
                            <div
                                onClick={() => setActiveRoute("Orders")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer ${activeRoute === "Orders"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } gap-4`}
                            >
                                <HiOutlineFolder className='w-4 h-4'></HiOutlineFolder>
                                <h4>Seller Profiles</h4>
                            </div>
                        </Link>

                        {/* Sales */}
                      

                        {/* Members */}


                        {/* customer */}
                        <Link to={"with_draw_req"}>
                            <div
                                onClick={() => setActiveRoute("Analytics")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Analytics"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } gap-4`}
                            >
                                <HiMiniCalculator className='w-4 h-4'></HiMiniCalculator>
                                <h4>Withdraw req</h4>
                            </div>
                        </Link>

                        {/* Reporting */}
                        <Link to={"review"}
                            onClick={() => setActiveRoute("Reporting")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Reporting"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiMiniUsers className='w-4 h-4'></HiMiniUsers>
                            <h4>review</h4>
                        </Link>
                        {/* Back Accounts */}
                        <Link to={"wish_list"}
                            onClick={() => setActiveRoute("Back Accounts")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Back Accounts"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiArchiveBoxXMark className='w-4 h-4'></HiArchiveBoxXMark>
                            <h4>Wishlist</h4>
                        </Link>
                        {/* Admin/HR */}
                        <Link to={'all_products'}
                            onClick={() => setActiveRoute("Admin/HR")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Admin/HR"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiAcademicCap className='w-4 h-4'></HiAcademicCap>
                            <h4>All products</h4>
                        </Link>
                        <Link to={"reports"}
                            onClick={() => setActiveRoute("Admin/HR")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Admin/HR"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiAcademicCap className='w-4 h-4'></HiAcademicCap>
                            <h4>Reports</h4>
                        </Link>
                        <Link to={"user_helpline"}
                            onClick={() => setActiveRoute("Admin/HR")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Admin/HR"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiAcademicCap className='w-4 h-4'></HiAcademicCap>
                            <h4>Uhelpline</h4>
                        </Link>

                        <Link to={"withdraw_completed"}
                            onClick={() => setActiveRoute("withdraw_completed")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "withdraw_completed"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiArchiveBoxXMark className='w-4 h-4'></HiArchiveBoxXMark>
                            <h4>withdraw_completed</h4>
                        </Link>

                        <Link to={"withdraw_rejected"}
                            onClick={() => setActiveRoute("withdraw_rejected")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "withdraw_rejected"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiArchiveBoxXMark className='w-4 h-4'></HiArchiveBoxXMark>
                            <h4>withdraw_rejected</h4>
                        </Link>
                        <Link to={"create_delivery_man"}>
                            <div
                                onClick={() => setActiveRoute("Create seller")}
                                className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Create seller"
                                    ? "bg-[#19D895] text-[#0A1727]"
                                    : ""
                                    } gap-4`}
                            >
                                <HiMiniAdjustmentsHorizontal className='w-4 h-4'></HiMiniAdjustmentsHorizontal>
                                <h4>Register seller</h4>
                            </div>
                        </Link>
                        <Link to={"user_register"}
                            onClick={() => setActiveRoute("Back Accounts")}
                            className={`flex hover:bg-[#19D895] duration-700 items-center p-2  cursor-pointer  ${activeRoute === "Back Accounts"
                                ? "bg-[#19D895] text-[#0A1727]"
                                : ""
                                } gap-4`}
                        >
                            <HiArchiveBoxXMark className='w-4 h-4'></HiArchiveBoxXMark>
                            <h4>User register</h4>
                        </Link>

                    </div>



                </div>
            ) : null}


            {deliveryMan && !admin ? (
                <div>
                    <div className=' text-black px-5 py-8'>
                        <div className='flex items-center justify-center'>
                            <img
                                className='animate-pulse md:w-[120px] md:h-[120px] rounded-[50%] '
                                src={man?.result?.imageUrl}
                                alt=''
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className='mt-3 font-semibold text-4xl text-red-500'>{man?.result?.name}</h3>
                            <h4>{man?.result?.email}</h4>
                            <Link to='/'>
                                <button className='bg-[#19D895] w-[90%] mt-4 font-normal px-12 py-2 rounded-sm'>
                                    {man?.result?.role}
                                </button>
                            </Link>
                        </div>
                        <div className='text-left flex flex-col gap-1 mt-8 mx-3 font-normal'>
                            <Link to={"/delivery_man/home"}>
                                <div
                                    onClick={() => setActiveRoute("Home")}
                                    className={`flex hover:bg-[#19D895] duration-700 items-center p-2 ${activeRoute === "Home"
                                        ? "bg-[#19D895] text-[#0A1727]"
                                        : ""
                                        } cursor-pointer  gap-4`}
                                >
                                    <HiHome className='w-4 h-4'></HiHome>
                                    <h4>DELIVERY REQ</h4>
                                </div>
                            </Link>

                            {/* Add other delivery man specific links here */}
                        </div>
                    </div>
                </div>
            ) : null}

        </section>
    );
};

export default Home;
