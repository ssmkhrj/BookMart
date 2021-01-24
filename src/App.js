import React, { Component } from "react";
import BookList from "./BookList";
import { withStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Book from "./Book";

const styles = {
  root: {
    minHeight: "100vh",
    position: "relative",
    "& h1": {
      margin: 0,
      color: "#2510d7",
      fontSize: "1.5rem",
    },
  },
  footer: {
    fontFamily: '"Source Sans Pro", sans-serif',
    background: "whitesmoke",
    textAlign: "center",
    padding: "5px 0",
    fontSize: "0.8rem",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      sortRow: "",
      sortDir: "asc",
      isLoading: true,
      columns: [
        {
          id: "bookID",
          heading: "Book ID",
          align: "center",
          show: true,
          toSort: false,
          colWidth: 75,
          inSettings: false,
        },
        {
          id: "title",
          heading: "Title",
          align: "left",
          show: true,
          toSort: false,
          colWidth: 350,
          inSettings: false,
        },
        {
          id: "authors",
          heading: "Authors",
          align: "left",
          show: true,
          toSort: true,
          colWidth: 220,
          inSettings: true,
        },
        {
          id: "average_rating",
          heading: "Rating",
          align: "left",
          show: true,
          toSort: true,
          colWidth: 140,
          inSettings: true,
        },
        {
          id: "isbn",
          heading: "ISBN",
          align: "center",
          show: false,
          toSort: false,
          colWidth: 120,
          inSettings: true,
        },
        {
          id: "language_code",
          heading: "Language Code",
          align: "center",
          show: false,
          toSort: false,
          colWidth: 150,
          inSettings: true,
        },
        {
          id: "ratings_count",
          heading: "Ratings Count",
          align: "right",
          show: false,
          toSort: true,
          colWidth: 140,
          inSettings: true,
        },
        {
          id: "price",
          heading: "Price",
          align: "right",
          show: true,
          toSort: true,
          colWidth: 90,
          inSettings: false,
        },
      ],
    };
    this.sortData = this.sortData.bind(this);
    this.filterColumns = this.filterColumns.bind(this);
    this.changeQty = this.changeQty.bind(this);
  }
  sortData(row) {
    this.setState((currSt) => ({
      sortRow: row,
      sortDir:
        currSt.sortRow === row && currSt.sortDir === "asc" ? "desc" : "asc",
      books: [...currSt.books].sort((a, b) =>
        currSt.sortRow === row && currSt.sortDir === "asc"
          ? b[row] < a[row]
            ? -1
            : b[row] > a[row]
            ? 1
            : 0
          : a[row] < b[row]
          ? -1
          : a[row] > b[row]
          ? 1
          : 0
      ),
      // books: [...currSt.books].sort(),
    }));
  }
  async componentDidMount() {
    const res = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
    );
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i]["ratings_count"] !== "number") {
        data[i]["ratings_count"] = 0;
      }
      if (typeof data[i]["average_rating"] !== "number") {
        data[i]["average_rating"] = 0;
      }
      data[i]["qty"] = 0;
    }
    this.setState({
      books: data,
      isLoading: false,
    });
  }
  filterColumns(colId) {
    this.setState((currSt) => ({
      columns: currSt.columns.map((col) =>
        col.id === colId ? { ...col, show: !col.show } : col
      ),
    }));
  }
  changeQty(bookID, delta) {
    this.setState((currSt) => ({
      books: currSt.books.map((b) =>
        b.bookID === bookID ? { ...b, qty: b.qty + delta } : b
      ),
    }));
  }
  render() {
    const { classes } = this.props;
    const { books, columns, sortRow, sortDir, isLoading } = this.state;
    return (
      <div className={classes.root}>
        <Route
          path="/"
          render={(routeProps) => (
            <Navbar
              columns={columns}
              cart={books.filter((b) => b.qty > 0)}
              filterColumns={this.filterColumns}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <BookList
              books={books}
              columns={columns}
              sortRow={sortRow}
              sortDir={sortDir}
              sortData={this.sortData}
              changeQty={this.changeQty}
              isLoading={isLoading}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/cart"
          render={(routeProps) => (
            <Cart
              cart={books.filter((b) => b.qty > 0)}
              changeQty={this.changeQty}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/book/:bookID"
          render={(routeProps) => (
            <Book
              book={
                books.filter(
                  (b) => b.bookID === Number(routeProps.match.params.bookID)
                )[0]
              }
              columns={columns}
              changeQty={this.changeQty}
              {...routeProps}
            />
          )}
        />
        <footer className={classes.footer}>Copyright 2021 © BookMart</footer>
      </div>
    );
  }
}

export default withStyles(styles)(App);
