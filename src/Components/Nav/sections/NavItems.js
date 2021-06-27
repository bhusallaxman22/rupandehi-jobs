import React from "react";
import styled from "styled-components";
import { theme } from "../styles";
import {useHistory}  from "react-router-dom"

const { colors } = theme;

const StyledContainer = styled.li`
display:block
  text-align: center;
  margin: auto;
  font-weight:600;


`;

const StyledItem = styled.a`
  color: ${colors.grayishBlue};
  padding: 1em;
  border-bottom: 5px solid transparent;

  &:hover {
    text-decoration:none;
    color: ${colors.darkBlue};
    border-image: linear-gradient(
        to right,
        ${colors.limeGreen} 0%,
        ${colors.brightCyan} 100%
      )
      1;
  }
`;
const NavItems = ({ item,setChecked }) => {
  const router = useHistory()
  return (
    <StyledContainer>
      <StyledItem onClick={()=>  {router.push(item.link);setChecked(false);}} >{item.name}</StyledItem>
    </StyledContainer>
  );
};

export default NavItems;
