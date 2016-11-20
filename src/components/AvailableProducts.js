import React, { PropTypes } from 'react';


export default function AvailableProducts(props) {

    return (
        <div className="available-products">

            <h3>
                Available products
            </h3>

            <div>
                {props.availableProducts.map((product) => {

                    return (

                        <button key={product.id} className={"btn btn-default" + (product.isOnOffer ? " product--on-offer" : "")} aria-label={"Add " + product.name + " to basket."}
                                onClick={() => { props.addProductToBasket(product); }}>

                            <strong>
                                {product.name}
                            </strong>

                            <span className="currency">{product.price.toFixed(2)}</span>

                        </button>

                    );

                })}
            </div>

        </div>
    );

}
AvailableProducts.propTypes = {
    //addProductToBasket: PropTypes.func.isRequired,
    availableProducts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            isOnOffer: PropTypes.bool.isRequired
        }).isRequired
    ).isRequired
}