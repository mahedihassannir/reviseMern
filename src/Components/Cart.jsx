import useCart from "../Hooks/useCart";

const Cart = () => {

    const [cart] = useCart()

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

                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default Cart;