import React, { Component } from "react";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import cartLogo from "./cart.svg";
import emptyCartLogo from "./empty_cart.svg";

const styles = {
  root: {
    marginTop: 100,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: "#666",
  },
  returnBtn: {
    marginTop: 20,
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "white",
    background: "#5986e6",
    "&:hover": {
      background: "#5986e699",
    },
  },
};

class Cart extends Component {
  constructor() {
    super();
    this.goHome = this.goHome.bind(this);
  }
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
      <Container className={classes.root}>
        {cart.length > 0 ? (
          <Grid container style={{ justifyContent: "space-between" }}>
            <Grid item xs={12} md={6} style={{ marginBottom: 80 }}>
              <CartItems
                cart={cart}
                changeQty={changeQty}
                goHome={this.goHome}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 80 }}>
              <CartTotal totalPrice={totalPrice} />
            </Grid>
            <img
              src={cartLogo}
              alt="cart-illustration"
              style={{
                position: "absolute",
                opacity: 0.3,
                height: 300,
                bottom: 30,
                right: 50,
                zIndex: -1,
              }}
            />
          </Grid>
        ) : (
          <div className={classes.container}>
            <div className={classes.message}>Your cart is currently empty</div>
            <Button
              className={classes.returnBtn}
              variant="contained"
              onClick={this.goHome}
            >
              RETURN TO SHOP
            </Button>
            <img
              src={emptyCartLogo}
              alt="empty-cart-illustration"
              style={{
                position: "absolute",
                opacity: 0.3,
                height: 350,
                bottom: 30,
                right: 0,
                zIndex: -1,
              }}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Cart);
