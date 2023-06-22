import { useContext } from "react";
import { useEffect, useState } from "react";
import { contexM } from "../Proviuders/ContexProvider";

const Home = () => {

    const { user } = useContext(contexM)

    const [data, Setdata] = useState([])

    useEffect(() => {

        fetch(`http://localhost:5000/food`)
            .then(res => res.json())
            .then(data => Setdata(data))

    }, [])


    // here is teh post method to send in server side


    const handlePostServer = (item) => {

        if (user?.email) {

            fetch(`http://localhost:5000/cart`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ price: item.price, name: item.name, id: item._id, email: user?.email })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        alert("add to cart is done")
                    }
                })
        }
        else {
            alert("you must be login")
        }

    }

    // here is teh post method to send in server ends

    const disable = true


    return (
        <div className="w-full py-3">
            <div className="grid grid-cols-3 gap-4 ">
                {
                    data.map(res => <div key={res._id}>

                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={res.image} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{res.price}</h2>
                                <h2 className="card-title">{res.name}</h2>
                                <p>{res.category}</p>
                                <div className="card-actions">
                                    <button disabled={user?.email ? "" : disable} onClick={() => handlePostServer(res)} className="btn btn-primary">add to cart</button>
                                </div>
                            </div>
                        </div>

                    </div>)
                }
            </div>

        </div>
    );
};

export default Home;