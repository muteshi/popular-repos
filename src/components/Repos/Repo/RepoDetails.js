import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "font-awesome/css/font-awesome.min.css";
import Bookmark from "./bookmark";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "60%",
    marginBottom: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RepoCardDetails(props) {
  const classes = useStyles();

  const repoId = props.match.params.repoId;

  const reposFromStorage = JSON.parse(localStorage.getItem("repos"));

  const repo = reposFromStorage.filter((r) => r.id === +repoId);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {repo[0].owner.login}
        </Typography>
        <Typography variant="h5" component="h2">
          {repo[0].title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {repo[0].numOfStars}
        </Typography>
        <Typography variant="body2" component="p">
          {repo[0].description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/repository/${+repoId}`}> Learn More</Link>
        </Button>
        <Bookmark
          onClick={(repo) => props.bookmark(repo)}
          isBookmarked={repo[0].isBookmarked}
        />
      </CardActions>
    </Card>
  );
}
