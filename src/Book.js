import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const styles = {
  rowCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "#777",
  },
  rowTitle: {
    fontWeight: 700,
  },
  qtyBtn: {
    "&:disabled": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRightColor: "transparent",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  btnGroup: {
    marginTop: 20,
  },
};

class Book extends Component {
  render() {
    const { book, columns, changeQty, classes } = this.props;
    return (
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {columns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell
                    className={`${classes.rowCell} ${classes.rowTitle}`}
                  >
                    {c.heading}
                  </TableCell>
                  <TableCell className={classes.rowCell}>
                    {book[c.id]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ButtonGroup
          className={classes.btnGroup}
          size="small"
          aria-label="small outlined button group"
        >
          <Button
            className={classes.decreBtn}
            onClick={() => changeQty(book.bookID, -1)}
            disabled={book.qty <= 0}
          >
            <ArrowDropDownIcon fontSize="small" />
          </Button>
          <Button disabled className={classes.qtyBtn}>
            {book.qty}
          </Button>
          <Button
            className={classes.increBtn}
            onClick={() => changeQty(book.bookID, 1)}
          >
            <ArrowDropUpIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Container>
    );
  }
}

export default withStyles(styles)(Book);
