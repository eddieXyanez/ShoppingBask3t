import React, { PropTypes } from 'react';


export default function ShoppingBasket (props) {

    return (

        <div className="shopping-basket">

            <h3>

                Shopping basket

            </h3>

            <table className="table">

                <thead>
                <tr>
                    <th className="col-xs-7">
                        Product
                    </th>
                    <th className="col-xs-3 text-right">
                        Price
                    </th>
                    <th className="col-xs-1 text-right">

                    </th>
                </tr>
                </thead>
                <tbody>

                {props.productsInBasket.length === 0 &&

                    <tr className="empty">
                        <td colSpan="3">
                            Your shopping basket is empty
                        </td>
                    </tr>

                }

                {props.productsInBasket.map((item) => {

                    return (

                        <tr key={item.id} className="product">
                            <td>
                                {item.product.name}
                            </td>
                            <td className="text-right">
                                <span className="currency">{item.product.price.toFixed(2)}</span>
                            </td>
                            <td className="text-right">
                                <button type="button" className="btn btn-danger btn-xs" aria-label="Remove"
                                        onClick={() => { props.removeProductFromBasket(item); }}>
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                </button>
                            </td>
                        </tr>

                    )

                })}


                <tr className="active subtotal">
                    <td className="text-right">
                        SUBTOTAL
                    </td>
                    <td className="text-right">
                        <span className="currency">{props.totals.subtotal.toFixed(2)}</span>
                    </td>
                    <td>

                    </td>
                </tr>
                {props.totals.discount > 0 &&

                    <tr className="warning discount">
                        <td className="text-right">
                            DISCOUNT
                            <br />
                            <span className="label label-warning">
                                OFFER: BUY 3 FOR 2
                            </span>
                        </td>
                        <td className="text-right">
                            - <span className="currency">{props.totals.discount.toFixed(2)}</span>
                        </td>
                        <td>

                        </td>
                    </tr>

                }
                <tr className="total">
                    <td className="text-right">
                        TOTAL
                    </td>
                    <td className="text-right">
                        <span className="currency">{props.totals.total.toFixed(2)}</span>
                    </td>
                    <td>

                    </td>
                </tr>
                </tbody>

            </table>

        </div>


    );

}
ShoppingBasket.propTyes = {
    productsInBasket: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            product: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                isOnOffer: PropTypes.bool.isRequired
            }).isRequired
        }).isRequired
    ).isRequired,
    totals: PropTypes.shape({
        subtotal: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
    }).isRequired,
    removeProductFromBasket: PropTypes.func.isRequired
}