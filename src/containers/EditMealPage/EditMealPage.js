import React from 'react';
import MealForm from "../MealForm/MealForm";
import { startEditMeal, startRemoveMeal } from "../../actions/meals";
import { connect } from "react-redux";

export class EditMealPage extends React.Component {
    onSubmit = (meal) => {
        this.props.startEditMeal(this.props.meal.id, meal)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.startRemoveMeal({ id: this.props.meal.id })
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <MealForm
                    onSubmit={this.onSubmit}
                    meal={this.props.meal}
                />
                <button
                    onClick={this.onRemove}
                >
                    Remover
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    meal: state.meals.find((meal) => meal.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditMeal: (id, meal) => dispatch(startEditMeal(id, meal)),
    startRemoveMeal: (data) => dispatch(startRemoveMeal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditMealPage)