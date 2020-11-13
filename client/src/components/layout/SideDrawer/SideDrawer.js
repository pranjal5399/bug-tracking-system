import React from "react";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const DarwerItem = () => {
  const history = useHistory();
  const projects = () => {
    history.push("/projects");
  };
  const users = () => {
    console.log("Users");
  };
  return (
    <List>
      <ListItem button key="1" onClick={projects}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button key="2" onClick={users}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button key="3" onClick={users}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Tickets" />
      </ListItem>
    </List>
  );
};

const SideDrawer = (props) => {
  return (
    <Drawer
      className={props.classApplied}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={props.styles}
    >
      <div className={props.divStyle}>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <DarwerItem />
    </Drawer>
  );
};

export default SideDrawer;
