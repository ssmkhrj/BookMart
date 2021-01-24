import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const styles = {
  qtyBtn: {
    "&:disabled": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRightColor: "transparent",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  delBtn: {
    marginRight: 5,
    outline: 0,
    backgroundColor: "white",
    borderRadius: "50%",
    border: "2px solid #ccc",
    color: "#ccc",
    fontFamily: "'Source Sans Pro', sans-serif",
    height: 24,
    width: 24,
    fontWeight: 700,
    "&:hover": {
      cursor: "pointer",
      color: "black",
      border: "2px solid black",
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

class Cart extends Component {
  goHome() {
    this.props.history.push("/");
  }
  render() {
    const { cart, changeQty, classes } = this.props;
    const totalPrice = cart.reduce(
      (total, book) => total + book.price * book.qty,
      0
    );
    return (
      <Container>
        <Grid container style={{ justifyContent: "space-between" }}>
          <Grid item xs={12} md={6} style={{ marginBottom: 80 }}>
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
                        <ButtonGroup
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            style={{
                              borderTopLeftRadius: "50%",
                              borderBottomLeftRadius: "50%",
                            }}
                            onClick={() => changeQty(c.bookID, -1)}
                          >
                            <ArrowDropDownIcon fontSize="small" />
                          </Button>
                          <Button disabled className={classes.qtyBtn}>
                            {c.qty}
                          </Button>
                          <Button
                            style={{
                              borderTopRightRadius: "50%",
                              borderBottomRightRadius: "50%",
                            }}
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
              style={{
                marginTop: 20,
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
              variant="contained"
              color="primary"
              onClick={() => this.goHome()}
            >
              CONTINUE SHOPPING
            </Button>
          </Grid>
          {/* Right Hand Side Table */}
          <Grid item xs={12} md={5} style={{ marginBottom: 80 }}>
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
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Cart);
