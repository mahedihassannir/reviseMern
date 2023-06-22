import { useContext, useEffect, useState } from "react";
import { contexM } from "../Proviuders/ContexProvider";



const Home = () => {
    const { user } = useContext(contexM)

    const [data, SetData] = useState([])

    useEffect(() => {

        fetch(`http://localhost:5000/productss`)
            .then(res => res.json())
            .then(data => SetData(data))

    }, [])


    const handleAddToCart = (item) => {


        const addtoCartData = { name: item.name, recipe: item.recipe, image: item.image, email: user.email }
        console.log(addtoCartData);

        fetch(`http://localhost:5000/cart`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addtoCartData)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert("product add to Cart done")
                }
            })

    }


    return (
        <div>

            <div className="text-center text-4xl font-bold">

                <h1>Here is all Products</h1>

            </div>


            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        data.map(res => <div key={res._id}>

                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={res.image} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{res.category}</h2>
                                    <p>{res.recipe}</p>
                                    <div className="card-actions">
                                        <button onClick={() => handleAddToCart(res)} className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            </div>



        </div>
    );
};

export default Home;