import React from 'react'
import { shallow } from 'enzyme/build'
import { AddMealPage } from "../../containers/AddMealPage/AddMealPage";
import meals from '../fixtures/meals'

let startAddMeal, history, wrapper

beforeEach(() => {
    startAddMeal = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddMealPage startAddMeal={startAddMeal} history={history} />)
})

test('should render AddPartnerPage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('MealForm').prop('onSubmit')(meals[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddMeal).toHaveBeenLastCalledWith(meals[1])
})