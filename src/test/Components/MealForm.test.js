import React from 'react'
import { shallow } from 'enzyme'
import MealForm from '../../containers/MealForm/MealForm'
import meals from '../fixtures/meals'

test('should render MealForm with defaults', () => {
    const wrapper = shallow(<MealForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render MealForm correctly', () => {
    const wrapper = shallow(<MealForm meal={meals[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<MealForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.partnerFormState('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

// test('should set name on input change', () => {
//     const value = 'New name'
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('[name="name"]').simulate('change', { target: { value }})
//     expect(wrapper.state('name')).toBe(value)
// })
//
// test('should set description on input change', () => {
//     const value = 'New description'
//     const wrapper = shallow(<MealForm />)
//     wrapper.find('[name="description"]').simulate('change', { target: { value }})
//     expect(wrapper.state('description')).toBe(value)
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