import mealsReducer from '../../reducers/meals'
import meals from '../fixtures/meals'
import {ADD_MEAL, EDIT_MEAL, REMOVE_MEAL, SET_MEALS} from "../../actions/constants";

test('should set default state', () => {
    const state = mealsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove meal by id', () => {
    const action = {
        type: REMOVE_MEAL,
        id: meals[1].id
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual([meals[0], meals[2]])
})

test('should not remove meal if id is not found', () => {
    const action = {
        type: REMOVE_MEAL,
        id: '-1'
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual(meals)
})

test('should add a meal', () => {
    const action = {
        type: ADD_MEAL,
        meal: {
            ...meals[0]
        }
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual([...meals, meals[0]])
})

test('should edit a meal', () => {
    const action = {
        type: EDIT_MEAL,
        id: '1',
        updates: { description: 'arroz, feijões e filé de frango com salada' }
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual([{
        ...meals[0],
        description: 'arroz, feijões e filé de frango com salada'
    },
        meals[1],
        meals[2]
    ])
})

test('should not edit expense if expense not found', () => {
    const action = {
        type: EDIT_MEAL,
        id: '-1',
        updates: { description: 'new description' }
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual(meals)
})

test('should setup set meals action object with data', () => {
    const action = {
        type: SET_MEALS,
        meals: [meals[1]]
    }
    const state = mealsReducer(meals, action)
    expect(state).toEqual([meals[1]])
})