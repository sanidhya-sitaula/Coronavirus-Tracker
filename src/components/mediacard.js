import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles"


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height : 420
  },
  media: {
    height: 140,
  },
  link : {
      color : 'black'
  }
});

export default function MediaCard(props) {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image= {props.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <a className = {classes.link} href = {props.link}>{props.title}</a>
            </Typography>
            <Typography variant = "caption" display = "block" gutterBottom>
                {props.published.substring(0, 10)} at {props.published.substring(11, 16)} UTC.
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.content}
            </Typography>
          </CardContent>
        </CardActionArea>
       
      </Card>
    );
  }