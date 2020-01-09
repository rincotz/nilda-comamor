import partnersReducer from '../../reducers/partners'
import partners from '../fixtures/partners'
import { ADD_PARTNER, EDIT_PARTNER, REMOVE_PARTNER } from "../../actions/constants";

test('should set default state', () => {
    const state = partnersReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove partner by uid', () => {
    const action = {
        type: REMOVE_PARTNER,
        uid: partners[2].uid
    }
    const state = partnersReducer(partners, action)
    expect(state).toEqual([partners[0], partners[1]])
})

test('should not remove if uid is not found', () => {
    const action = {
        type: REMOVE_PARTNER,
        id: '-1'
    }
    const state = partnersReducer(partners, action)
    expect(state).toEqual(partners)
})

test('should add partner', () => {
    const action = {
        type: ADD_PARTNER,
        partner: { ...partners[0] }
    }
    const state = partnersReducer(undefined, action)
    expect(state).toEqual([partners[0]])
})

test('should edit a partner', () => {
    const action = {
        type: EDIT_PARTNER,
        uid: '1',
        updates: { bio: 'Empresário Brasileiro' }
    }
    const state = partnersReducer(partners, action)
    expect(state).toEqual([{
            ...partners[0],
            bio: 'Empresário Brasileiro'
        },
        partners[1],
        partners[2]
    ])
})

test('should not edit partner if partner not found', () => {
    const action = {
        type: EDIT_PARTNER,
        uid: '-1',
        updates: { bio: 'new bio' }
    }
    const state = partnersReducer(partners, action)
    expect(state).toEqual(partners)
})