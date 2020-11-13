import React from "react";
import clsx from "clsx";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthOptions from "../../auth/AuthOptions/AuthOptions";
import useStyles from "./styles";
import SideDrawer from "../SideDrawer/SideDrawer";

const Navbar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            BUG TRACKER APPLICATION
          </Typography>

          <AuthOptions />
        </Toolbar>
        <SideDrawer
          divStyle={classes.drawerHeader}
          open={open}
          classApplied={classes.drawer}
          styles={{
            paper: classes.drawerPaper,
          }}
          handleDrawerClose={handleDrawerClose}
        />
      </AppBar>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default Navbar;
