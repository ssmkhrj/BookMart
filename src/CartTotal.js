import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/styles";

const styles = {
  headerCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    textTransform: "uppercase",
    padding: 0,
    paddingBottom: 5,
    color: "#777",
    fontWeight: 700,
    borderBottom: "3px solid rgba(224, 224, 224, 1)",
  },
  rowCellRight: {
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  boldText: {
    fontWeight: 700,
  },
  greyText: {
    color: "#777",
  },
  mutedText: {
    fontStyle: "italic",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
};

class CartTotal extends Component {
  render() {
    const { totalPrice, classes } = this.props;
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.headerCell}>
                Cart Totals
              </TableCell>
              <TableCell className={classes.headerCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                className={`${classes.rowCellRight} ${classes.greyText}`}
                align="left"
              >
                Subtotal
              </TableCell>
              <TableCell
                className={`${classes.rowCellRight} ${classes.boldText}`}
                align="right"
              >
                ₹{totalPrice}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={`${classes.rowCellRight} ${classes.greyText}`}
                align="left"
              >
                Shipping
              </TableCell>
              <TableCell
                className={`${classes.rowCellRight} ${classes.greyText}`}
                align="right"
              >
                <div>₹{totalPrice > 2500 ? 0 : 100}</div>
                <div className={classes.mutedText}>
                  Free Shipping for orders above ₹2500
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={`${classes.rowCellRight} ${classes.greyText}`}
                align="left"
              >
                Total
              </TableCell>
              <TableCell
                className={`${classes.rowCellRight} ${classes.boldText}`}
                align="right"
              >
                ₹{totalPrice > 2500 ? totalPrice : totalPrice + 100}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(CartTotal);
