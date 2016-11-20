import * as appActions from '../actions/appActions';

const initialState = {
    availableProducts: [
        { id: "apple", name: "Apple", price: 0.25, isOnOffer: false },
        { id: "orange", name: "Orange", price: 0.30, isOnOffer: false },
        { id: "banana", name: "Banana", price: 0.15, isOnOffer: false },
        { id: "papaya", name: "Papaya", price: 0.50, isOnOffer: true }
    ],
    productsInBasket: [],
    totals: {
        subtotal: 0,
        discount: 0,
        total: 0
    }
};


// helper functions ---------------------------------------------
let productInBasketIdCounter = 0;
function getNewProductInBasketId() {

    return 'pib-' + productInBasketIdCounter++;

}

function getCalculatedTotals(productsInBasket) {

    let subtotal = 0;
    let discountedProducts = [];
    let discount = 0;

    // calculate subtotal and look for products on offer
    for (let product of productsInBasket){

        subtotal+=product.price;

        if (product.isOnOffer){

            if (!discountedProducts[product.id]){

                discountedProducts[product.id] = {
                    price: product.price,
                    count: 1
                };

            }
            else {

                discountedProducts[product.id].count++;

            }

        }

    }

    // calculate discount
    Object.keys(discountedProducts).forEach(function(key, index) {

        let discountProduct = discountedProducts[key];
        discount += Math.floor(discountProduct.count / 3) * discountProduct.price;

    });

    // calculate total
    let total = subtotal - discount;

    return {
        subtotal,
        discount,
        total
    };

}


export default function mainReducer(state = initialState, action) {

    switch (action.type) {
        case appActions.ACTIONS_KEYS.ADD_PRODUCT_TO_BASKET:
        {
            const productsInBasket = [...state.productsInBasket, {
                id: getNewProductInBasketId(),
                product: action.product
            }];

            const totals = getCalculatedTotals(productsInBasket.map((item) => { return item.product; }));

            return Object.assign({}, state, {
                productsInBasket,
                totals
            });
        }

        case appActions.ACTIONS_KEYS.REMOVE_PRODUCT_FROM_BASKET:
        {
            const indexOfProductInBasket = state.productsInBasket.indexOf(action.item);
            const productsInBasket = [
                ...state.productsInBasket.slice(0, indexOfProductInBasket),
                ...state.productsInBasket.slice(indexOfProductInBasket + 1)
            ];

            const totals = getCalculatedTotals(productsInBasket.map((item) => { return item.product; }));

            return Object.assign({}, state, {
                productsInBasket,
                totals
            });
        }

        default:
        {
            return state;
        }
    }

}



