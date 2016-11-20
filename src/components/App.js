import React from 'react';
import AvailableProductsContainer from '../containers/AvailableProductsContainer';
import ShoppingBasketContainer from '../containers/ShoppingBasketContainer';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from '../reducers/appReducers';


const store = createStore(mainReducer);


export default function App(props){
    return (
        <Provider store={store}>
            <div className="container">

                <AvailableProductsContainer />
                <ShoppingBasketContainer />

            </div>
        </Provider>
    );
};

