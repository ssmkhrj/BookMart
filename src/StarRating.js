import React, { Component } from "react";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { withStyles } from "@material-ui/styles";

const styles = {
  star: {
    width: 18,
    height: 18,
    color: "rgba(0, 0, 0, 0.5)",
  },
};

class StarRating extends Component {
  render() {
    const { val, classes } = this.props;
    const integer = Math.floor(val);
    const isHalf = val % 1 >= 0.5;
    const remaining = (isHalf ? 4 : 5) - integer;
    return (
      <div>
        {Array.from({ length: val }).map((_, index) => (
          <StarRoundedIcon
            className={classes.star}
            key={index}
          ></StarRoundedIcon>
        ))}
        {isHalf && (
          <StarHalfRoundedIcon className={classes.star}></StarHalfRoundedIcon>
        )}
        {Array.from({ length: remaining }).map((_, index) => (
          <StarBorderRoundedIcon
            key={index}
            className={classes.star}
          ></StarBorderRoundedIcon>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(StarRating);
