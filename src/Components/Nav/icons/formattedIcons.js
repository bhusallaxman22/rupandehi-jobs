import React from "react";
import {
  BgIntroDesktop,
  BgIntroMobile,
  Logo,
} from "../icons";
import IconClose from '@material-ui/icons/Close';
import MenuIcon from "@material-ui/icons/Menu"

const FormattedIcons = ({ name }) => {
  switch (name) {
    // case "BgIntroDesktop":
    //   return <BgIntroDesktop />;

    // case "BgIntroMobile":
    //   return <BgIntroMobile />;


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
