import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddPartner, addPartner, editPartner, removePartner } from "../../actions/partners"
import { ADD_PARTNER, EDIT_PARTNER, REMOVE_PARTNER } from "../../actions/constants";
import partners from '../fixtures/partners'
import db from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('should setup add partner action object with provided values', () => {
    const action = addPartner(partners[0])
    expect(action).toEqual({
        type: ADD_PARTNER,
        partner: {
            uid: expect.any(String),
            ...partners[0]
        }
    })
})

test('should add partner to database and store', (done) => {
    const store = createMockStore({})
    const partnerData = {
        id: '355.935.868-02',
        name: 'Luís Felipe',
        gender: 'male',
        birth: 0,
        email: 'lfspinola@hotmail.com',
        phone: '11992893976',
        bio: 'estudante de engenharia de software',
        nationality: 'brasileira',
        addressLine1: 'rua orides gemente',
        addressLine2: '',
        number: 650,
        neighborhood: 'jardim oriental',
        zip: '18120-000',
        picture: ''
    }
    store.dispatch(startAddPartner(partnerData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: ADD_PARTNER,
            partner: {
                uid: expect.any(String),
                ...partnerData
            }
        })
        db.collection('partners').doc(actions[0].partner.uid).get().then((doc) => {
            expect(doc.data()).toEqual(partnerData)
            done()
        })
    })
})

test('should setup edit partner action object', () => {
    const action = editPartner('123abc', {bio: 'empresário brasileiro'})
    expect(action).toEqual({
        type: EDIT_PARTNER,
        uid: '123abc',
        updates: {
            bio: 'empresário brasileiro'
        }
    })
})

test('should setup remove partner action object', () => {
    const action = removePartner({ uid: '456def' })
    expect(action).toEqual({
        type: REMOVE_PARTNER,
        uid: '456def'
    })
})