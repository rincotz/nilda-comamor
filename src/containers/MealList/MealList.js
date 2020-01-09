import React, { useState } from 'react'
import { connect } from 'react-redux'
import selectMeals from '../../selectors/selectMeals'
import MealCard from '../../components/Card/Card'
import { mealDefaultState } from '../../reducers/meals'

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function MealGridList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [mealShown, setMealShown] = useState(mealDefaultState)
    const onMealClick = (mealID) => {
        let clickedMeal = props.meals.filter(meal => meal.id === mealID)[0]
        setMealShown(clickedMeal)
        setOpen(true)
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Pratos Disponíveis</ListSubheader>
                </GridListTile>
                {props.meals.map(meal => (
                    <GridListTile key={meal.id}>
                        <img onClick={(e) => onMealClick(e.target.id)} src={meal.picture} alt={meal.name} id={meal.id} />
                        <GridListTileBar
                            title={meal.name}
                            subtitle={<span>feito por: {meal.chef.name}</span>}
                            actionIcon={
                                <IconButton aria-label={`preço de ${meal.name}`} className={classes.icon}>
                                    <span>${meal.price}</span>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
            <MealCard
                open={open}
                onClose={() => setOpen(false)}
                meal={mealShown}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    meals: selectMeals(state.meals)
})

export default connect(mapStateToProps)(MealGridList)

