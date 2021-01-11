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

export default function RepoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.owner}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.numOfStars + " stars"}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/repository/${props.repoId}`}> Learn More</Link>
        </Button>
        <Bookmark
          onClick={(repo) => props.bookmark(repo)}
          isBookmarked={props.isBookmarked}
        />
      </CardActions>
    </Card>
  );
}
