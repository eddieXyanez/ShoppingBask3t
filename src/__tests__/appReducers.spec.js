import React from 'react';
import { addProductToBasket, removeProductFromBasket } from '../actions/appActions';
import mainReducer  from '../reducers/appReducers';
import deepFreeze from 'deep-freeze';

describe('appReducers TEST SUITE', () => {

    describe('Initial State', () => {

        const initialState = mainReducer(undefined, {});

        it('Is defined', () => {

            expect(initialState).toBeDefined();

        });

        it('Initialises collection of available products', () => {

            expect(initialState.availableProducts).toBeDefined();
            expect(initialState.availableProducts.length).toBeGreaterThan(0);

        });

    });


    describe('addProductToBasket', () => {

        it('Doesn\'t mutate the state', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const product = initialState.availableProducts[0];

            deepFreeze(initialState);

            // go
            const action = addProductToBasket(product);
            mainReducer(initialState, action);

        })

        it('Adds product to basket', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const product = initialState.availableProducts[0];

            expect(initialState.productsInBasket.length).toBe(0);

            // go
            const action = addProductToBasket(product);
            const result = mainReducer(initialState, action);

            // assert
            expect(result.productsInBasket.length).toBe(1);
            expect(result.productsInBasket[0].product).toEqual(product);

        })

    });

    describe('removeProductFromBasket', () => {

        it ('Doesn\'t mutate the state', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const product = initialState.availableProducts[0];

            const state = mainReducer(initialState, addProductToBasket(product));

            deepFreeze(state);

            const action = removeProductFromBasket(product);
            mainReducer(state, action);

        });


        it('Removes correct product from basket', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const product1 = initialState.availableProducts[0];
            const product2 = initialState.availableProducts[1];

            const state1 = mainReducer(initialState, addProductToBasket(product1));
            const stateToBeTested = mainReducer(state1, addProductToBasket(product2));

            expect(stateToBeTested.productsInBasket.length).toBe(2);

            // go
            const action = removeProductFromBasket(stateToBeTested.productsInBasket[0]);
            const result = mainReducer(stateToBeTested, action);

            // assert
            expect(result.productsInBasket.length).toBe(1);
            expect(result.productsInBasket[0].product).toEqual(product2);

        })

    });

    describe('Totals', () => {

        it('Totals are calculated correctly when adding 3 products not on offer', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const firstProductNotOnOffer = initialState.availableProducts.find((product) => { return !product.isOnOffer; });

            // go, add product to basket twice
            const state1 = mainReducer(initialState, addProductToBasket(firstProductNotOnOffer));
            const state2 = mainReducer(state1, addProductToBasket(firstProductNotOnOffer));
            const stateToBeTested = mainReducer(state2, addProductToBasket(firstProductNotOnOffer));

            // assert
            expect(stateToBeTested.totals.subtotal).toBe(firstProductNotOnOffer.price * 3);
            expect(stateToBeTested.totals.discount).toBe(0);
            expect(stateToBeTested.totals.total).toBe(firstProductNotOnOffer.price * 3);

        });


        it('Totals are calculated correctly when adding 2 products on offer', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const firstProductOnOffer = initialState.availableProducts.find((product) => { return product.isOnOffer; });

            // go, add product to basket twice
            const state1 = mainReducer(initialState, addProductToBasket(firstProductOnOffer));
            const stateToBeTested = mainReducer(state1, addProductToBasket(firstProductOnOffer));

            // assert
            expect(stateToBeTested.totals.subtotal).toBe(firstProductOnOffer.price * 2);
            expect(stateToBeTested.totals.discount).toBe(0);
            expect(stateToBeTested.totals.total).toBe(firstProductOnOffer.price * 2);

        });

        it('Totals are calculated correctly when adding 3 products on offer', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const firstProductOnOffer = initialState.availableProducts.find((product) => { return product.isOnOffer; });

            // go, add product to basket twice
            const state1 = mainReducer(initialState, addProductToBasket(firstProductOnOffer));
            const state2 = mainReducer(state1, addProductToBasket(firstProductOnOffer));
            const stateToBeTested = mainReducer(state2, addProductToBasket(firstProductOnOffer));

            // assert
            expect(stateToBeTested.totals.subtotal).toBe(firstProductOnOffer.price * 3);
            expect(stateToBeTested.totals.discount).toBe(firstProductOnOffer.price);
            expect(stateToBeTested.totals.total).toBe(firstProductOnOffer.price * 2);

        });

        it('Totals are calculated correctly when adding 6 products on offer', () => {

            // prepare
            const initialState = mainReducer(undefined, {});
            const firstProductOnOffer = initialState.availableProducts.find((product) => { return product.isOnOffer; });

            // go, add product to basket twice
            const state1 = mainReducer(initialState, addProductToBasket(firstProductOnOffer));
            const state2 = mainReducer(state1, addProductToBasket(firstProductOnOffer));
            const state3 = mainReducer(state2, addProductToBasket(firstProductOnOffer));
            const state4 = mainReducer(state3, addProductToBasket(firstProductOnOffer));
            const state5 = mainReducer(state4, addProductToBasket(firstProductOnOffer));
            const stateToBeTested = mainReducer(state5, addProductToBasket(firstProductOnOffer));

            // assert
            expect(stateToBeTested.totals.subtotal).toBe(firstProductOnOffer.price * 6);
            expect(stateToBeTested.totals.discount).toBe(firstProductOnOffer.price * 2);
            expect(stateToBeTested.totals.total).toBe(firstProductOnOffer.price * 4);

        });


    })

});