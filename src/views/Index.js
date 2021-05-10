import React, {useEffect, useState} from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import Contract from "../share/contract";
import Header from "components/Headers/Header.js";
import Web3 from "web3";
import jsonFtx from "../json/ftx/contract.json";
import DataContext from "../context";

const Index = (props) => {
  return (
    <>
      <Header />
      <DataContext.Consumer>
        {data => (
            <Container className="mt--7" fluid>
              <Row>
                <Col className="mb-5 mb-xl-0" xl="6">
                  <Contract {...props} headerText={"FTX Eshare"} accountAddress={data.accountAddress} accountChain={data.accountChain} accountBalance={data.balanceFTXFS}/>
                </Col>
                <Col xl="6">
                  <Contract {...props} headerText={"BNB"} accountAddress={data.accountAddress} accountChain={data.accountChain} accountBalance={data.balanceBNB}/>
                </Col>
              </Row>
              <Row className={"mt-5"}>
                <Col className="mb-5 mb-xl-0" xl="6">
                  <Contract {...props} headerText={"FTX"} accountAddress={data.accountAddress} accountChain={data.accountChain} accountBalance={data.balanceFTXF}/>
                </Col>
                <Col xl="6">
                  <Contract {...props} headerText={"USDT"} accountAddress={data.accountAddress} accountChain={data.accountChain} accountBalance={data.balanceUSDT}/>
                </Col>
              </Row>
            </Container>
        )}
      </DataContext.Consumer>
    </>
  );
};

export default Index;
