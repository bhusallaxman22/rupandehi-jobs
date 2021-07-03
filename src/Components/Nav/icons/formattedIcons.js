import React from "react";
import {
  Logo,
} from "../icons";
import IconClose from '@material-ui/icons/Close';
import MenuIcon from "@material-ui/icons/Menu"

const FormattedIcons = ({ name }) => {
  switch (name) {
    case "IconClose":
      return <IconClose />;


    case "IconHamburger":
      return <MenuIcon />;


    case "Logo":
      return <Logo name={name} />;

    default:
      return null;
  }
};

export default FormattedIcons;
