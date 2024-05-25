import { data } from 'autoprefixer';
import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// this is the sweet aler
import Swal from 'sweetalert2'
// this is the sweet aler ends





const SellerPersonalDetails = () => {
    const sellerAuthToken = localStorage.getItem("sId");
    console.log(sellerAuthToken);

    window.addEventListener("beforeunload", (e) => {
        if (window.location.pathname.startsWith("/seller_personal_form")) {

            e.preventDefault();

            e.returnValue = "";

            return "Are you sure want to leave ?"
        };
    });
    // prevent ends

    const navigate = useNavigate();

    // const api = `https://api.imgbb.com/1/upload?expiration=600&key=890b5ec0923fcc8472f7e690406adc40`

    const imageRef = useRef(null);

    const [mobile, Setmobile] = useState(null);
    const [imageUrls, setImageUrls] = useState(Array(2).fill('')); // Initialize with empty strings
    const [imageUrls2, setImageUrls2] = useState(Array(1).fill('')); // Initialize with empty strings
    console.log(imageUrls);
    console.log(imageUrls2);
    const key = `890b5ec0923fcc8472f7e690406adc40`

    // const uploadUrl = `https://api.imgbb.com/1/upload?key=${key}`
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${key}`



    const handleImageUpload = (e, index) => {

        const file = e.target.files[0];

        const imageData = new FormData();

        imageData.append('image', file);

        fetch(uploadUrl, {
            method: "POST",
            body: imageData
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url;
                setImageUrls(prevUrls => {
                    const updatedUrls = [...prevUrls];
                    updatedUrls[index] = image;
                    return updatedUrls;
                });
            });
    }
    const handleImageUpload2 = (e, index) => {

        const file = e.target.files[0];

        const imageData = new FormData();

        imageData.append('image', file);

        fetch(uploadUrl, {
            method: "POST",
            body: imageData
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url;
                setImageUrls2(prevUrls => {
                    const updatedUrls = [...prevUrls];
                    updatedUrls[index] = image;
                    return updatedUrls;
                });
            });
    }

    console.log({ imageUrls });


    const handleSubmit = (e) => {

        e.preventDefault();

        const firstname = e.target.firstname.value;
        const email = e.target.email.value;
        const lastname = e.target.lastname.value;
        const storename = e.target.storename.value;
        const phonenumber = e.target.phonenumber.value;
        const address = e.target.address.value;
        const monthlyIncome = e.target.monthlyIncome.value;



        if (phonenumber.length !== 11) {
            return Swal.fire({
                position: 'top-start',
                icon: 'unsuccess',
                title: `mobile number error not 11 degit `,
                showConfirmButton: false,
                timer: 1000
            });

        };

        const name = firstname + " " + lastname;
        const allData = {
            name,
            email,
            store_name: storename,
            mobile_number: phonenumber,
            nid_front: imageUrls[0],
            nid_back: imageUrls[1],
            store_photo: imageUrls2[0],
            store_address: address,
            monthly_income: monthlyIncome,
        };

        console.log(allData);


        // console.log("this data is come from the 85 num line", allData);

        fetch(`http://localhost:5000/api/v1/auth/seller/profile_create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sellerAuthToken}`
            },
            body: JSON.stringify(allData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("this is checking the data is it ok ot not", data);
                // this blog is for the is insertedId is successful then go to the another page else any problem stay in this page 
                if (data.code === 201) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Seller Register Has Been complete congratulation  ',
                        showConfirmButton: false,
                        timer: 1000
                    });

                    // navigate('/seller_account_created_dome');
                    navigate("/create_delivery_man")

                }
                else {
                    return
                };
            });


    };

    return (
        <div className='md:w-11/12 py-4 bg-blue-50 mx-4 mx-auto md:my-4 '>
            <div>



                {/* this div is for the center branding */}
                <div className=" text-center pt-3">
                    {/* img */}
                    <div className="flex justify-center">
                        <img className=' h-20 w-20  rounded-full' src="https://i.ibb.co/P9tbKgZ/logo.jpg" alt="" />
                    </div>
                    {/* img ends */}

                    <div className="">

                        <h3 className='text-3xl font-semibold  select-none'>E-Commerce Registration Form</h3>
                        <p className='pt-2  select-none'>Please fill the following form with your personal information</p>
                    </div>

                </div>
                <hr className='pt-1 mt-3 bg-gray-500' />
                {/* this div is for the center branding ends */}

                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.527295875014!2d90.8567583!3d23.7961216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1695296508788!5m2!1sen!2sbd" width="400" height="400"  allowfullscreen="" loading="lazy" ></iframe>
*/}
                <form onSubmit={handleSubmit} className="">
                    {/* this section is for the seller reg inputs */}
                    <div className=" px-2 grid grid-cols-2 gap-2 md:grid-cols-3 md:w-11/12 mx-auto mt-2 md:mt-10">
                        <div className="">
                            <label htmlFor="">
                                <span>নামের প্রথম অংশ</span>
                            </label>

                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="firstname" id="" required placeholder='নামের প্রথম অংশ' />
                        </div>
                        <div className="">
                            <label htmlFor="">
                                <span>নামের শেষাংশ</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="lastname" id="" required placeholder='নামের শেষাংশ' />
                        </div>

                        <div className="">
                            <label htmlFor="">
                                <span>দোকানের নাম</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="storename" id="" required placeholder='দোকানের নাম' />
                        </div>
                        <div className="  md:mt-4">
                            <label htmlFor="">
                                <span>যোগাযোগের নম্বর</span>
                            </label>
                            <input className="block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold" type="number" name="phonenumber" id="" required placeholder='যোগাযোগের নম্বর' />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="">
                                <span>ব্যবসার ধরণ</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="businesstype" id="" required placeholder='ব্যবসার ধরণ' />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="">
                                <span>এলাকা</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="area" id="" required placeholder='এলাকা' />
                        </div>
                        {/* this is for business type */}
                        <div className="mt-4">
                            <label htmlFor="">
                                <span>ইমেইল ঠিকানা</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="email" name="email" id="" required placeholder='ইমেইল ঠিকানা' />
                        </div>
                        {/* ends */}

                        {/* this is for city location type */}
                        <div className="mt-4">
                            <label htmlFor="">
                                <span>মাসিক আয়</span>
                            </label>
                            <input className='block bg-blue-100 border-2 outline-none py-2 w-50 md:w-80  border-gray-400 text-black rounded  pl-2 focus:placeholder-green-500  font-semibold' type="text" name="monthlyIncome" id="" required placeholder='মাসিক আয়' />
                        </div>
                        {/* ends */}

                        <div className="">
                            <textarea className='outline-none rounded pt-1 pl-1 md:w-full w-[440px]' name="address" id="" cols="45" placeholder='আপনার ঠিকানা লিখুন' rows="4"></textarea>
                        </div>

                    </div>
                    {/* this section is for the seller reg inputs ends */}

                    {/* this section is for the  images and submit related  */}
                    <div className="">

                        <div className="grid md:grid-cols-3 mt-3 ">
                            {/* this is image submit  */}
                            <div className=" flex gap-5 w-11/12 mx-auto pb-6 lg:ml-20 ">

                                {/* this is for the image input  */}
                                {/* <div className="w-80 h-40"> */}
                                {/* 
                                <h1>{image ? image.name : "Select Store image "}</h1> */}
                                {/* {
                                    image ?

                                        <img className='w-full cursor-pointer object-cover h-40' src={image} alt="" />
                                        :
                                        <img className='w-full cursor-pointer object-cover h-40' src="data:image/png;base64,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" alt="" />
                                }
                                <input className='hidden' onChange={handleimageWithnew} type="file" ref={imageRef} />
                                 */}
                                <div className=''>
                                    <h1 className='pb-2 text-green-600'>Upload Your Store Image</h1>
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="flex m-2 justify-center items-center border border-dashed border-orange-600 w-24 h-32">
                                            <img className="w-full object-cover h-32 " src={url} alt="" />
                                            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
                                        </div>
                                    ))}
                                </div>
                                {/* this is for the stor image */}
                                <h1 className='border-2 border-red-600'></h1>
                                <div className='m2'>
                                    <h1 className='pb-2 text-green-600'>Upload Your Store Image</h1>
                                    {imageUrls2.map((url, index) => (
                                        <div key={index} className="flex justify-center items-center border border-dashed border-orange-600 w-24 h-32">
                                            <img className="w-full object-cover h-32 " src={url} alt="" />
                                            <input type="file" onChange={(e) => handleImageUpload2(e, index)} />
                                        </div>
                                    ))}
                                </div>


                            </div>
                            {/* this is for the image input ends */}




                            {/* </div> */}
                            {/* ends */}
                            {/* this is image submit  */}

                        </div>
                        {/* this section is for the  images and submit related  ends */}


                        {/*  */}
                        <div className="flex justify-center">


                            <button type='submit' className='py-3 px-7 rounded-md  outline-none bg-blue-300 text-black font-semibold'>

                                {/* <Link to="/seller_account_created_dome" > */}
                                Submit
                                {/* </Link> */}

                            </button>


                        </div>
                        {/*  */}

                    </div>

                </form>





            </div>
        </div>
    );
};

export default SellerPersonalDetails;