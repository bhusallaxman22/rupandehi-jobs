import React from "react";
import {
  BgIntroDesktop,
  BgIntroMobile,
  IconClose,
  IconHamburger,
  Logo,
} from "../icons";

const FormattedIcons = ({ name }) => {
  switch (name) {
    case "BgIntroDesktop":
      return <BgIntroDesktop />;

    case "BgIntroMobile":
      return <BgIntroMobile />;


    case "IconClose":
      return <IconClose />;


    case "IconHamburger":
      return <IconHamburger />;


    case "Logo":
      return <Logo name={name} />;

    default:
      return null;
  }
};

export default FormattedIcons;
