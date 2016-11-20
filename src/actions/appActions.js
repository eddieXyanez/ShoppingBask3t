export const ACTIONS_KEYS = {
    ADD_PRODUCT_TO_BASKET: 'ADD_PRODUCT_TO_BASKET',
    REMOVE_PRODUCT_FROM_BASKET: 'REMOVE_PRODUCT_FROM_BASKET'
};


// actions
export function addProductToBasket(product) {

    return {
        type: ACTIONS_KEYS.ADD_PRODUCT_TO_BASKET,
        product
    };

}

export function removeProductFromBasket(item) {

    return {
        type: ACTIONS_KEYS.REMOVE_PRODUCT_FROM_BASKET,
        item
    };

}

