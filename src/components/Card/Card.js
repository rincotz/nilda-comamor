import React from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Kitchen from '@material-ui/icons/Kitchen'
import RoomService from '@material-ui/icons/RoomService'
import Motorcycle from '@material-ui/icons/Motorcycle'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import AirlineSeatReclineNormal from '@material-ui/icons/AirlineSeatReclineNormal'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export default function MealCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="chef" className={classes.avatar} src={props.meal.chef.picture} />
                    }
                    title={props.meal.name}
                    subheader={`por ${props.meal.chef.name}`}
                />
                <CardMedia
                    className={classes.media}
                    image={props.meal.picture}
                />
                <CardContent>
                    <Typography paragraph>R$ {props.meal.price}</Typography>
                    { props.meal.frozen ? <Kitchen /> : <RoomService /> }
                    {
                        props.meal.courrier &&
                        <Typography variant="body2" color="textSecondary" component="p">
                            `{<Motorcycle />}{moment(props.meal.courrierStart).format('H:mm')}-{moment(props.meal.courrierEnd).format('H:mm')}`
                        </Typography>
                    }
                    {
                        props.meal.pickUp &&
                        <Typography variant="body2" color="textSecondary" component="p">
                            `{<ShoppingBasket />} {moment(props.meal.pickUpStart).format('H:mm')}-{moment(props.meal.pickUpEnd).format('H:mm')}`
                        </Typography>
                    }
                    {
                        props.meal.table &&
                        <Typography variant="body2" color="textSecondary" component="p">
                            `{<AirlineSeatReclineNormal />} {moment(props.meal.tableStart).format('H:mm')}-{moment(props.meal.tableEnd).format('H:mm')}`
                        </Typography>
                    }
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.meal.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="mostrar mais"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton aria-label="comprar">
                        <ShoppingCartIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Sobre o cozinheiro:</Typography>
                        <Typography paragraph>
                            {props.meal.chef.bio}
                        </Typography>
                        <Typography paragraph>
                            {props.meal.chef.ratings}
                        </Typography>
                        <Typography paragraph>
                            {props.meal.chef.ratings}
                        </Typography>
                        <Typography>
                            {props.meal.chef.ratings}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Dialog>
    );
}