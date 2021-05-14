import React, {useState} from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import DataContext from "../../context";
import Verify from "../../share/verify/index"
import Web3 from "web3";
import Login from "../../share/auth";
import Header from "../../components/Headers/Header";

const Profile = () => {

    const [inputVerifyCode, setInputVerifyCode] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [Email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function getInfoUser(data){
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        let dataJson = JSON.parse(await Login.addAccount(accounts[0], data.addressSponsor))
        data.UpdateInfoUser(dataJson.linkRef, dataJson.statusVerify, dataJson.email)
    }

    async function validateEmail(type, addressAccount) {
        if (type === "email"){
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (Email.length === 0) {
                setErrorText("Email is not vacant.");
                return;
            }
            if (!re.test(Email)){
                setErrorText("Email is not valid.");
                return;
            }
            await sendData("email", addressAccount)
        }
    }

    async function sendData(type, addressAccount, context){
        if (type === 'email'){
            let data =  JSON.parse(await Verify.sendEmail(Email, addressAccount));
            if (data.message === "success"){
                setInputVerifyCode(true)
            }

        }else {
            let data = JSON.parse(await Verify.sendCode(verifyCode, addressAccount));
            if (data.msg === "The confirmation code is not correct, please check again."){
                setErrorMsg(data.msg);
            }
            if (data.msg === "success"){
                alert("Verify email success.");
                setErrorMsg("")
                await getInfoUser(context)
            }
        }
    }

    async function changeValue(type, event){
        if (type === 'email'){
            await setEmail(event.target.value);
        }else {
            await setVerifyCode(event.target.value);
        }
    }

    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt--5" fluid>
                        <Row>
                            <Col className="order-xl-1 mb-5 mb-xl-10 " xl="12">
                                <Card className="card-profile shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col text-center">
                                                <h2 className="mb-0">Wallet Info</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody className="pt-0 md-4">
                                        <Row>
                                            <div className="col">
                                                <div
                                                    className="card-profile-stats d-flex justify-content-center md-5">
                                                    <div>
                                                        <span className="heading">~{data.balanceFTXF}
                                                            <span>
                                                                {" "}
                                                                <img
                                                                    className="navbar-brand-img"
                                                                    src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                                    style={{width: 19, height: 19}}
                                                                />
                                                            </span>
                                                        </span>
                                                        <span className="description">FTXF</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">~{data.balanceFTXFS}
                                                            <span>
                                                                {" "}
                                                                <img
                                                                    className="navbar-brand-img"
                                                                    src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                                    style={{width: 19, height: 19}}
                                                                />
                                                            </span>
                                                        </span>
                                                        <span className="description">FTX Eshare</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">~{data.balanceBNB}
                                                            <span>
                                                                {" "}
                                                                <img
                                                                    className="navbar-brand-img"
                                                                    src={require("../../assets/img/icons/Binance-Coin-BNB-icon.png").default}
                                                                    style={{width: 19, height: 19}}
                                                                />
                                                            </span>
                                                        </span>
                                                        <span className="description">BNB</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">~{data.balanceUSDT}
                                                            <span>
                                                                {" "}
                                                                <img
                                                                    className="navbar-brand-img"
                                                                    src={require("../../assets/img/icons/Tether-USDT-icon.png").default}
                                                                    style={{width: 19, height: 19}}
                                                                />
                                                            </span>
                                                        </span>
                                                        <span className="description">USDT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="order-xl-2" xl="12">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0">My account</h3>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Link Referent
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={data.userLinkRef}
                                                                disabled = {true}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Wallet address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={data.accountAddress}
                                                                disabled = {true}
                                                                id="input-username"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Email address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                defaultValue={data.userEmail}
                                                                disabled = {true}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-first-name"
                                                            >
                                                                Chain Id
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={data.accountChain}
                                                                disabled = {true}
                                                                id="input-first-name"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-first-name"
                                                            >
                                                                Verify Status
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={data.userVerifyStatus}
                                                                disabled = {true}
                                                                id="input-first-name"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4"/>
                                            {/* Description */}
                                            <h6 className="heading-small text-muted mb-4">Verify Email</h6>
                                            <div className="pl-lg-4">
                                                {!inputVerifyCode ?
                                                    <FormGroup>
                                                        <label>Email</label>
                                                        <Row>
                                                            <Col xl="10">
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    placeholder="Enter email"
                                                                    type="email"
                                                                    onChange={async (e) =>  changeValue('email', e)}
                                                                />
                                                            </Col>
                                                            <Col xl="1">
                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => validateEmail('email', data.accountAddress) }
                                                                    size="lgs"
                                                                    type={'reset'}
                                                                >
                                                                    Submit
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                        {errorText.length !== 0 ?
                                                            <Row>
                                                                <div style={{marginLeft: 15,marginTop: 10}}>
                                                                    <p style={{color: 'red'}}>{errorText}</p>
                                                                </div>
                                                            </Row> : ""
                                                        }
                                                    </FormGroup> :
                                                    <FormGroup>
                                                        <label>Verify Code</label>
                                                        <Row>
                                                            <Col lg={8}>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    placeholder="Enter Code"
                                                                    defaultValue={""}
                                                                    onChange={async (e) =>  changeValue('codeVerify', e)}
                                                                    type="text"
                                                                />
                                                                <small style={{color: "red"}}>{errorMsg}</small>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => sendData("codeVerify", data.accountAddress, data)}
                                                                    size="lgs"
                                                                    type={'reset'}
                                                                >
                                                                    Submit
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                }
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </DataContext.Consumer>

        </>
    );
};

export default Profile;
