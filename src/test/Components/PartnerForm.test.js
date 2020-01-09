import React from 'react'
import { shallow } from 'enzyme'
import PartnerForm from '../../containers/PartnerForm/PartnerForm'
import partners from '../fixtures/partners'

test('should render PartnerForm with defaults', () => {
    const wrapper = shallow(<PartnerForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render PartnerForm correctly', () => {
    const wrapper = shallow(<PartnerForm partner={partners[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<PartnerForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', { preventDefault: () => {}})
    expect(wrapper.partnerFormState('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

// test('should set name on input change', () => {
//     const value = 'New name'
//     const wrapper = shallow(<PartnerForm />)
//     const selector = wrapper.find('input').at(0).simulate('change', { target: { value }})
//     expect(wrapper.state('name')).toBe(value)
// })
//
// test('should set gender on input change', () => {
//     const value = 'male'
//     const wrapper = shallow(<PartnerForm />)
//     wrapper.find('[name="gender"]').simulate('change', { target: { value }})
//     expect(wrapper.state('gender')).toBe(value)
// })
//
// test('should set price on input change', () => {
//     const value = '14,50'
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('input').at(2).simulate('change', { target: { value }})
//     expect(wrapper.state('price')).toBe(value)
// })
//
// test('should not set price if invalid input', () => {
//     const value = '14,5000'
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('input').at(2).simulate('change', { target: { value }})
//     expect(wrapper.state('price')).toBe(undefined)
// })
//
// test('should set available on input change', () => {
//     const value = 3
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('input').at(3).simulate('change', { target: { value }})
//     expect(wrapper.state('available')).toBe(value)
// })
//
// test('should not set available if invalid input', () => {
//     const value = 'any'
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('input').at(3).simulate('change', { target: { value }})
//     expect(wrapper.state('available')).toBe(undefined)
// })