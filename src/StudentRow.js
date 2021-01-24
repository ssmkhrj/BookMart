import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  rowCell: {
    padding: 0,
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
  },
  avatar: {
    width: 30,
    height: 30,
    margin: "auto",
    fontWeight: "normal",
    fontSize: "1rem",
  },
};

class StudentRow extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck() {
    this.setState((currSt) => ({
      selected: !currSt.selected,
    }));
  }
  render() {
    const { data, classes } = this.props;
    const { selected } = this.state;
    return (
      <TableRow
        hover
        key={data.name}
        className={classes.row}
        onClick={this.handleCheck}
      >
        <TableCell className={classes.rowCell} align="center">
          <Checkbox
            checked={selected}
            style={{ color: "#2510d7" }}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </TableCell>
        <TableCell className={classes.rowCell} style={{ paddingLeft: 16 }}>
          {data.name}
        </TableCell>
        <TableCell className={classes.rowCell}>
          <Avatar variant="rounded" className={classes.avatar}>
            {data.name[0]}
          </Avatar>
        </TableCell>
        <TableCell
          className={classes.rowCell}
          align="right"
          style={{ paddingRight: 16 }}
        >
          {data.gender}
        </TableCell>
        <TableCell
          className={classes.rowCell}
          align="right"
          style={{ paddingRight: 16 }}
        >
          {data.age}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(StudentRow);
