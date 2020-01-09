import React from 'react'
import { shallow } from 'enzyme/build'
import { AddPartnerPage } from "../../containers/AddPartnerPage/AddPartnerPage"
import partners from '../fixtures/partners'

let startAddPartner, history, wrapper

beforeEach(() => {
    startAddPartner = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddPartnerPage startAddPartner={startAddPartner} history={history} />)
})

test('should render AddPartnerPage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('PartnerForm').prop('onSubmit')(partners[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddPartner).toHaveBeenLastCalledWith(partners[1])
})