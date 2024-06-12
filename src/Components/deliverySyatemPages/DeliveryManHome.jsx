import axios from "axios";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import DeliveryManHomeHook from "../../Hooks/DeliveryManHome";

const DeliveryManHome = () => {
    const deliveryMan = localStorage.getItem("dId");
    const id = localStorage.getItem("dAId");

    // edns
    // const [man, setDeliveryMan] = useState(null);
    const [Req, refetch] = DeliveryManHomeHook();
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/delivery/profile?id=${id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${deliveryMan}`
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Failed to all users');
    //             }
    //             const data = await response.json();
    //             setDeliveryMan(data);
    //         } catch (error) {
    //             // setError(error.message);

    //         } finally {
    //             // setLoading(false);
    //         }
    //     };

    //     if (deliveryMan) {
    //         fetchProducts();
    //     }

    // }, [deliveryMan]);

    // console.log(man);
    const data = Req?.result?.deliveryReq
    console.log(data);
    // const calculateTotalPrice = (deliveryReq) => {
    //     if (!Array.isArray(deliveryReq)) return 0;
    //     console.log(deliveryReq);
    //     return deliveryReq.reduce((total, req) => {
    //         const reqTotal = Array.isArray(req.products) ? req.products.reduce((subTotal, product) => {
    //             const price = product?.product?.price || 0;
    //             console.log(price);
    //             const quantity = product.quantity || 1;
    //             return subTotal + (price * quantity);
    //             // console.log(product?.product?.price);
    //         }, 0) : 0;

    //         return total + reqTotal;
    //     }, 0);
    // };

    // const totalPrice = calculateTotalPrice(data);
    // console.log(totalPrice);
    // const calculateTotalPrice = (deliveryReq) => {
    //     if (!Array.isArray(deliveryReq)) return 0;

    //     return deliveryReq.reduce((total, req) => {
    //         const reqTotal = Array.isArray(req.products) ? req.products.reduce((subTotal, product) => {
    //             const price = product?.product?.price || 0;
    //             const quantity = product.quantity || 1;
    //             const totalPriceForProduct = price * quantity;
    //             const totalPriceWithExtra = totalPriceForProduct + (5 * quantity); // Add 5 taka extra for each quantity
    //             return subTotal + totalPriceWithExtra;
    //         }, 0) : 0;

    //         return total + reqTotal;
    //     }, 0);
    // };
    // const totalPrice = calculateTotalPrice(data);
    // console.log(totalPrice + 5);
    // Assuming `products` is the array of products
    // const calculateIndexTotalPrice = (deliveryReq) => {
    //     if (!Array.isArray(deliveryReq)) return [];
    //     console.log(deliveryReq);
    //     // Iterate over each element of the deliveryReq array
    //     return deliveryReq.map((req) => {
    //         // Calculate the total price for products within each deliveryReq element
    //         return req.products.reduce((totalPrice, product) => {
    //             // Extracting price and quantity from each product
    //             console.log(product);
    //             const price = product?.product?.price || 0;
    //             console.log(price);
    //             const quantity = product.quantity || 1;
    //             console.log(quantity);

    //             // Calculate the total price for the current product
    //             const totalPriceForProduct = price * quantity;

    //             // Add 5 taka extra for each quantity
    //             const totalPriceWithExtra = totalPriceForProduct + (5 * quantity);

    //             // Add the total price for the current product to the running total
    //             return totalPrice + totalPriceWithExtra;
    //         }, 0);
    //     });
    // };

    // // Assuming 'result' contains the data you provided
    // const deliveryReqTotalPrices = calculateIndexTotalPrice(data);
    // console.log(deliveryReqTotalPrices);



    const handleConfirm = async (id) => {

        const deliveryAccountIid = localStorage.getItem("dAId");
        const dToken = localStorage.getItem("dId");
        console.log(id);

        try {
            const response = await axios.post(`https://api.ecom-bd.com/api/v1/admin/delivery/confirm?deliveryId=${id}&acId=${deliveryAccountIid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${dToken}`
                }
            });

            console.log(response.data); // Log the response data

            if (response.data.code === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ডেলিভারি সম্পন্ন হয়েছে',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }


    }
    const handleCancel = (id) => {
        console.log(id);
    };

    const calculateIndexTotalPrice = (deliveryReq) => {
        if (!Array.isArray(deliveryReq)) return [];

        // Iterate over each element of the deliveryReq array
        return deliveryReq.map((req) => {
            // Calculate the total price for products within each deliveryReq element
            return req.products.reduce((totalPrice, product) => {
                // Extracting price and quantity from each product
                const price = product?.product?.price || 0;
                const quantity = product.quantity || 1;

                // Calculate the total price for the current product
                const totalPriceForProduct = price * quantity;

                // Add 5 taka for each product in the products array
                const totalPriceWithExtra = totalPriceForProduct + (5 * req.products.length);

                // Add the total price for the current product to the running total
                return totalPrice + totalPriceWithExtra;
            }, 0);
        });
    };

    // Assuming 'result' contains the data you provided
    const deliveryReqTotalPrices = calculateIndexTotalPrice(data);
    console.log(deliveryReqTotalPrices);
    refetch();
    return (
        <div>
            <ToastContainer />
            <h1 className="text-xl font-semibold">Order Overview</h1>
            <div className="mt-10 flex justify-between lg:justify-start">
                <ul className="lg:flex gap-4 font-semibold">
                    <li>
                        All <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Pending All{" "}
                        <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Ready to ship{" "}
                        <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Shipped <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Delivered{" "}
                        <span className="lg:border-r border-indigo-400 mx-3"></span>
                    </li>
                </ul>
                <ul className="lg:flex gap-4 font-semibold">
                    <li>
                        Cancled <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Retuned <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>
                        Failed Delivery{" "}
                        <span className="lg:border-r border-indigo-400 ml-3"></span>
                    </li>
                    <li>Refund Only</li>
                </ul>
            </div>

            <div className="bg-white py-1 px-2 mt-4">
                <ul className="flex flex-col lg:flex lg:flex-row gap-2 mt-4 ">
                    <li className="border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Order Number"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] outline-none"
                        />
                    </li>
                    <li className="border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Customer"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] outline-none"
                        />
                    </li>
                    <li className="border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Product"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] outline-none"
                        />
                    </li>
                    <li className="border-2">
                        <span
                            type="text"
                            list="data"
                            name=""
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] "
                        >
                            {" "}
                        </span>
                        <select id="data" className="outline-none">
                            <option>Product Tag</option>
                            <option>One</option>
                            <option>Two</option>
                            <option>Two</option>
                            <option>Three</option>
                            <option>Four</option>
                            <option>Five</option>
                        </select>
                    </li>
                    <li className="border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Seller SKU"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] outline-none"
                        />
                    </li>
                    <li className="border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Payment"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[110px] outline-none"
                        />
                    </li>
                    <li className=" lg:ml-24 border-2">
                        <input
                            type="text"
                            name=""
                            placeholder="Search"
                            id=""
                            className="border-none text-sm px-2 py-1 lg:w-[100px] outline-none"
                        />
                    </li>
                </ul>
                <ul className="mt-4">
                    <li className="pb-2">
                        {/* <RangePicker></RangePicker> */}
                    </li>
                </ul>
            </div>

            <div className="flex justify-between mt-10">
                <div>
                    <ul className="flex flex-col lg:flex lg:flex-row gap-2 mt-10">
                        <li className="border-2 bg-white">
                            <span
                                type="text"
                                list="data1"
                                name=""
                                id=""
                                className="border-none text-sm px-2 py-1 lg:w-[110px]"
                            ></span>
                            <select id="data1" className="outline-none">
                                <option>Print</option>
                                <option>One</option>
                                <option>Two</option>
                                <option>Three</option>
                                <option>Four</option>
                                <option>Five</option>
                            </select>
                        </li>
                        <li className=" border-2 bg-white">
                            <span
                                type="text"
                                list="data2"
                                name=""
                                id=""
                                className="border-none text-sm px-2 py-1 lg:w-[110px]"
                            ></span>
                            <select id="data2" className="outline-none">
                                <option>Set Status</option>
                                <option>One</option>
                                <option>Two</option>
                                <option>Three</option>
                                <option>Four</option>
                                <option>Five</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <ul className="flex flex-col lg:flex lg:flex-row gap-2 mt-10">
                        <li className="border-2 bg-white">
                            <span
                                type="text"
                                list="data3"
                                name=""
                                id=""
                                className="border-none text-sm px-2 py-1 lg:w-[110px]"
                            ></span>
                            <select id="data3" className="outline-none">
                                <option>Export</option>
                                <option>One</option>
                                <option>Two</option>
                                <option>Three</option>
                                <option>Four</option>
                                <option>Five</option>
                            </select>
                        </li>
                        <li className=" border-2 bg-white">
                            <span
                                type="text"
                                list="data4"
                                name=""
                                id=""
                                className="border-none text-sm px-2 py-1 lg:w-[110px]"
                            ></span>
                            <select id="data4" className="outline-none">
                                <option>Import</option>
                                <option>One</option>
                                <option>Two</option>
                                <option>Three</option>
                                <option>Four</option>
                                <option>Five</option>
                            </select>
                        </li>
                        <li className=" border-2 bg-white">
                            <span
                                type="text"
                                list="data5"
                                name=""
                                id=""
                                className="border-none text-sm px-2 py-1 lg:w-[110px]"
                            ></span>
                            <select id="data5" className="outline-none">
                                <option>View History</option>
                                <option>One</option>
                                <option>Two</option>
                                <option>Three</option>
                                <option>Four</option>
                                <option>Five</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="my-5">
                <h1 className="font-semibold text-2xl">

                    Delivery Req:  {Req?.result?.deliveryReq?.length}
                </h1>
            </div>

            {/* Order Table */}
            <div>
                {/* <OrdersTable></OrdersTable> */}
                <div className="min-w-full">
                    <div className="text-[11px]  w-full">
                        {/* order table head  */}


                        {/* order tabel body  */}

                        {/* here is the order manage tables */}


                        {/* // console.log(item.order.address?.address), */}


                        {Req && Req?.result && Req?.result?.deliveryReq?.length > 0 ? (
                            Req?.result?.deliveryReq?.map(res =>
                                <div key={res._id} className="w-full mt-5 ">
                                    {/* this dive is for change the progress of order */}
                                    <div className=" w-[100%] lg:w-[40%] shadow-lg  h-10 bg-white rounded-t-md ">

                                        <div className="flex items-center gap-1 pt-2 pl-4  ">


                                            {/* this div is the button for the delivered or not delivered */}
                                            <div className="">


                                                <button onClick={() => handleConfirm(res._id)} type='submit' className="py-2 px-5 border-2 bg-blue-700 text-white font-semibold border-red-300">

                                                    CONFIRM

                                                </button>


                                            </div>
                                            <div onClick={() => handleCancel(res._id)} className="">


                                                <button type='submit' className="py-2 px-5 border-2 bg-red-500 text-white font-semibold border-red-300">

                                                    CANCEL

                                                </button>


                                            </div>
                                            {/* this div is the button for the delivered or not delivered ends */}





                                            {/* this dive is for the title */}
                                            <div className="">


                                                <p className="font-semibold text-[14px] uppercase">change the order progress</p>

                                            </div>
                                            {/* this dive is for the title ends */}

                                        </div>

                                    </div>
                                    {/* this dive is for change the progress of order ends */}

                                    <div className=" rounded-md w-full shadow-md border-spacing-2 py-4 bg-white flex-row-reverse lg:flex">
                                        {/* starts of the product sheeping address and the person who ordered */}

                                        <div className=" w-full lg:w-[20%]  flex lg:grid   ml-2 border-r-2 border-r-indigo-800">

                                            <div className=" w-28 flex justify-center items-center h-28  rounded-full border-2 ">

                                                <p className="text-lg font-semibold text-center">
                                                    product <br /> <span className="text-center">{""}</span>
                                                    <p className="flex items-center justify-center text-red-600">
                                                        {/* TODO */}
                                                        {/* {} */}
                                                        <span>
                                                            Total Price: {
                                                                res?.products?.reduce((total, product) =>
                                                                    total + (product?.product?.price * product?.quantity + 5), 0
                                                                ) + 5
                                                            }
                                                        </span>
                                                    </p>
                                                </p>


                                            </div>

                                            {/* this is the order product shipping details */}
                                            <div className="w-full p-2 ">

                                                <ul>
                                                    <img className="w-10 h-10" src={res?.deliveredToUser?.profileImage} alt="" />
                                                    <li className="text-[13px] font-semibold">date: <span className="text-red-500">{res?.date}</span></li>


                                                    <li className="text-[13px] font-semibold">customer  name: <span className="text-red-500">
                                                        {res?.deliveredToUser?.name}
                                                    </span> <span className="text-red-500">{ }</span></li>


                                                    <li className="text-[13px] font-semibold">paymentMethod: <span className="text-red-500">COD</span></li>

                                                    <li className="text-[13px] font-semibold">email: <span className="text-red-500">
                                                        {res?.deliveredToUser?.email}
                                                    </span> <span className="text-red-500">{ }</span></li>

                                                    <li className="text-[13px] font-semibold">mobile: <span className="text-red-500">
                                                        {res?.deliveredToUser?.address?.mobile_number}
                                                    </span> <span className="text-red-500">{ }</span></li>

                                                    <li className="text-[13px] font-semibold">address: <span className="text-red-500">
                                                        {res?.deliveredToUser?.address?.area}
                                                    </span> <span className="text-red-500">{ }</span></li>

                                                </ul>


                                            </div>
                                            {/* this is the order product shipping details ends */}

                                        </div>
                                        <hr className="py-2  mt-2 text-blue-800" />
                                        {/* ends of the product sheeping detail */}


                                        <div className=" w-full grid md:grid-cols-7 grid-cols-2 gap-2 lg:w-[80%]  ">
                                            {/* {Object.values(item.order.cart).map((cartItem, cartIndex) => (  */}

                                            {res?.products?.map((product, index) => (
                                                <div key={index}>
                                                    {/* Mapping over the product images */}
                                                    <div className="">
                                                        <img src={product?.product?.product_images[0]} alt="" />

                                                    </div>
                                                    <br />
                                                    <div>
                                                        <p>{product?.product?.product_name}</p>
                                                        <div className="w-28 block">
                                                            <p className="text-md">seller store: <span className="text-red-500">{product?.product?.seller?.store_address}</span></p>

                                                            <p className="text-md ">seller name: <span className="text-red-500">{product?.product?.seller?.name}</span></p>

                                                            <p className="text-md ">seller number: <span className="text-red-500">{product?.product?.seller?.mobile_number}</span></p>

                                                            <p className="text-md  text-xl text-black font-semibold">Quantity: <span className="text-red-500">{product?.quantity}</span></p>
                                                            <p className='text-lg font-semibold'>Price: <span className="text-green-500">{product?.product?.price}</span></p>

                                                        </div>
                                                    </div>
                                                </div>


                                            ))}

                                            <div>
                                                <h1 className="text-[19px]">Product Quantity: {res?.products?.length}</h1>
                                            </div>
                                            {/* // ))} */}
                                        </div>



                                    </div>






                                    {/* this is the product name and the address detail work ends */}

                                </div>

                            )
                        ) : (

                            <div className="text-center mx-auto w-full">
                                <h1 className="text-center mt-10 text-[25px]">no order</h1>
                                <img className="mx-auto mt-5" src="data:image/png;base64,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" alt="" />
                            </div>
                        )
                        }



                        {/* here is the order manage tables  ends*/}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryManHome;