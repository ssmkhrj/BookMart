import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    marginTop: 50,
  },
  rowCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "#777",
  },
  rowTitle: {
    fontWeight: 700,
  },
  qtyBtn: {
    textTransform: "capitalize",
    "&:disabled": {
      border: "1px solid #5986e677",
      borderRightColor: "transparent",
      color: "#5986e6",
      fontWeight: 600,
    },
  },
  increBtn: {
    border: "1px solid #5986e677",
    color: "#5986e6",
    "&:hover": {
      background: "#5986e622",
    },
  },
  decreBtn: {
    border: "1px solid #5986e677",
    color: "#5986e6",
    "&:hover": {
      background: "#5986e622",
    },
    "&:disabled": {
      border: "1px solid #5986e633",
      borderRightColor: "transparent",
      color: "#5986e633",
      fontWeight: 600,
    },
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backBtn: {
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "white",
    background: "#5986e6",
    "&:hover": {
      background: "#5986e699",
    },
  },
};

class Book extends Component {
  goBack() {
    this.props.history.push("/");
  }
  render() {
    const { book, columns, changeQty, classes } = this.props;
    return (
      <>
        {book !== undefined && (
          <Container className={classes.root}>
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
            <div className={classes.btnContainer}>
              <ButtonGroup
                className={classes.btnGroup}
                size="small"
                aria-label="change-quantity-button"
              >
                <Button
                  className={classes.decreBtn}
                  onClick={() => changeQty(book.bookID, -1)}
                  disabled={book.qty <= 0}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </Button>
                <Button disabled className={classes.qtyBtn}>
                  Quantity: {book.qty}
                </Button>
                <Button
                  className={classes.increBtn}
                  onClick={() => changeQty(book.bookID, 1)}
                >
                  <ArrowDropUpIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              <Button
                variant="contained"
                className={classes.backBtn}
                onClick={() => this.goBack()}
              >
                Back
              </Button>
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default withStyles(styles)(Book);
