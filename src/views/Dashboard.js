import { useState, useEffect, Fragment } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import CanvasJSReact from "../assets/canvasjs.react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
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
import csLogo from "CS.png";
import '../assets/css/style.css';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  getListChannelNameAPI,
  getListGroupNameAPI,
  getListAgentNameAPI,
  getListUserAPI,
  getListRatingAPI,
} from "./API";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var FontAwesome = require("react-fontawesome");

import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import { end } from "@popperjs/core";
import { textAlign } from "@mui/system";

function Dashboard() {
  useEffect(() => {
    getChannelName();
    getGroup();
    getAgentName();
    getRating();
    getUser();
  }, []);
  const pdfExportComponent = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [popupName, setPopupName] = useState();
  const [popupPhone, setPopupPhone] = useState();
  const [popupAgent, setPopupAgent] = useState();
  const [popupRole, setPopupRole] = useState();
  const [popupRating, setPopupRating] = useState();
  const [popupTicketNumber, setPopupTicketNumber] = useState();
  const [popupComment, setPopupComment] = useState();
  const [popupRatingDate, setPopupRatingDate] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = (a, b, c, d, e, f, g, h) => {
    setOpen3(true);
    setPopupName(a);
    setPopupPhone(b);
    setPopupAgent(c);
    setPopupRole(d);
    setPopupRating(e);
    setPopupTicketNumber(f);
    setPopupComment(g);
    setPopupRatingDate(h);
    // console.log("a = " + a);
    // console.log("b = " + b);
    // console.log("c = " + c);
    // console.log("d = " + d);
    // console.log("comment = " + g);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const rating = [
    { value: "All", label: "All" },
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
    { value: "100", label: "100" },
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
  var addDays = function (str, days) {
    var myDate = new Date(str);
    myDate.setDate(myDate.getDate() + parseInt(days));
    return myDate;
  };

  const getChannelName = () => {
    const body = {};
    const onSuccess = ({ data }) => {
      const names = data.output.map((row) => ({
        label: row.channelName,
        value: row.channelId,
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
        label: row.groupName,
        value: row.groupId,
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
        value: row.agentId,
      }));
      setAgent(names);
    };
    const onFailure = () => {};

    getListAgentNameAPI(body, onSuccess, onFailure);
  };

  const [ratingPie, setRating] = useState([
    {
      rating1: "0.0",
      rating2: "0.0",
      rating3: "0.0",
      rating4: "0.0",
      rating5: "0.0",
    },
  ]);

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
      // if (isNaN(names.rating1)) {
      //   const rating1 = "0.0";
      // } else {
      //   const rating1 = names.rating1;
      // }
      // if (isNaN(names.rating2)) {
      //   const rating2 = "0.0";
      // } else {
      //   const rating2 = names.rating2;
      // }
      // if (isNaN(names.rating3)) {
      //   const rating3 = "0.0";
      // } else {
      //   const rating3 = names.rating3;
      // }
      // if (isNaN(names.rating4)) {
      //   const rating4 = "0.0";
      // } else {
      //   const rating4 = names.rating4;
      // }
      // if (isNaN(names.rating5)) {
      //   const rating5 = "0.0";
      // } else {
      //   const rating5 = names.rating5;
      // }
      const rating1 = names.rating1;
      const rating2 = names.rating2;
      const rating3 = names.rating3;
      const rating4 = names.rating4;
      const rating5 = names.rating5;

      setRating({ rating1, rating2, rating3, rating4, rating5 });
      // isNaN(parseInt(ratingPie.rating1.toString()))
      //   ? console.log("BROOOO")
      //   : console.log("rating 1 = " + ratingPie.rating1.toString());
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
      label: "⭐⭐⭐⭐⭐     " + getPercentage(ratingPie.rating5) + "%",
      color: "#de6438",
    },
    {
      y: ratingPie.rating4,
      label: "⭐⭐⭐⭐             " + getPercentage(ratingPie.rating4) + "%",
      color: "#d07d2f",
    },
    {
      y: ratingPie.rating3,
      label: "⭐⭐⭐                 " + getPercentage(ratingPie.rating3) + "%",
      color: "#e89740",
    },
    {
      y: ratingPie.rating2,
      label:
        "⭐⭐                       " + getPercentage(ratingPie.rating2) + "%",
      color: "#f6c34c",
    },
    {
      y: ratingPie.rating1,
      label:
        "⭐                            " +
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
  const [changedRatingDisplay, setChangedRatingDisplay] = useState();

  const getUser = () => {
    if (endDate < startDate) {
      handleClickOpen2();
    } else if (endDate > addDays(startDate, 30)) {
      handleClickOpen();
    } else {
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
          channel: row.channel,
          group: row.group,
          agent: row.agentName,
          role: row.agentRole,
          ticketNumber: row.ticketNumber,
          rating: row.rating,
          closedDate: row.closedDate,
          comment: row.comment,
          ratingDate: row.ratingDate,
        }));
        setUser(names);
        setChangedRatingDisplay(selectedRating);
        console.log(JSON.stringify(names));

        setUserExport(data.output);
      };
      const onFailure = () => {};
      getRating();
      getPdfAgentTitle();
      getPdfChannelTitle();
      getPdfGroupTitle();

      getListUserAPI(body, onSuccess, onFailure);
    }
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
    height: 250,

    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: ({y} Rating)",
        legendText: "{label}",
        indexLabelMaxWidth: 150,
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
      minHeight: "30px",
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
    const fileId = `Live Agent Report: ${parseToValueDate(
      startDate
    )}-${parseToValueDate(endDate)}`;

    const downloadData = userExport.map((data) => ({
      "Customer Name ": data.customerName,
      "Phone Number ": data.customerPhone,
      "Channel Type ": data.channel,
      "Group ": data.group,
      "Agent Name ": data.agentName,
      "Ticket Number ": data.ticketNumber,
      "Closed Date ": formatDate(data.closedDate),
      "Rating ": data.rating,
      "Comment ": data.comment,
    }));
    const ws = XLSX.utils.json_to_sheet(downloadData, {
      origin: "A10",
    });

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
    ];

    ws["!cols"] = wscols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.utils.sheet_add_json(
      wb.Sheets.data,
      [
        {
          Name: "LIVE AGENT REPORT",
        },
        {
          Name: "",
          RollNo: "",
        },
        {
          Name: "Channel",
          RollNo: `${pdfChannelTitle}`,
        },
        {
          Name: "Group",
          RollNo: `${pdfGroupTitle}`,
        },
        {
          Name: "Agent Name",
          RollNo: `${pdfAgentTitle}`,
        },
        {
          Name: "Date Period",
          RollNo: `${formatDate(startDate.toISOString())} - ${formatDate(
            endDate.toISOString()
          )}`,
        },
      ],
      {
        skipHeader: true,
        origin: "A1",
      }
    );
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(excelData, fileId + fileExtension);
  };

  const exportToCSV = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".csv";
    const fileId = `Live Agent Report: ${parseToValueDate(
      startDate
    )}-${parseToValueDate(endDate)}`;

    const downloadData = userExport.map((data) => ({
      "Customer Name ": data.customerName,
      "Phone Number ": data.customerPhone,
      "Channel Type ": data.channel,
      "Group ": data.group,
      "Agent Name ": data.agentName,
      "Ticket Number ": data.ticketNumber,
      "Closed Date ": formatDate(data.closedDate),
      "Rating ": data.rating,
      "Comment ": data.comment,
    }));
    const ws = XLSX.utils.json_to_sheet(downloadData, {
      origin: "A10",
    });

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
    ];

    ws["!cols"] = wscols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.utils.sheet_add_json(
      wb.Sheets.data,
      [
        {
          Name: "LIVE AGENT REPORT",
        },
        {
          Name: "",
          RollNo: "",
        },
        {
          Name: "Channel",
          RollNo: `${pdfChannelTitle}`,
        },
        {
          Name: "Group",
          RollNo: `${pdfGroupTitle}`,
        },
        {
          Name: "Agent Name",
          RollNo: `${pdfAgentTitle}`,
        },
        {
          Name: "Date Period",
          RollNo: `${formatDate(startDate.toISOString())} - ${formatDate(
            endDate.toISOString()
          )}`,
        },
      ],
      {
        skipHeader: true,
        origin: "A1",
      }
    );
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(excelData, fileId + fileExtension);
  };

  const exportToTXT = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8_No_BOM";
    const fileExtension = ".txt";
    const fileId = `Live Agent Report: ${parseToValueDate(
      startDate
    )}-${parseToValueDate(endDate)}`;

    const downloadData = userExport.map((data) => ({
      "Customer Name |": data.customerName + "|",
      "Phone Number |": data.customerPhone + "|",
      "Channel Type |": data.channel + "|",
      "Group |": data.group + "|",
      "Agent Name |": data.agentName + "|",
      "Ticket Number |": data.ticketNumber + "|",
      "Closed Date |": formatDate(data.closedDate) + "|",
      "Rating |": data.rating + "|",
      "Comment |": data.comment,
    }));

    const ws = XLSX.utils.json_to_sheet(downloadData, {
      origin: "A10",
    });
    XLSX.utils.sheet_add_json(
      ws,
      [
        {
          Name: "LIVE AGENT REPORT",
        },
        {
          Name: "",
          RollNo: "",
        },
        {
          Name: "Channel",
          RollNo: `${pdfChannelTitle}`,
        },
        {
          Name: "Group",
          RollNo: `${pdfGroupTitle}`,
        },
        {
          Name: "Agent Name",
          RollNo: `${pdfAgentTitle}`,
        },
        {
          Name: "Date Period",
          RollNo: `${formatDate(startDate.toISOString())} - ${formatDate(
            endDate.toISOString()
          )}`,
        },
      ],
      {
        skipHeader: true,
        origin: "A1",
      }
    );
    const wb = XLSX.utils.sheet_to_txt(ws);
    // const excelBuffer = XLSX.write(wb, { bookType: "txt", type: "array" });
    const excelData = new Blob([wb], { type: fileType });
    FileSaver.saveAs(excelData, fileId + fileExtension);
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  //Title PDF
  const [pdfAgentTitle, setPdfAgentTitle] = useState("all");
  const [pdfChannelTitle, setPdfChannelTitle] = useState("all");
  const [pdfGroupTitle, setPdfGroupTitle] = useState("all");

  const getPdfAgentTitle = () => {
    agentName.map((u) =>
      u.value === selectedAgentName ? setPdfAgentTitle(u.label) : null
    );
  };
  const getPdfChannelTitle = () => {
    channelName.map((u) =>
      u.value === selectedChannelName ? setPdfChannelTitle(u.label) : null
    );
  };
  const getPdfGroupTitle = () => {
    groupName.map((u) =>
      u.value === selectedGroup ? setPdfGroupTitle(u.label) : null
    );
  };

  const pdfFileId = `Live Agent Report: ${parseToValueDate(
    startDate
  )}-${parseToValueDate(endDate)}`;

  return (
    <>
      <Container fluid sm style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Row>
          <Col style={{ fontSize: "10px", alignItems: "center" }}></Col>
        </Row>
        <Row
          style={{ fontSize: "12px", alignItems: "center", marginTop: "15px" }}
        >
          <Col xs="11">
            <Card>
              <Card.Header>
                <Row>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="calendar"
                      size="1x"
                    />
                    Start Date:
                  </Col>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="calendar"
                      size="1x"
                    />
                    End Date:
                  </Col>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="user"
                      size="1x"
                    />
                    {} Channel Name: ㅤ
                  </Col>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="users"
                      size="1x"
                    />
                    {} Group:
                  </Col>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="star"
                      size="1x"
                    />
                    {} Rating:
                  </Col>
                  <Col xs="2">
                    <FontAwesome
                      className="super-crazy-colors"
                      name="user"
                      size="1x"
                    />
                    {} Agent Name:ㅤㅤㅤ
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div
                  style={{
                    marginTop: `-10px`,
                    marginBottom: `-15px`,
                    fontSize: 12,
                  }}
                >
                  <Row>
                    <Col xs="2">
                      <DatePicker
                        defaultValue={startDate}
                        value={startDate}
                        onChange={(e) =>
                          e.value !== null ? setStartDate(e.value) : null
                        }
                        width={`95%`}
                        required={true}
                        // minDate={addDays(endDate, -31)}
                        max={endDate}
                        title={"MM/DD/YYYY"}
                      />
                    </Col>
                    <Col xs="2">
                      <DatePicker
                        defaultValue={endDate}
                        value={endDate}
                        min={startDate}
                        width={`95%`}
                        required={true}
                        // maxDate={addDays(startDate, 31)}
                        onChange={(e) =>
                          e.value !== null
                            ? setEndDate(new Date(e.value))
                            : null
                        }
                        title={"MM/DD/YYYY"}
                      />
                    </Col>
                    <Col xs="2">
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        type="select"
                        onChange={(e) => setSelectedChannelName(e.value)}
                        defaultValue={{ value: "All", label: "All" }}
                        options={channelName}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 3,
                        })}
                      />
                    </Col>
                    <Col xs="2">
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        type="select"
                        onChange={(e) => setSelectedGroup(e.value)}
                        defaultValue={{ value: "All", label: "All" }}
                        options={groupName}
                      />
                    </Col>
                    <Col xs="2">
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        type="select"
                        onChange={(e) => setSelectedRating(e.value)}
                        defaultValue={{ value: "All", label: "All" }}
                        options={rating}
                      />
                    </Col>
                    <Col xs="2">
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        type="select"
                        onChange={(e) => setSelectedAgentName(e.value)}
                        defaultValue={{ value: "All", label: "All" }}
                        options={agentName}
                      />
                      ㅤ
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs lg="1" style={{ alignItems: "center" }}>
            <Row style={{ alignItems: "stretch" }}>
              <Col xs="12">
                <div
                  style={{
                    marginTop: `-15px`,
                    marginBottom: `-5px`,
                  }}
                >
                  <p>
                    <Button
                      type="button"
                      // class="btn btn-primary "
                      style={{ fontSize: "13px", minWidth: "52px" }}
                      onClick={getUser}
                      size="sm"
                    >
                      <FontAwesome
                        className="super-crazy-colors"
                        name="filter"
                        size="1x"
                      />
                    </Button>
                  </p>
                </div>
              </Col>
              <Col xs="12">
                <p>
                  {/* <div
                    style={{
                      marginTop: `-13%`,
                    }}
                  > */}
                  <DropdownButton
                    id="dropdown-basic-button"
                    // class="btn btn-primary "
                    title={
                      <FontAwesome
                        className="super-crazy-colors"
                        name="save"
                        size="1x"
                      />
                    }
                    size="sm"
                    minWidth="150px"
                    style={{ fontSize: "10px", minWidth: "150px" }}
                  >
                    <Dropdown.Item
                      onClick={exportToExcel}
                      style={{ fontSize: "10px", minWidth: "150px" }}
                    >
                      Download XSLX
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={exportToCSV}
                      style={{ fontSize: "10px", minWidth: "150px" }}
                    >
                      Download CSV
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={exportToTXT}
                      style={{ fontSize: "10px", minWidth: "150px" }}
                    >
                      Download TXT
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if (pdfExportComponent.current) {
                          pdfExportComponent.current.save();
                        }
                      }}
                      style={{ fontSize: "10px", minWidth: "150px" }}
                    >
                      Download PDF
                    </Dropdown.Item>
                  </DropdownButton>
                  {/* </div> */}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <div>
          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"InvalidDate"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Start date should be lower than End date.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} autoFocus size="sm">
                <FontAwesome
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                  }}
                  name="check"
                  size="1x"
                />
                ㅤOK
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Date Limit"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Date are more than 31 days.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus size="sm">
                <FontAwesome
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                  }}
                  name="check"
                  size="1x"
                />
                ㅤOK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div
          style={{
            marginTop: `-15px`,
            marginBottom: `-10px`,
          }}
        >
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs="8">
                      <Card.Title
                        as="h3"
                        style={{ textAlign: "center", alignItems: "center" }}
                      >
                        <b>Total Rating</b>
                      </Card.Title>
                      <p
                        // className="card-category"
                        style={{ textAlign: "center", alignItems: "center" }}
                      >
                        {(() => {
                          if (changedRatingDisplay == 1) {
                            return (
                              <p>
                                Grand Total: 100% (
                                {isNaN(ratingPie.rating1)
                                  ? "0"
                                  : parseInt(ratingPie.rating1, 10)}{" "}
                                Rating)
                              </p>
                            );
                          } else if (changedRatingDisplay == 2) {
                            return (
                              <p>
                                Grand Total: 100% (
                                {isNaN(ratingPie.rating2)
                                  ? "0"
                                  : parseInt(ratingPie.rating2, 10)}{" "}
                                Rating)
                              </p>
                            );
                          } else if (changedRatingDisplay == 3) {
                            return (
                              <p>
                                Grand Total: 100% (
                                {isNaN(ratingPie.rating3)
                                  ? "0"
                                  : parseInt(ratingPie.rating3, 10)}{" "}
                                Rating)
                              </p>
                            );
                          } else if (changedRatingDisplay == 4) {
                            return (
                              <p>
                                Grand Total: 100% (
                                {isNaN(ratingPie.rating4)
                                  ? "0"
                                  : parseInt(ratingPie.rating4, 10)}{" "}
                                Rating)
                              </p>
                            );
                          } else if (changedRatingDisplay == 5) {
                            return (
                              <p>
                                Grand Total: 100% (
                                {isNaN(ratingPie.rating5)
                                  ? "0"
                                  : parseInt(ratingPie.rating5, 10)}{" "}
                                Rating)
                              </p>
                            );
                          } else {
                            return (
                              <p>Grand Total: 100% ({sumRating} Rating)</p>
                            );
                          }
                        })()}
                      </p>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <CanvasJSChart options={options} />
                    </Col>
                    <Col xs="3">
                      <Row>
                        <Col xs="12">
                          <h5
                            style={{
                              textAlign: "center",
                              alignItems: "center",
                            }}
                          >
                            Overall Average Rating
                          </h5>
                          <h3
                            style={{
                              textAlign: "center",
                              alignItems: "center",
                            }}
                          >
                            {(() => {
                              if (changedRatingDisplay == 1) {
                                return (
                                  <b>{ratingPie.rating1 > 0 ? 1 : "NaN"}</b>
                                );
                              } else if (changedRatingDisplay == 2) {
                                return (
                                  <b>{ratingPie.rating2 > 0 ? 2 : "NaN"}</b>
                                );
                              } else if (changedRatingDisplay == 3) {
                                return (
                                  <b>{ratingPie.rating3 > 0 ? 3 : "NaN"}</b>
                                );
                              } else if (changedRatingDisplay == 4) {
                                return (
                                  <b>{ratingPie.rating4 > 0 ? 4 : "NaN"}</b>
                                );
                              } else if (changedRatingDisplay == 5) {
                                return (
                                  <b>{ratingPie.rating5 > 0 ? 5 : "NaN"}</b>
                                );
                              } else {
                                return (
                                  <b>
                                    {isNaN(averageRating)
                                      ? "NaN"
                                      : averageRating.toFixed(2)}
                                  </b>
                                );
                              }
                            })()}
                          </h3>
                        </Col>
                        <Col
                          xs="12"
                          style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              marginTop: `-25px`,
                            }}
                          >
                            <h1
                              style={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              ⭐
                            </h1>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs lg="auto">
                      <div
                        style={{
                          marginTop: `-21%`,
                          marginBottom: `-30%`,
                          color: "#fff",
                        }}
                      >
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
        </div>
        <div
          style={{
            marginTop: `-20px`,
            marginBottom: `-20px`,
          }}
        >
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
              Halaman {currentPage} dari {Math.ceil(user.length / limit)}{" "}
              halaman
            </Col>
          </Row>
        </div>
        <Row>
          <Col>{"ㅤㅤㅤㅤㅤㅤ"}</Col>
        </Row>
        {user
          .slice(
            parseInt(limit) * parseInt(currentPage) - limit,
            parseInt(limit) * parseInt(currentPage)
          )
          .map((u) => (
            <div
              style={{
                marginBottom: `-20px`,
              }}
            >
              <Row>
                <Col
                  onClick={() =>
                    handleClickOpen3(
                      u.name,
                      u.phone,
                      u.agent,
                      u.role,
                      u.rating,
                      u.ticketNumber,
                      u.comment,
                      u.ratingDate
                    )
                  }
                >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="1">
                          <Avatar name={u.name} size="40" round={true} />
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
                              style={{ fontSize: "13px" }}
                            >
                              ㅤ
                            </p>
                          </div>
                        </Col>
                        <Col xs="1">
                          <Avatar alt={u.agent} src={csLogo} size="40" />
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
                              {u.role} {u.group}
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
            </div>
          ))}
        <Dialog
          open={open3}
          onClose={handleClose3}
          fullWidth={true}
          maxWidth={"sm"}
          // BackdropProps={{
          //   style: {
          //     backgroundColor: "rgba(0,0,0,0.1)",
          //   },
          // }}
          // PaperProps={{
          //   style: {
          //     boxShadow: "0.5",
          //   },
          // }}
        >
          <DialogTitle id="alert-dialog-title">{"User Rating"} </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col xs="2">
                        <Avatar name={popupName} size="60" round={true} />
                        <Avatar
                          src={csLogo}
                          size="20"
                          round={true}
                          style={{
                            marginTop: `37px`,
                            marginLeft: `-19px`,
                            // marginBottom: `-20px`,
                          }}
                        />
                      </Col>
                      <Col xs="5">
                        <div>
                          <p
                            style={{
                              textAlign: "left",
                              // marginTop: `-2px`,
                              marginBottom: `-2px`,
                              fontSize: "15px",
                            }}
                          >
                            <b>{popupName}</b>
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              marginBottom: `-0.2px`,
                              fontSize: "13px",
                            }}
                          >
                            {/* {popupAgent} - {popupRole} */}
                            {popupPhone}
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                            }}
                          >
                            {popupRatingDate}
                          </p>

                          <p style={{ fontSize: "13px" }}>ㅤ</p>
                        </div>
                      </Col>
                      <Col xs="5">
                        <div>
                          <p
                            style={{
                              textAlign: "left",
                              marginTop: `5px`,
                              fontSize: "15px",
                              marginBottom: `-2px`,
                            }}
                          >
                            {(() => {
                              if (parseInt(popupRating) == 1) {
                                return <div>⭐</div>;
                              } else if (parseInt(popupRating) == 2) {
                                return <div>⭐⭐</div>;
                              } else if (parseInt(popupRating) == 3) {
                                return <div>⭐⭐⭐</div>;
                              } else if (parseInt(popupRating) == 4) {
                                return <div>⭐⭐⭐⭐</div>;
                              } else {
                                return <div>⭐⭐⭐⭐⭐</div>;
                              }
                            })()}{" "}
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              fontSize: "12px",
                              marginBottom: `-3px`,
                            }}
                          >
                            Ticket Number :
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              fontSize: "8px",
                            }}
                          >
                            {popupTicketNumber}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                    }}
                  >
                    Comments
                  </Card.Subtitle>
                  <Card.Text
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                    }}
                  >
                    {(() => {
                      if (popupComment === "") {
                        return " - ";
                      } else {
                        return popupComment;
                      }
                    })()}{" "}
                    {/* {popupComment} */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose3}
              autoFocus
              size="md"
              style={{
                textAlign: "left",
                fontSize: "12px",
                marginTop: `-40px`,
                marginBottom: `5px`,
                marginRight: `15px`,
              }}
            >
              {/* <FontAwesome
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                      }}
                      name="back"
                      size="1x"
                    />
                    ㅤOK */}
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <div
          style={{
            position: "absolute",
            left: "-1000px",
            top: "-100000px",
          }}
        >
          <PDFExport
            paperSize="A1"
            landscape={true}
            margin={{ top: 40, left: 80, right: 80, bottom: 100 }}
            ref={pdfExportComponent}
            title="Live Agent Report"
            subject="Live Agent Report"
            fileName={pdfFileId}
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
                <p>: {pdfChannelTitle}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Group </b>
                </p>
              </Col>
              <Col xs="auto">
                <p>: {pdfGroupTitle}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                <p>
                  <b>Agent Name</b>
                </p>
              </Col>
              <Col xs="auto">
                <p>: {pdfAgentTitle}</p>
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

            <Table striped bordered responsive="sm">
              <thead>
                <tr>
                  <th colSpan="3">
                    <b>Customer Name</b>
                  </th>
                  <th colSpan="2">
                    <b>Phone Number</b>
                  </th>
                  <th colSpan="2">
                    <b>Channel Type</b>
                  </th>
                  <th colSpan="2">
                    <b>Group</b>
                  </th>
                  <th colSpan="3">
                    <b>Agent Name</b>
                  </th>
                  {/* <th>
                    <b> </b>
                  </th> */}
                  <th colSpan="6">
                    <b>Ticket Number</b>
                  </th>
                  <th colSpan="2">
                    <b>Closed Date</b>
                  </th>
                  <th>
                    <b>Rating</b>
                  </th>
                  <th colSpan="6">
                    <b>Comment</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.map((u) => (
                  <tr>
                    <td colSpan="3">{u.name}</td>
                    <td colSpan="2">{u.phone}</td>
                    <td colSpan="2">{u.channel}</td>
                    <td colSpan="2">{u.group}</td>
                    <td colSpan="3">{u.agent}</td>
                    <td colSpan="6">{u.ticketNumber}</td>
                    <td colSpan="2">{formatDate(u.closedDate)}</td>
                    <td>{u.rating}</td>
                    <td colSpan="6">{u.comment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PDFExport>
        </div>
      </Container>
    </>
  );

  //  }
}

export default Dashboard;
ReactDOM.render(<Dashboard />, document.querySelector("#root"));
