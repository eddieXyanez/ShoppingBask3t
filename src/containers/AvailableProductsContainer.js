import { connect } from 'react-redux';
import AvailableProducts from '../components/AvailableProducts';
import { addProductToBasket } from '../actions/appActions';


const mapStateToProps = function(store) {

    return {
        availableProducts: store.availableProducts
    };

};

const mapDispatchToProps = (dispatch) => {

    return {

        addProductToBasket: (product) => {

            dispatch(addProductToBasket(product));

        }

    }

};


const AvailableProductsContainers = connect(mapStateToProps, mapDispatchToProps)(AvailableProducts);
export default AvailableProductsContainers;