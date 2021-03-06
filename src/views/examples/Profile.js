import React, {useEffect, useState} from "react";
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
import Verify from "../../share/verify/verify"
import Web3 from "web3";
import ProfileBlock from "../../share/blockProfile/profile";
import HeaderFake from "../../components/Headers/HeaderFake";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Profile = (props) => {

    const [inputVerifyCode, setInputVerifyCode] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [Email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [copied, setCopied] = useState(false);

    async function getInfoUser(data) {
        // const web3 = new Web3(Web3.givenProvider);
        // const accounts = await web3.eth.getAccounts();
        // let dataJson = JSON.parse(await Login.addAccount(accounts[0].toLowerCase(), data.addressSponsor.toLowerCase()))
        // data.UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
        //     dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild, dataJson.user.totalSalesBranch)
        window.location.reload()
    }

    async function validateEmail(type, addressAccount) {
        if (type === "email") {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (Email.length === 0) {
                setErrorText("Email is not vacant.");
                return;
            }
            if (!re.test(Email)) {
                setErrorText("Email is not valid.");
                return;
            }
            const web3 = new Web3(Web3.givenProvider)
            const accounts = await web3.eth.getAccounts()
            if (accounts.length <= 0){
                setErrorText("You need to connect a wallet to make it verify email.")
                return;
            }
            setEmail(Email.toLowerCase())
            await sendData("email", addressAccount)
        }
    }

    async function sendData(type, addressAccount, context) {
        if (type === 'email') {
            let data = JSON.parse(await Verify.sendEmail(Email.toLowerCase(), addressAccount.toLowerCase()));
            if (data.message === "error send mail"){
                alert("send email failed, please try again later.");
                return;
            }
            if (data.message === "success") {
                alert("Please check your email to get the code!");
                setInputVerifyCode(true)
            }
        } else {
            let data = JSON.parse(await Verify.sendCode(verifyCode, addressAccount.toLowerCase(), Email, context.addressSponsor));
            if (data.msg === "The confirmation code is not correct, please check again.") {
                setErrorMsg(data.msg);
                return;
            }
            if (data.msg.indexOf("The address is already linked to another email") !== -1){
                alert("The address is already linked to another email");
                setInputVerifyCode(false);
                return;
            }
            if(data.msg === "Referrer id can not be lower than you"){
                alert("Verify email fail! Referrer id can not be lower than you.")
                setInputVerifyCode(false);
                return;
            }

            if (data.msg === "success") {
                alert("Verify email success.");
                setErrorMsg("")
                await getInfoUser(context)
            }
        }
    }

    async function changeValue(type, event) {
        if (type === 'email') {
            await setEmail(event.target.value);
        } else {
            await setVerifyCode(event.target.value);
        }
    }

    function coppyData(){
        document.getElementById("myInput")
        document.execCommand('copy');
    }

    return (
        <>
            <HeaderFake/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt-lg--5 mt--9" fluid>
                        <Row>
                            <Col className="order-xl-1 mb-lg-5 mb-2 mb-xl-10 " lg="7">
                                <Card className="card-profile shadow">
                                    <CardBody className="pt-0 text-center">
                                        <Row lg="11" sm="12" className="mt-4 mb-lg-5">
                                            <Row style={{
                                                height: 100,
                                                borderRadius: 10,
                                                border: "2px solid #11cdef",
                                                marginTop: 10,
                                                width: '90%',
                                                marginLeft: "5%",
                                            }}>
                                                <Col lg="12" xs="12" className="mt-2">
                                                    <h4 style={{color: "#11cdef"}}>Account Address</h4>
                                                </Col>
                                                <Col lg="12" xs="12">
                                                    <p style={{color: "black"}}>{data.accountAddress}</p>
                                                </Col>
                                            </Row>
                                        </Row>
                                        <div>
                                            <Row lg="11" sm="11" className="mt-2 mb-lg-5">
                                                <ProfileBlock {...props}
                                                              headerTextTop={"Direct sale"}
                                                              headerTextBottom={"Total sale"}
                                                              valueTop={Number(data.directSale).toFixed(4)}
                                                              valueBotoom={Number(data.totalSales).toFixed(4)}/>
                                            </Row>
                                            <Row lg="11" sm="11" className="mt-2 mb-lg-2">
                                                <ProfileBlock {...props}
                                                              headerTextTop={"Referral users"}
                                                              headerTextBottom={"Total referral"}
                                                              valueTop={data.referral.length}
                                                              valueBotoom={data.totalReferral}/>
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="order-xl-1 mb-5 " lg="5">
                                <Card className="bg-secondary shadow">
                                    <CardBody>
                                        <Form>
                                            {
                                                data.userVerifyStatus === "complete" || data.accountAddress === "" ? null :
                                                    <div className="pl-lg-4 ">
                                                        {!inputVerifyCode ?
                                                            <FormGroup>
                                                                <label>Verify Email</label>
                                                                <Row>
                                                                    <Col lg="12" xs>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            placeholder="Enter email"
                                                                            type="email"
                                                                            onChange={async (e) =>  changeValue('email', e)}
                                                                        />
                                                                    </Col>
                                                                    <Col lg="12" className="text-right mt-3">
                                                                        <Button
                                                                            onClick={() => validateEmail('email', data.accountAddress) }
                                                                            size="lgs"
                                                                            type={'reset'}
                                                                            style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                borderColor: "#11cdef", color: "white", borderRadius: 10}}
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
                                                                    <Col lg="12">
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            placeholder="Enter Code"
                                                                            defaultValue={""}
                                                                            onChange={async (e) =>  changeValue('codeVerify', e)}
                                                                            type="text"
                                                                        />
                                                                        <small style={{color: "red"}}>{errorMsg}</small>
                                                                    </Col>
                                                                    <Col lg="12" className="text-right mt-3">
                                                                        <Button
                                                                            onClick={() => sendData("codeVerify", data.accountAddress, data)}
                                                                            size="lgs"
                                                                            type={'reset'}
                                                                            style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                borderColor: "#11cdef", color: "white", borderRadius: 10}}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        }
                                                    </div>
                                            }
                                            <div className="pl-lg-4">
                                                { data.userVerifyStatus === "complete" ?
                                                    <Row>
                                                        <Col lg="12">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Referral Link
                                                                </label>
                                                                <Row>
                                                                    <Col lg="12" className="input-group mb-3">
                                                                        <Input type="text" className="form-control-alternative"
                                                                               placeholder="Recipient's username"
                                                                               aria-label="Recipient's username"
                                                                               disabled = {true}
                                                                               defaultValue={data.userLinkRef}
                                                                               aria-describedby="button-addon2"
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <CopyToClipboard text={data.userLinkRef}
                                                                                             onCopy={() => setCopied(true)}>
                                                                                <Button
                                                                                    onClick={() => coppyData(data)}
                                                                                    size="lgs"
                                                                                    style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                        borderColor: "#11cdef", color: "white",
                                                                                        fontSize: 10,
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        className="navbar-brand-img"
                                                                                        src={require("../../assets/img/icons/img/logo/Asset 12.png").default}
                                                                                        style={{width: 12, height: 12}}
                                                                                    />
                                                                                </Button>
                                                                            </CopyToClipboard>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="ml-2">
                                                                    {
                                                                        copied ?
                                                                            <p style={{color: '#30f222'}}>
                                                                                Copied to clipboard
                                                                            </p> : ""
                                                                    }
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row> : null
                                                }
                                                <Row>
                                                    <Col lg="12">
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
                                                </Row>
                                                <Row>
                                                    <Col lg="12">
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
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-first-name"
                                                            >
                                                                Verify Status
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={ data.userVerifyStatus === "complete" ? "completed" : ""}
                                                                disabled = {true}
                                                                id="input-first-name"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
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
