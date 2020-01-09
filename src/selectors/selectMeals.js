// Get nearest meals

export default (meals) => {
    return meals.sort((a, b) => {
        return a.location > b.location ? 1 : -1
    })
}