import React, { Fragment } from 'react';
import { Link } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    title: {
    }
});

const ProductCard = ({ title, image }) => {
    const classes = useStyles();

    return (
        <Card className={ classes.root }>
            <CardMedia
                className={ classes.media }
                image={ image }
                title={ title }
            />
            <CardContent>
                <Typography className={ 'title' } gutterBottom variant={ 'h5' } component={ 'h4' }>
                    { title }
                </Typography>
                <Typography variant={ 'body2' } color={ 'textSecondary' } component={ 'p' }>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa dolorum sit saepe accusamus magnam rem doloribus provident in est quae. Nobis, non pariatur. Dolor illo necessitatibus accusantium itaque quidem sapiente.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size={ 'small' } color={ 'primary' }>
                    Share
                </Button>
                <Button size={ 'small' } color={ 'primary' }>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
