import { useState, useEffect } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@material-ui/core";
import '../assets/css/style.css';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Card, Container, Row, Col, Table } from "react-bootstrap";

function Dashboard() {
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
  const getColumns = (width) => {
    if (width < breakpoints.sm) {
      return 3
    } else if (width < breakpoints.md) {
      return 4
    } else if (width < breakpoints.lg) {
      return 6
    } else if (width < breakpoints.xl) {
      return 7
    } else {
      return 8
    }
  }
  const [columns, setColumns] = useState(getColumns(window.innerWidth))

  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth))
  }

  const [itemData, setItemData] = useState([]);

  const [cnt, setCnt] = useState(0)

  useEffect(() => {
    setItemData(JSON.parse(localStorage.getItem("_fav") || "[]"));
  }, [cnt])

  const editFavoriteById = (id) => {
    itemData.map(item => {
      if (item.id === id) {
        item.favorite = !item.favorite;
        if (item.favorite === true) { addToLocalStorage(item); }
        else { removeFromLocalStorage(item); }
        return itemData;
      }
    });
    console.table(itemData);
    setCnt(cnt + 1)
  }

  const addToLocalStorage = (item) => {
    if (localStorage.getItem('_fav') !== null) {
      var newArray = JSON.parse(localStorage.getItem("_fav") || "[]");
      var exist = false;
      newArray.map(array => {
        if (array.id === item.id) {
          exist = true;
        }
      })
      if (exist === false) {
        newArray.push(item);
        localStorage.setItem("_fav", JSON.stringify(newArray))
      }
    } else {
      var newArray = [];
      newArray.push(item);
      console.log(newArray);
      localStorage.setItem('_fav', JSON.stringify(newArray));
    }
    console.log(localStorage.getItem('_fav'));
  }

  const removeFromLocalStorage = (item) => {
    if (localStorage.getItem('_fav') !== null) {
      var existArray = JSON.parse(localStorage.getItem("_fav") || "[]");
      var newArray = [];
      existArray.map(array => {
        if (array.id !== item.id) {
          newArray.push(array);
        }
      })
      localStorage.setItem('_fav', JSON.stringify(newArray));
    }
  }
  const getTitleTooltip = (title, author) => {
    return "Title: " + title + " | Author: " + author;
  }

  return (
    <>
      <Container style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Row
          style={{ fontSize: "12px", alignItems: "center", marginTop: "15px" }}
        >
          <Col>
            <Card>
              <Card.Header>
                <Row>
                  <Col align="center">
                    <Typography valiant="h6">Your Favorite Book</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col align="center">
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div
                  style={{
                    marginTop: `10px`,
                    marginBottom: `15px`,
                    fontSize: 12,
                  }}
                >
                  {itemData.length > 0 ?
                    <Row align="center" key="itemData-notZero">
                      <ImageList cols={columns}>
                        {itemData.map((item) => (
                          <Col style={{
                            paddingLeft: 15, paddingRight: 15,
                          }} >
                            <ImageListItem key={item.img}>
                              <div>
                                <Tooltip title="Favorite">
                                  <IconButton
                                    z-index='9999998'
                                    onClick={() => { editFavoriteById(item.id) }}
                                    sx={{
                                      left: 40, top: 50, color: (item.favorite == true ? 'red' : 'grey'),
                                      opacity: (item.favorite == true ? '100%' : '75%'),
                                    }}
                                    aria-label={`love ${item.title}`}
                                  >
                                    <FavoriteIcon sx={{
                                      fontSize: "110%",
                                      stroke: "#ffffff", "&:hover": { color: "pink" },
                                      strokeWidth: (item.favorite == true ? 0 : 1)
                                    }} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                              <Row style={{ marginLeft: `10px`, left: `10px` }}>
                                <Tooltip title={getTitleTooltip(item.title, item.author)}>
                                  <img
                                    style={{
                                      marginTop: `10px`,
                                      flex: 1,
                                      maxWidth: 100,
                                      height: 150,
                                      resizeMode: 'contain',
                                      align: 'center'
                                    }}
                                    src={`${item.img}`}
                                    srcSet={`${item.img}`}
                                    alt={item.title}
                                    loading="lazy"
                                  />
                                </Tooltip>
                              </Row>
                              <Tooltip title={getTitleTooltip(item.title, item.author)}>
                                <ImageListItemBar
                                  subtitle={item.title.substring(0, 8) + "..."}
                                  // subtitle={<span>by: {item.author}</span>}
                                  position="below"
                                />
                              </Tooltip>
                              <Rating name="read-only" value={item.rating} readOnly
                              />
                            </ImageListItem>
                          </Col>
                        ))}
                      </ImageList>
                    </Row>
                    :
                    <Row className="justify-content-md-center">
                      <img style={{
                        marginTop: `10px`,
                        flex: 1,
                        width: 50 * columns,
                        height: `100%`,
                        resizeMode: 'contain',
                        align: 'center'
                      }} src="  https://cdn.dribbble.com/users/6837/screenshots/5388515/media/2807f46853a13d180a0db7e64099eda6.png?compress=1&resize=1200x900&vertical=top" />
                    </Row>
                  }
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

  //  }
}

export default Dashboard;
ReactDOM.render(<Dashboard />, document.querySelector("#root"));
