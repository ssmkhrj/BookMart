import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import StarRating from "./StarRating";

const styles = {
  rowCell: {
    fontFamily: "'Source Sans Pro', sans-serif",
    padding: 0,
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "rgba(0,0,0,0.6)",
    // backgroundColor: (props) => (props.isEven ? "#eceff1" : "white"),
    "&:hover": {
      cursor: "pointer",
    },
  },
};

class BookRow extends Component {
  constructor() {
    super();
    this.handleCartClick = this.handleCartClick.bind(this);
    this.goToBook = this.goToBook.bind(this);
  }
  handleCartClick(event) {
    event.stopPropagation(); // For stopping the row click from trigerring
    this.props.changeQty(this.props.data.bookID, 1);
  }
  goToBook() {
    this.props.history.push(`/book/${this.props.data.bookID}`);
  }
  processData(data) {
    const processedTitle =
      data.title.length > 40 ? data.title.slice(0, 40) + "..." : data.title;
    const processedAuthors =
      data.authors.length > 20
        ? data.authors.slice(0, 20) + "..."
        : data.authors;
    return { ...data, title: processedTitle, authors: processedAuthors };
  }
  render() {
    const { data, columns, classes } = this.props;
    const processedData = this.processData(data);
    return (
      <TableRow hover onClick={this.goToBook}>
        {columns.map(
          (col, index) =>
            col.show && (
              <TableCell
                key={col.id}
                style={{
                  // backgroundColor: index % 2 === 0 ? "#eeeeee" : "#f5f5f5",
                  paddingRight: col.align === "right" ? 16 : 0,
                  paddingLeft: col.align === "left" ? 16 : 0,
                }}
                className={classes.rowCell}
                align={col.align}
              >
                {col.id === "average_rating" ? (
                  <StarRating val={processedData[col.id]} />
                ) : (
                  processedData[col.id]
                )}
              </TableCell>
            )
        )}
        <TableCell className={classes.rowCell} align="center">
          <IconButton aria-label="add-to-cart" onClick={this.handleCartClick}>
            <Badge badgeContent={processedData.qty} color="primary">
              <AddShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(BookRow);
