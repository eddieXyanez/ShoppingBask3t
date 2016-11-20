import { connect } from 'react-redux';
import { removeProductFromBasket } from '../actions/appActions';
import ShoppingBasket from '../components/ShoppingBasket';

const mapStateToProps = function(store) {

    return {
        productsInBasket: store.productsInBasket,
        totals: store.totals
    };

};

const mapDispatchToProps = (dispatch) => {

    return {

        removeProductFromBasket: (product) => {

            dispatch(removeProductFromBasket(product));

        }

    }

};

const ShoppingBasketContainer = connect(mapStateToProps, mapDispatchToProps)(ShoppingBasket);
export default ShoppingBasketContainer;