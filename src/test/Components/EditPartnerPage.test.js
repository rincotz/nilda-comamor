import React from 'react'
import { shallow } from 'enzyme'
import { EditPartnerPage } from "../../containers/EditPartnerPage/EditPartnerPage"
import partners from '../fixtures/partners'

let editPartner, removePartner, history, wrapper

beforeEach(() => {
    editPartner = jest.fn()
    removePartner = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditPartnerPage
            partner={partners[2]}
            editPartner={editPartner}
            removePartner={removePartner}
            history={history}
        />
    )
})

test('should render EditPartnerPage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

// test('should handle editing partner', () => {
//     wrapper.find('PartnerForm').prop('onSubmit')(partners[2])
//     expect(history.push).toHaveBeenLastCalledWith('/')
//     expect(editPartner).toHaveBeenLastCalledWith(partners[2].id, partners[2])
// })
//
// test('should handle delete expense', () => {
//     wrapper.find('button').simulate('click')
//     expect(history.push).toHaveBeenLastCalledWith('/')
//     expect(removePartner).toHaveBeenLastCalledWith({ id: partners[2].id })
// })