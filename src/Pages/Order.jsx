import useCart from "../Hooks/useCart";

const Order = () => {


    const [cart] = useCart()

    const handleDelete = (id) => {
        console.log(id);

        fetch(`http://localhost:5000/cart/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount>0) {
                    alert("deleted success")



                }
            })


    }


    return (
        <div className="w-full h-screen ">
            <div className="mt-10 ">
                {
                    cart.map(res => <div key={res._id}>

                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                {/* head */}

                                <tbody>
                                    {/* row 1 */}
                                    <tr>

                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={res.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{res.name}</div>
                                                    <div className="text-sm opacity-50">{res.recipe}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Zemlak, Daniel and Leannon
                                            <br />
                                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                        </td>
                                        <td>Purple</td>
                                        <th>
                                            <button onClick={() => handleDelete(res._id)} className="btn  btn-xs btn-primary">x</button>
                                        </th>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default Order;