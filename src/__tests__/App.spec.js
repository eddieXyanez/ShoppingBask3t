import React from 'react';
import { mount } from 'enzyme';
import App from '../components/App';

describe('<App /> TEST SUITE', () => {

    it('renders without crashing', () => {

        // full mount
        mount(<App />);

    });

    describe('Behaviours', () => {

        describe('Products', () => {

            const sharedAppWrapper = mount(<App />);

            it('Product can be added to basket', () => {

                // prepare
                expect(sharedAppWrapper.find('.shopping-basket tr.product').length).toBe(0);

                // go, click available product
                const availableProductNode = sharedAppWrapper.find('.available-products button').first();
                const productName = availableProductNode.find('strong').text();
                availableProductNode.simulate('click');

                // assert
                const productRows = sharedAppWrapper.find('.shopping-basket tr.product');
                expect(productRows.length).toBe(1);
                expect(productRows.first().find('td').first().text()).toBe(productName);

            });

            it('Product can be removed from basket', () => {

                // prepare
                expect(sharedAppWrapper.find('.shopping-basket tr.product').length).toBe(1);

                // go, click remove product button
                sharedAppWrapper.find('.shopping-basket tr.product button').first().simulate('click');

                // assert
                expect(sharedAppWrapper.find('.shopping-basket tr.product').length).toBe(0);

            });

        });

        describe('TOTALS', () => {

            it('Totals are shown correctly including discount', () => {

                // prepare
                const appWrapper = mount(<App />);

                expect(appWrapper.find('tr.subtotal span.currency').text()).toBe('0.00');
                expect(appWrapper.find('tr.discount span.currency').length).toBe(0);
                expect(appWrapper.find('tr.total span.currency').text()).toBe('0.00');

                // go, add a product that's not on offer once, and a product that's on offer three times
                const availableProductNotOnOfferNode = appWrapper.find('.available-products button').not('.product--on-offer').first();
                const availableProductNotOnOfferPrice = Number(availableProductNotOnOfferNode.find('.currency').text());

                const availableProductOnOfferNode = appWrapper.find('.available-products button.product--on-offer').first();
                const availableProductOnOfferPrice = Number(availableProductOnOfferNode.find('.currency').text());

                availableProductNotOnOfferNode.simulate('click');
                availableProductOnOfferNode.simulate('click');
                availableProductOnOfferNode.simulate('click');
                availableProductOnOfferNode.simulate('click');

                // assert
                expect(appWrapper.find('tr.subtotal span.currency').text())
                    .toBe((availableProductNotOnOfferPrice + availableProductOnOfferPrice * 3).toFixed(2));
                expect(appWrapper.find('tr.discount span.currency').text())
                    .toBe((availableProductOnOfferPrice).toFixed(2));
                expect(appWrapper.find('tr.total span.currency').text())
                    .toBe((availableProductNotOnOfferPrice + availableProductOnOfferPrice * 2).toFixed(2));

            });

        });

    });

});