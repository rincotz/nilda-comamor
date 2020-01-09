import selectMeals from '../../selectors/selectMeals'
import meals from '../fixtures/meals'

test('should filter by distance', () => {
    const result = selectMeals(meals)
    expect(result).toEqual([meals[0], meals[1], meals[2]])
})