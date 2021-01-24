import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import BookRow from "./BookRow";
import readBookLogo from "./readBook.svg";

const styles = {
  root: {
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "inline-block",
    maxWidth: "90%",
    margin: "0 auto",
  },
  bookTable: {
    width: (props) =>
      props.columns.reduce(
        (total, col) => total + (col.show ? col.colWidth : 0),
        0
      ) + 90,
  },
  headerCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    padding: 0,
    paddingBottom: 10,
    fontWeight: 600,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    "& span": {
      backgroundColor: "#6295ff22",
      margin: "0 3px",
      display: "flex",
      alignItems: "center",
      height: 40,
      borderRadius: 5,
    },
  },
  tableFooter: {
    "& p": {
      fontFamily: "'Source Sans Pro', sans-serif",
      color: "rgba(0,0,0,0.7)",
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    "& button": {
      color: "rgba(0,0,0,0.7)",
    },
  },
  bookID: {
    width: (props) => props.columns[0].colWidth,
    "& span": {
      marginLeft: 0,
      justifyContent: "center",
    },
  },
  title: {
    width: (props) => props.columns[1].colWidth,
    "& span": {
      paddingLeft: 13,
    },
  },
  authors: {
    width: (props) => props.columns[2].colWidth,
    "& span": {
      paddingLeft: 13,
    },
  },
  average_rating: {
    width: (props) => props.columns[3].colWidth,
    "& span": {
      paddingLeft: 13,
    },
  },
  isbn: {
    width: (props) => props.columns[4].colWidth,
    "& span": {
      justifyContent: "center",
    },
  },
  language_code: {
    width: (props) => props.columns[5].colWidth,
    "& span": {
      justifyContent: "center",
    },
  },
  ratings_count: {
    width: (props) => props.columns[6].colWidth,
    "& span": {
      paddingRight: 13,
    },
  },
  price: {
    width: (props) => props.columns[7].colWidth,
    "& span": {
      paddingRight: 13,
    },
  },
  cart: {
    width: 80,
    "& span": {
      marginRight: 0,
    },
  },
  search: {
    marginBottom: 20,
    "& input": {
      fontSize: "0.8rem",
    },
  },
};

class BookList extends Component {
  static defaultProps = {
    rowsPerPage: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      searchText: "",
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleChangePage(e, p) {
    this.setState({ page: p });
  }
  handleSort(name) {
    this.setState(
      {
        page: 0,
      },
      () => {
        this.props.sortData(name);
      }
    );
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      page: 0,
    });
  }
  showSkeleton() {
    return (
      <>
        {Array.from({ length: 10 }, (r, i) => (
          <TableRow key={i}>
            {Array.from({ length: 6 }, (c, j) => (
              <TableCell key={6 * i + j}>
                <Skeleton variant="rect" height={11} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }
  render() {
    const {
      books,
      columns,
      rowsPerPage,
      sortRow,
      sortDir,
      changeQty,
      history,
      isLoading,
      classes,
    } = this.props;
    const { page, searchText } = this.state;
    const searchedBooks = books.filter((b) =>
      String(b.title).toLowerCase().includes(searchText.toLowerCase())
    );
    // Had to coerce data into string because some titles were numbers
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <img
            src={readBookLogo}
            alt=" "
            style={{
              position: "absolute",
              opacity: 0.3,
              height: 250,
              bottom: 0,
              right: 0,
              zIndex: -1,
            }}
          />
          <TextField
            placeholder="Search Books"
            name="searchText"
            value={searchText}
            onChange={this.handleInputChange}
            className={classes.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    style={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.6)" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <TableContainer>
            <Table className={classes.bookTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map(
                    (col) =>
                      col.show && (
                        <TableCell
                          key={col.id}
                          className={`${classes.headerCell} ${classes[col.id]}`}
                          align={col.align}
                        >
                          {!col.toSort ? (
                            <span>{col.heading}</span>
                          ) : (
                            <TableSortLabel
                              active={sortRow === col.id}
                              direction={sortRow === col.id ? sortDir : "asc"}
                              onClick={() => this.handleSort(col.id)}
                            >
                              {col.heading}
                            </TableSortLabel>
                          )}
                        </TableCell>
                      )
                  )}
                  <TableCell
                    className={`${classes.headerCell} ${classes.cart}`}
                  >
                    <span style={{ justifyContent: "center" }}>Cart</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? this.showSkeleton()
                  : searchedBooks
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((book, index) => (
                        <BookRow
                          key={book.bookID}
                          data={book}
                          columns={columns}
                          isEven={index % 2 === 0}
                          changeQty={changeQty}
                          history={history}
                        />
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className={classes.tableFooter}
            rowsPerPageOptions={[]}
            component="div"
            count={searchedBooks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BookList);
