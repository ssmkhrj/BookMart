import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";

const styles = {
  qtyBtn: {
    "&:disabled": {
      //   border: "1px solid rgba(0, 0, 0, 0.23)",
      border: "1px solid #5986e677",
      borderRightColor: "transparent",
      //   color: "rgba(0, 0, 0, 0.87)",
      color: "#5986e6",
      fontWeight: 600,
    },
  },
  increBtn: {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    border: "1px solid #5986e677",
    color: "#5986e6",
    "&:hover": {
      background: "#5986e622",
    },
  },
  decreBtn: {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    border: "1px solid #5986e677",
    color: "#5986e6",
    "&:hover": {
      background: "#5986e622",
    },
  },
  delBtn: {
    marginRight: 5,
    outline: 0,
    backgroundColor: "transparent",
    borderRadius: "50%",
    border: "2px solid #5986e677",
    color: "#5986e677",
    fontFamily: "'Source Sans Pro', sans-serif",
    height: 24,
    width: 24,
    fontWeight: 700,
    "&:hover": {
      cursor: "pointer",
      color: "#5986e6",
      border: "2px solid #5986e6",
    },
  },
  headerCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    textTransform: "uppercase",
    padding: 0,
    paddingBottom: 5,
    color: "#777",
    fontWeight: 700,
    borderBottom: "3px solid rgba(224, 224, 224, 1)",
  },
  rowCell: {
    padding: "20px 10px",
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  contdShopBtn: {
    marginTop: 20,
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "white",
    background: "#5986e6",
    "&:hover": {
      background: "#5986e699",
    },
  },
};

class CartItems extends Component {
  render() {
    const { cart, changeQty, goHome, classes } = this.props;
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  colSpan={2}
                  className={classes.headerCell}
                >
                  Product
                </TableCell>
                <TableCell
                  style={{ width: 50 }}
                  align="left"
                  className={classes.headerCell}
                >
                  Price
                </TableCell>
                <TableCell align="center" className={classes.headerCell}>
                  Quantity
                </TableCell>
                <TableCell align="right" className={classes.headerCell}>
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((c) => (
                <TableRow key={c.bookID}>
                  <TableCell
                    className={classes.rowCell}
                    style={{ padding: "20px 0" }}
                    align="left"
                  >
                    <button
                      className={classes.delBtn}
                      onClick={() => changeQty(c.bookID, -c.qty)}
                    >
                      ×
                    </button>
                  </TableCell>
                  <TableCell
                    style={{ paddingLeft: 0 }}
                    className={classes.rowCell}
                    align="left"
                  >
                    {c.title}
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: 700 }}
                    className={classes.rowCell}
                    align="left"
                  >
                    ₹{c.price}
                  </TableCell>
                  <TableCell className={classes.rowCell} align="center">
                    <ButtonGroup size="small" aria-label="update-quantity">
                      <Button
                        className={classes.decreBtn}
                        onClick={() => changeQty(c.bookID, -1)}
                      >
                        <ArrowDropDownIcon fontSize="small" />
                      </Button>
                      <Button disabled className={classes.qtyBtn}>
                        {c.qty}
                      </Button>
                      <Button
                        className={classes.increBtn}
                        onClick={() => changeQty(c.bookID, 1)}
                      >
                        <ArrowDropUpIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: 700, paddingRight: 0 }}
                    className={classes.rowCell}
                    align="right"
                  >
                    ₹{c.price * c.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          className={classes.contdShopBtn}
          variant="contained"
          onClick={goHome}
        >
          CONTINUE SHOPPING
        </Button>
      </>
    );
  }
}

export default withStyles(styles)(CartItems);
