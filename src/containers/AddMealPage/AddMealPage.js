import React from 'react';
import { connect } from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'
import MealForm from "../MealForm/MealForm";
import { startAddMeal } from "../../actions/meals";
import selectMeals from '../../selectors/selectMeals'

export class AddMealPage extends React.Component {
    onSubmit = (meal) => {
        this.props.startAddMeal(meal)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <FormLabel component='legend'>Cadastre seu prato:</FormLabel>
                <MealForm
                    onSubmit={this.onSubmit}
                    partner={this.props.partner}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    partner: state.partner
})

const mapDispatchToProps = (dispatch) => ({
    startAddMeal: (meal) => dispatch(startAddMeal(meal))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMealPage)
