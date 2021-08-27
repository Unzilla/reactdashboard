import React, { Component } from "react";
import "./dashboard.css";
import { Col, Row, Container } from "react-bootstrap";
import TextWidget from "./TextWidget";
import BarWidget from "./BarWidget";
import DoughnutWidget from "./DoughnutWidget";
import LineWidget from "./LineWidget";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import SplineWidget from "./SplineWidget";
import ColumnWidget from "./ColumnWidget";
import ParetoWidget from "./ParetoWidget";

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Charts from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusionchart
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      exampleArr: [],
      dropDownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      month: null,
      sessions: null,
      numberOfSessionsPerUsers: null,
      pagePerSession: null,
      avgSessionTime: null,
      bounceRate: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sourceArr: [],
      usersArr: [],
      sessionArr: [],
      monthArr: []
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let organicSource = 0;
    let directSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let month = 0;
    let sessions = 0;
    let numberOfSessionsPerUsers = 0;
    let pagePerSession = 0;
    let avgSessionTime = 0;
    let bounceRate = 0;
    let referralSource = 0;
    let selectedValue = null;
    let sourceArr = [];
    let usersArr = [];
    let sessionArr = [];
    let exampleArr = [];
    let monthArr = [];
    for (let i = 0; i < arrLen; i++) {
      if (arg == arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        month = arr[i].month;
        sessions = arr[i].sessions;
        numberOfSessionsPerUsers = arr[i].number_of_sessions_per_users;
        pagePerSession = arr[i].page_per_session;
        avgSessionTime = arr[i].avg_session_time;
        newUsers = arr[i].new_users;
        bounceRate = arr[i].bounce_rate;

        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].new_users
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          }
        );
        usersArr.push(
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
        sessionArr.push(
          {
            label: "Average Session Time",
            value: arr[i].avg_session_time
          },
          {
            label: "Page Per Session",
            value: arr[i].page_per_session
          },
          {
            label: "No of session per users",
            value: arr[i].number_of_sessions_per_users
          }
        );
        monthArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          }
        );
        exampleArr.push(
          {
            label: "Number of sessions",
            value: arr[i].number_of_sessions_per_users
          },
          {
            label: "Page Per Session",
            value: arr[i].page_per_session
          }
        );
      }
    }
    selectedValue = arg;
    this.setState(
      {
        organicSource: organicSource,
        directSource: directSource,
        referralSource: referralSource,
        pageViews: pageViews,
        users: users,
        newUsers: newUsers,
        sourceArr: sourceArr,
        usersArr: usersArr,
        sessions: sessions,
        sessionArr: sessionArr,
        numberOfSessionsPerUsers: numberOfSessionsPerUsers,
        pagePerSession: pagePerSession,
        avgSessionTime: avgSessionTime,
        bounceRate: bounceRate,
        month: month,
        monthArr: monthArr,
        exampleArr: exampleArr
      },
      () => {
        console.log(this.state.organicSource);
      }
    );
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState(
      {
        selectedValue: event.value
      },
      () => {
        console.log(this.state.organicSource);
      }
    );
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        let dropDownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropDownOptions.push(rows[i].month);
        }

        dropDownOptions = Array.from(new Set(dropDownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropDownOptions: dropDownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  // Preparing the chart data

  render() {
    const options = ["one", "two", "three"];
    const defaultOption = options[0];
    // Create a JSON object to store the chart configurations

    return (
      <div>
        <Container>
          <Row className="TopHeader">
            <Col>Dashboard</Col>
            <Col>
              <DropDown
                options={this.state.dropDownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container className="mainDashboard">
          <Row>
            <Col>
              <TextWidget
                title="Organic Source"
                value={this.state.organicSource}
                text="Organic Source statistics"

              />
            </Col>
            <Col>
              <TextWidget
                title="Direct Source"
                value={this.state.directSource}
                text="Direct Source statistics"

              />
            </Col>
            <Col>
              <TextWidget
                title="Referral Source"
                value={this.state.referralSource}
                text="Referral source statistics"
                
    
              />
            </Col>
            <Col>
              <TextWidget title="Page Views" 
              value={this.state.pageViews} 
              text="Page View statistics"
              
              />
            </Col>
          </Row>

          <Row>
          
            <Col>
              <BarWidget
                title="Source Comparison"
                data={this.state.sourceArr}
              />
            </Col>
            <Col>
              <DoughnutWidget
                title="Users Comparison"
                data={this.state.usersArr}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <SplineWidget title="User View" data={this.state.usersArr} />
            </Col>
            <Col>
              <ParetoWidget
                title="Session Comparison"
                data={this.state.sessionArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ColumnWidget
                title="Sources Category View"
                data={this.state.monthArr}
              />
            </Col>
            <Col>
              <LineWidget
                title="Session ratio"
                data={this.state.exampleArr}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
