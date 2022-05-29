import { useState, useEffect } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

import '../assets/css/style.css';

import BookFinder from "./BookFinder.js"
import Favorite from "./Favorite.js"

import { Container, Col } from "react-bootstrap";
import { Toolbar, AppBar, Typography } from "@material-ui/core";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Dashboard() {
  useEffect(() => {
    localStorage.setItem('_page', "1");
  }, []);

  const changePage = (page) => {
    localStorage.setItem('_page', page);
    setCnt(cnt + 1);
  }
  const [cnt, setCnt] = useState(0)

  useEffect(() => {
  }, [cnt])

  return (
    <>
      <Container style={{ paddingLeft: 15, paddingRight: 15 }}>
        <></>
        <AppBar position="static">
          <Toolbar color="blue">
            <IconButton onClick={(event) => changePage('1')} style={{ color: "white" }} >
              <MenuBookIcon style={{ paddingRight: "5px" }} />
              <Typography valiant="h6">Book Finder</Typography>
            </IconButton>
            <IconButton onClick={(event) => changePage('2')} style={{ color: "white" }}>
              <FavoriteIcon style={{ paddingRight: "5px" }} />
              <Typography valiant="h6">Favorite</Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        {localStorage.getItem('_page') === "1" ?
          <BookFinder /> : ""}
        {localStorage.getItem('_page') === "2" ?
          <Favorite /> : ""}
      </Container>
    </>
  );

  //  }
}

export default Dashboard;
ReactDOM.render(<Dashboard />, document.querySelector("#root"));
