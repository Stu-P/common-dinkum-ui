/*eslint-disable no-unused-vars*/
import {expect} from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import DinkumButton from './DinkumButton';

describe('<DinkumButton />', () => {
    const createComponent = (props) => shallow((
        <DinkumButton {...props}/>

    ));

    it('should render without exploding', () => {
        const component = createComponent({ title:'test button' });

        expect(component.find('button').text()).to.contain('test button');


    });

    it('Can disable button', () => {

        const component = createComponent({disabled:true,title:'test button'});

        expect(component.find('button').prop('disabled')).to.equal(true);


    });
});
