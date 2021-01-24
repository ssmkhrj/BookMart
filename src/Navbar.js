import React, { Component } from "react";
import Settings from "./Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CollectionsBookmarkTwoToneIcon from "@material-ui/icons/CollectionsBookmarkTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    marginBottom: 100,
  },
  navbar: {
    background: "whitesmoke",
    justifyContent: "space-between",
  },
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isSettingsOpen: false,
    };
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.goHome = this.goHome.bind(this);
  }
  handleSettingsClick() {
    this.setState((currSt) => ({
      isSettingsOpen: !currSt.isSettingsOpen,
    }));
  }
  handleCartClick() {
    this.props.history.push("/cart");
  }
  goHome() {
    this.props.history.push("/");
  }
  render() {
    const { columns, filterColumns, location, cart, classes } = this.props;
    const { isSettingsOpen } = this.state;
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.navbar}>
          <Button onClick={this.goHome}>
            B<CollectionsBookmarkTwoToneIcon />
            OK
          </Button>
          <div>
            {location.pathname === "/" && (
              <Tooltip title="Settings">
                <IconButton
                  aria-label="settings"
                  onClick={this.handleSettingsClick}
                >
                  <SettingsTwoToneIcon />
                </IconButton>
              </Tooltip>
            )}
            <Settings
              columns={columns}
              filterColumns={filterColumns}
              isOpen={isSettingsOpen}
              closeDialog={this.handleSettingsClick}
            />
            <Tooltip title="Shopping Cart">
              <IconButton
                aria-label="shopping cart"
                onClick={this.handleCartClick}
              >
                <Badge
                  badgeContent={cart.reduce((total, c) => total + c.qty, 0)}
                  color="primary"
                >
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
