import { useState, useEffect, Fragment } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import CanvasJSReact from "../assets/canvasjs.react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "@material-ui/lab/Pagination";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { IconButton } from "@material-ui/core";
import Avatar from "react-avatar";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { parseToValueDate } from "./dateFormatter";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { PDFExport } from "@progress/kendo-react-pdf";

import {
  getListChannelNameAPI,
  getListGroupNameAPI,
  getListAgentNameAPI,
  getListUserAPI,
  getListRatingAPI,
} from "./API";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var FontAwesome = require("react-fontawesome");

import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

function Dashboard() {
  useEffect(() => {
    getChannelName();
    getGroup();
    getAgentName();
    getRating();
    getUser();
  }, []);
  const pdfExportComponent = React.useRef(null);

  const rating = [
    { value: "1", label: "Rating 1" },
    { value: "2", label: "Rating 2" },
    { value: "3", label: "Rating 3" },
    { value: "4", label: "Rating 4" },
    { value: "5", label: "Rating 5" },
  ];
  const limitOption = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "50", label: "50" },
  ];

  const pageNum = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];

  const [selectedChannelName, setSelectedChannelName] = useState("All");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedAgentName, setSelectedAgentName] = useState("All");
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(parseToValueDate(today)));
  const [endDate, setEndDate] = useState(new Date(parseToValueDate(today)));

  const [channelName, setChannelName] = useState([]);

  const getChannelName = () => {
    const body = {};
    const onSuccess = ({ data }) => {
      const names = data.output.map((row) => ({
        label: row.channelName,
        value: row.id,
      }));
      setChannelName(names);
    };
    const onFailure = () => {};

    getListChannelNameAPI(body, onSuccess, onFailure);
  };

  const [groupName, setGroup] = useState([]);

  const getGroup = () => {
    const body = {};
    const onSuccess = ({ data }) => {
      const names = data.output.map((row) => ({
        label: row.group,
        value: row.id,
      }));
      setGroup(names);
    };
    const onFailure = () => {};

    getListGroupNameAPI(body, onSuccess, onFailure);
  };

  const [agentName, setAgent] = useState([]);

  const getAgentName = () => {
    const body = {};
    const onSuccess = ({ data }) => {
      const names = data.output.map((row) => ({
        label: row.agentName,
        value: row.id,
      }));
      setAgent(names);
    };
    const onFailure = () => {};

    getListAgentNameAPI(body, onSuccess, onFailure);
  };

  const [ratingPie, setRating] = useState([]);

  const getRating = () => {
    const body = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      channelName: selectedChannelName,
      group: selectedGroup,
      rating: selectedRating,
      agentName: selectedAgentName,
    };
    const onSuccess = ({ data }) => {
      const names = data.output;
      const rating1 = names.rate1;
      const rating2 = names.rate2;
      const rating3 = names.rate3;
      const rating4 = names.rate4;
      const rating5 = names.rate5;

      setRating({ rating1, rating2, rating3, rating4, rating5 });
    };
    const onFailure = () => {};

    getListRatingAPI(body, onSuccess, onFailure);
  };

  const sumRating =
    parseInt(ratingPie.rating1, 10) +
    parseInt(ratingPie.rating2, 10) +
    parseInt(ratingPie.rating3, 10) +
    parseInt(ratingPie.rating4, 10) +
    parseInt(ratingPie.rating5, 10);

  const sumAverageRating =
    parseInt(ratingPie.rating1, 10) * 1 +
    parseInt(ratingPie.rating2, 10) * 2 +
    parseInt(ratingPie.rating3, 10) * 3 +
    parseInt(ratingPie.rating4, 10) * 4 +
    parseInt(ratingPie.rating5, 10) * 5;

  const getPercentage = (num) => {
    return ((parseInt(num) / sumRating) * 100).toFixed(0);
  };

  const ratingLabel = [
    {
      y: ratingPie.rating5,
      label: "Rating - 5 ⭐⭐⭐⭐⭐ " + getPercentage(ratingPie.rating5) + "%",
      color: "#de6438",
    },
    {
      y: ratingPie.rating4,
      label: "Rating - 4 ⭐⭐⭐⭐ " + getPercentage(ratingPie.rating4) + "%",
      color: "#d07d2f",
    },
    {
      y: ratingPie.rating3,
      label: "Rating - 3 ⭐⭐⭐     " + getPercentage(ratingPie.rating3) + "%",
      color: "#e89740",
    },
    {
      y: ratingPie.rating2,
      label:
        "Rating - 2 ⭐⭐           " + getPercentage(ratingPie.rating2) + "%",
      color: "#f6c34c",
    },
    {
      y: ratingPie.rating1,
      label:
        "Rating - 1 ⭐                " +
        getPercentage(ratingPie.rating1) +
        "%",
      color: "#f6d475",
    },
  ];

  const filteredRatingLabel = ratingLabel.filter(
    (item) => parseInt(item.y) > 0
  );
  const averageRating = sumAverageRating / sumRating;
  const [user, setUser] = useState([]);
  const [userExport, setUserExport] = useState([]);

  const getUser = () => {
    const body = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      channelName: selectedChannelName,
      group: selectedGroup,
      rating: selectedRating,
      agentName: selectedAgentName,
    };
    const onSuccess = ({ data }) => {
      const names = data.output.map((row) => ({
        name: row.customerName,
        phone: row.customerPhone,
        email: row.customerEmail,
        channel: row.customerChannel,
        agent: row.agentName,
        ticketNumber: row.ticketNumber,
        rating: row.rating,
      }));
      setUser(names);
      setUserExport(data.output);
    };
    const onFailure = () => {};

    getListUserAPI(body, onSuccess, onFailure);
  };

  const [currentPage, setCurrentPage] = useState("1");

  var page = 1;

  const nextPage = () => {
    if (currentPage < Math.ceil(user.length / limit)) {
      page = parseInt(currentPage) + 1;
      setCurrentPage(page);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      page = parseInt(currentPage) - 1;
      setCurrentPage(page);
    }
  };

  const handlePageChange = (e) => {
    if (e.currentTarget.textContent !== "") {
      setCurrentPage(e.currentTarget.textContent - 1 + 1);
    }
  };

  const [limit, setLimit] = useState("5");
  const changeLimit = (num) => {
    setLimit(num);
  };

  const options = {
    exportEnabled: false,
    animationEnabled: true,

    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelMaxWidth: 180,
        indexLabelFontSize: 16,
        textAlign: "textAlign - Left",
        indexLabel: "{label} ({y} Rating) ",
        dataPoints: filteredRatingLabel,
      },
    ],
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "24px",
      height: "24px",
      fontSize: "auto",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "22px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "22px",
    }),
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileId = `${parseToValueDate(startDate)}-${parseToValueDate(
      endDate
    )}- Report Bot Rating`;

    const downloadData = userExport.map((data) => ({
      "Customer Name": data.customerName,
      "Phone Number": data.customerPhone,
      "Channel Type": data.channel,
      "Agent Name": data.agentName,
      "Ticket Number": data.ticketNumber,
      Rating: data.rating,
    }));

    const ws = XLSX.utils.json_to_sheet(downloadData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(excelData, fileId + fileExtension);
  };

  const exportToCSV = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".csv";
    const fileId = `${parseToValueDate(startDate)}-${parseToValueDate(
      endDate
    )}- Report Bot Rating`;

    const downloadData = userExport.map((data) => ({
      "Customer Name": data.customerName,
      "Phone Number": data.customerPhone,
      "Channel Type": data.channel,
      "Agent Name": data.agentName,
      "Ticket Number": data.ticketNumber,
      Rating: data.rating,
    }));

    const ws = XLSX.utils.json_to_sheet(downloadData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(excelData, fileId + fileExtension);
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <>
      <Container flex>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <h6>
                      <b>Live agent Rating</b>
                    </h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ fontSize: "12px" }}>
          <Col xs="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="calendar"
                  size="1x"
                />
                Start Date:
              </Card.Header>
              <Card.Body>
                <div class="myContainer">
                  <DatePicker
                    selected={startDate}
                    onChange={(e) => setStartDate(e)}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="calendar"
                  size="1x"
                />
                End Date:
              </Card.Header>
              <Card.Body>
                <DatePicker
                  selected={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="user"
                  size="1x"
                />
                {} Channel Name: ㅤㅤㅤㅤㅤ
              </Card.Header>
              <Card.Body>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  type="select"
                  onChange={(e) => setSelectedChannelName(e.value)}
                  defaultValue={{ value: "All", label: "All" }}
                  options={channelName}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="users"
                  size="1x"
                />
                {} Group: ㅤㅤㅤㅤㅤㅤ
              </Card.Header>
              <Card.Body>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  type="select"
                  onChange={(e) => setSelectedGroup(e.value)}
                  defaultValue={{ value: "All", label: "All" }}
                  options={groupName}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="star"
                  size="1x"
                />
                {} Rating:ㅤㅤㅤㅤㅤㅤ
              </Card.Header>
              <Card.Body>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  type="select"
                  onChange={(e) => setSelectedRating(e.value)}
                  defaultValue={{ value: "All", label: "All" }}
                  options={rating}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="auto">
            <Card>
              <Card.Header>
                <FontAwesome
                  className="super-crazy-colors"
                  name="user"
                  size="1x"
                />
                {} Agent Name:ㅤㅤㅤㅤㅤㅤㅤㅤ
              </Card.Header>
              <Card.Body>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  type="select"
                  onChange={(e) => setSelectedAgentName(e.label)}
                  defaultValue={{ value: "All", label: "All" }}
                  options={agentName}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="auto">
            <p>
              <Button
                type="button"
                class="btn btn-primary "
                style={{ fontSize: "13px" }}
                onClick={getUser, getRating}
                size="sm"
              >
                <FontAwesome
                  className="super-crazy-colors"
                  name="filter"
                  size="1x"
                />
                ㅤFilterㅤ
              </Button>
            </p>
            <p>
              <div class="btn-group">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Download  "
                  size="sm"
                  style={{ fontSize: "10px" }}
                >
                  <Dropdown.Item
                    onClick={exportToExcel}
                    style={{ fontSize: "10px" }}
                  >
                    Download XSLX
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={exportToCSV}
                    style={{ fontSize: "10px" }}
                  >
                    Download CSV
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      if (pdfExportComponent.current) {
                        pdfExportComponent.current.save();
                      }
                    }}
                    style={{ fontSize: "10px" }}
                  >
                    Download PDF
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="8">
                    <Card.Title as="h4" style={{ textAlign: "center" }}>
                      Total Rating
                    </Card.Title>
                    <p
                      className="card-category"
                      style={{ textAlign: "center" }}
                    >
                      <b>Grand Total: 100% ({sumRating} Rating)</b>
                    </p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs="8">
                    <CanvasJSChart options={options} />
                  </Col>
                  <Col xs="3">
                    <Row>
                      <Col xs="3">
                        <h3 style={{ textAlign: "center" }}>
                          <FontAwesome
                            style={{ color: "#ffd700" }}
                            name="star"
                            size="7x"
                          />
                        </h3>
                        <br></br>
                      </Col>
                      <Col xs="10">
                        <h5 style={{ textAlign: "center" }}>
                          Overall Average Rating
                        </h5>
                        <h3 style={{ textAlign: "center" }}>
                          <b>{averageRating}</b>
                        </h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="auto">
                    <div style={{ marginTop: `-20%`, color: "#fff" }}>
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                    </div>
                  </Col>
                  <Col xs lg="5">
                    {"ㅤㅤㅤㅤㅤㅤ"}
                  </Col>
                  <Col xs lg="auto">
                    <div style={{ marginTop: `-10%`, color: "#fff" }}>
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                      <FontAwesome
                        className="super-crazy-colors"
                        name="square"
                        size="2x"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>{"ㅤㅤㅤㅤㅤㅤ"}</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row style={{ fontSize: "12px" }}>
          <Col
            xs="auto"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <b>Data per Page :</b>
          </Col>
          <Col
            xs
            lg="auto"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Select
              styles={customStyles}
              onChange={(e) => changeLimit(e.value)}
              defaultValue={{ value: "5", label: "5" }}
              options={limitOption}
            />
          </Col>
          <Col
            xs
            lg="6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              key="left"
              aria-label="next"
              color="inherit"
              onClick={prevPage}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <Pagination
              size="small"
              siblingCount={1}
              count={Math.ceil(user.length / limit)}
              page={currentPage - 1 + 1}
              onChange={handlePageChange}
              hideNextButton={true}
              hidePrevButton={true}
            />
            <IconButton
              key="right"
              aria-label="next"
              color="inherit"
              onClick={nextPage}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
            Halaman {currentPage} dari {Math.ceil(user.length / limit)} halaman
          </Col>
        </Row>
        <Row>
          <Col>{"ㅤㅤㅤㅤㅤㅤ"}</Col>
        </Row>
        {user
          .slice(
            parseInt(limit) * parseInt(currentPage) - limit,
            parseInt(limit) * parseInt(currentPage)
          )
          .map((u) => (
            <Row>
              <Col>
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="1">
                        <Avatar name={u.name} size="60" round={true} />
                      </Col>
                      <Col xs="2">
                        <div className="numbers">
                          <p style={{ textAlign: "left", fontSize: "15px" }}>
                            <b>{u.name}</b>
                          </p>
                          <p
                            className="card-category"
                            style={{ textAlign: "left", fontSize: "13px" }}
                          >
                            {u.phone}
                          </p>
                          <p
                            className="card-category"
                            style={{ textAlign: "left", fontSize: "10px" }}
                          >
                            {u.email}
                          </p>
                          <p
                            className="card-category"
                            style={{ fontSize: "12px" }}
                          >
                            ㅤ
                          </p>
                        </div>
                      </Col>
                      <Col xs="1">
                        {(() => {
                          if (u.agent === "Iyas Operator") {
                            return (
                              <Avatar
                                size="50"
                                src="https://cdn.svgapi.com/vector/72987/man.svg"
                              />
                            );
                          } else {
                            return (
                              <Avatar
                                size="50"
                                src="https://cdn.svgapi.com/vector/17019/woman.svg"
                              />
                            );
                          }
                        })()}
                      </Col>
                      <Col xs="2">
                        <div className="numbers">
                          <p style={{ textAlign: "left", fontSize: "15px" }}>
                            <b>{u.agent}</b>
                          </p>
                          <p
                            className="card-category"
                            style={{ textAlign: "left", fontSize: "13px" }}
                          >
                            operator
                          </p>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="numbers">
                          <p
                            className="card-category"
                            style={{ textAlign: "left", fontSize: "13px" }}
                          >
                            Ticket Number:
                          </p>

                          <p
                            className="card-category"
                            style={{ textAlign: "left", fontSize: "13px" }}
                          >
                            {u.ticketNumber}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        {(() => {
                          if (parseInt(u.rating) == 1) {
                            return <div>⭐</div>;
                          } else if (parseInt(u.rating) == 2) {
                            return <div>⭐⭐</div>;
                          } else if (parseInt(u.rating) == 3) {
                            return <div>⭐⭐⭐</div>;
                          } else if (parseInt(u.rating) == 4) {
                            return <div>⭐⭐⭐⭐</div>;
                          } else {
                            return <div>⭐⭐⭐⭐⭐</div>;
                          }
                        })()}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}

        <div
          style={{
            position: "absolute",
            left: "-1000px",
            top: "-100000px",
          }}
        >
          <PDFExport
            paperSize="A1"
            margin={{ top: 40, left: 80, right: 80, bottom: 40 }}
            ref={pdfExportComponent}
            title="Live Agent Report"
            subject="Live Agent Report"
          >
            <h1>Live Agent Rating Report</h1>
            <Row>
              <Col>
                <p> </p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Channel </b>
                </p>
              </Col>
              <Col xs="auto">
                <p>: {selectedChannelName}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Group </b>
                </p>
              </Col>
              <Col xs="auto">
                <p>: {selectedGroup}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Agent Name</b>
                </p>
              </Col>
              <Col xs="auto">
                <p>: {selectedAgentName}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Date Period </b>
                </p>
              </Col>
              <Col xs="auto">
                <p>
                  : {formatDate(startDate.toISOString())} -{" "}
                  {formatDate(endDate.toISOString())}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p> </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p> </p>
              </Col>
            </Row>

            {user.map((u) => (
              <Row>
                <Col>
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="1">
                          <Avatar name={u.name} size="60" round={true} />
                        </Col>
                        <Col xs="2">
                          <div className="numbers">
                            <p style={{ textAlign: "left" }}>
                              <b>{u.name}</b>
                            </p>
                            <p
                              className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              {u.phone}
                            </p>
                            <p
                              className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              {u.email}
                            </p>
                            <p
                              className="card-category"
                              style={{ fontSize: "10px" }}
                            >
                              {"\n"}
                            </p>
                          </div>
                        </Col>
                        <Col xs="1">
                          {(() => {
                            if (u.agent === "Iyas Operator") {
                              return (
                                <Avatar
                                  size="50"
                                  src="https://cdn.svgapi.com/vector/72987/man.svg"
                                />
                              );
                            } else {
                              return (
                                <Avatar
                                  size="50"
                                  src="https://cdn.svgapi.com/vector/17019/woman.svg"
                                />
                              );
                            }
                          })()}
                        </Col>
                        <Col xs="2">
                          <div className="numbers">
                            <p
                              // className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              <b>{u.agent}</b>
                            </p>
                            <p
                              className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              operator
                            </p>
                          </div>
                        </Col>
                        <Col xs="4">
                          <div className="numbers">
                            <p
                              className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              Ticket Number:
                            </p>

                            <p
                              className="card-category"
                              style={{ textAlign: "left" }}
                            >
                              {u.ticketNumber}
                            </p>
                          </div>
                        </Col>
                        <Col>
                          {(() => {
                            if (parseInt(u.rating) == 1) {
                              return <div>⭐</div>;
                            } else if (parseInt(u.rating) == 2) {
                              return <div>⭐⭐</div>;
                            } else if (parseInt(u.rating) == 3) {
                              return <div>⭐⭐⭐</div>;
                            } else if (parseInt(u.rating) == 4) {
                              return <div>⭐⭐⭐⭐</div>;
                            } else {
                              return <div>⭐⭐⭐⭐⭐</div>;
                            }
                          })()}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </PDFExport>
        </div>
      </Container>
    </>
  );

  //  }
}

export default Dashboard;
ReactDOM.render(<Dashboard />, document.querySelector("#root"));
