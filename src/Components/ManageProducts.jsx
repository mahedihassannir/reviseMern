import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ManageProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home");
    const authToken = localStorage.getItem("userToken");
    const [singleProduct, setallproducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.ecom-bd.com/api/v1/admin/single/product?id=${id}`, {
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
    console.log(singleProduct);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://api.ecom-bd.com/api/v1/admin/delete/product?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (response.data.code === 203) {
                console.log('product deleted successfully');
                navigate("/all_products");
                // Optionally refresh the data or update the UI
            } else {
                console.error('Failed to delete product ');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (
        <div>


            <section>
                <div className="grid md:grid-cols-5 gap-2 grid-cols-2">
                    <img src={singleProduct?.result?.product_images[0]} alt="" />
                    <img src={singleProduct?.result?.product_images[1]} alt="" />
                    <img src={singleProduct?.result?.product_images[2]} alt="" />
                    <img src={singleProduct?.result?.product_images[3]} alt="" />
                    <img src={singleProduct?.result?.product_images[4]} alt="" />
                </div>
                <br />
                <div className="mt-10 grid md:grid-cols-6 grid-cols-2 gap-2">

                    <div className=" border-2 flex items-center justify-center">
                        price: <span className="text-red-500 pl-1">{singleProduct?.result?.price}</span>
                    </div>

                    <div className="p-2  border-2 flex items-center justify-center">
                        category: <span className="text-red-500 pl-1">{singleProduct?.result?.category}</span>
                    </div>

                    <div className="p-2  border-2 flex items-center justify-center">
                        product_name: <span className="text-red-500 pl-1">{singleProduct?.result?.product_name}</span>
                    </div>

                    <div className="p-2  border-2 flex items-center justify-center">
                        product_title: <span className="text-red-500 pl-1">{singleProduct?.result?.product_title}</span>
                    </div>

                    <div className="p-2 border-2 flex items-center justify-center">
                        secondCategory: <span className="text-red-500 pl-1">{singleProduct?.result?.secondCategory}</span>
                    </div>
                    <div className="p-2 border-2 flex items-center justify-center">
                        seller: <span className="text-red-500 pl-1">{singleProduct?.result?.seller}</span>
                    </div>

                </div>


                <div className="mt-10 ml-10">
                    <button className="bg-red-500 text-white text-lg font-semibold py-6 px-32 border-2 rounded-lg" onClick={() => handleDelete(singleProduct?.result?._id)}>
                        Delete
                    </button>
                </div>
            </section>


        </div>
    );
};

export default ManageProducts;