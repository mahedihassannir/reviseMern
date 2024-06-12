import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";

const Cart = () => {

    const [cart,refetch] = useCart()

    const handledelete = (id) => {
        console.log(id);

        fetch(`https://api.ecom-bd.com/cartsdel/${id}`, {
            method: "DELETE"

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'remove from cart successfully ',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    refetch()

                }
            })

    }

    return (
        <div className="py-4">
            <button className="btn mb-4">pay</button>

            <div className="grid grid-cols-3 gap-5">
                {
                    cart.map(res => <div key={res._id}>
                        <div className="card w-96 bg-base-100 shadow-xl image-full">

                            <div className="card-body">
                                <h2 className="card-title">{res.price}</h2>
                                <p>{res.email}</p>

                                <button onClick={() => handledelete(res._id)} className="btn">delete</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default Cart;