import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/styles";

const styles = {
  title: {
    fontFamily: '"Source Sans Pro", sans-serif',
    color: "#666",
  },
  formField: {
    "& span": {
      fontFamily: '"Source Sans Pro", sans-serif',
      color: "#555",
    },
    "& svg": {
      color: "#5986e6",
    },
  },
  formLabel: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: "0.8rem",
    color: "#777",
  },
  doneBtn: {
    color: "#5986e6",
    "&:hover": {
      background: "#5986e622",
    },
  },
};

class Settings extends Component {
  handleChange = (event) => {
    this.props.filterColumns(event.target.name);
  };
  render() {
    const { columns, isOpen, closeDialog, classes } = this.props;
    return (
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle className={classes.title}>Settings</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel className={classes.formLabel}>
              Select the columns you wish to see
            </FormLabel>
            <FormGroup>
              {columns.map(
                (col) =>
                  col.inSettings && (
                    <FormControlLabel
                      key={col.id}
                      control={
                        <Checkbox
                          checked={col.show}
                          name={col.id}
                          onChange={this.handleChange}
                        />
                      }
                      className={classes.formField}
                      label={col.heading}
                    />
                  )
              )}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className={classes.doneBtn} onClick={closeDialog}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Settings);
