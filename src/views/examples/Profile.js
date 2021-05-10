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
import UserHeader from "components/Headers/UserHeader.js";
import DataContext from "../../context";
import Verify from "../../share/verify/index"

const Profile = () => {

    const [inputVerifyCode, setInputVerifyCode] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [Email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    async function validateEmail(type) {
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
            await sendData("email")
        }
    }

    async function sendData(type){
        if (type === 'email'){
            setInputVerifyCode(true);
            // await Verify.sendEmail(Email);
        }else {
            // await Verify.sendCode(verifyCode);
        }
    }

    async function changeValue(type, event){
        if (type === 'email'){
            await setEmail(event.target.value);
        }else {
            setVerifyCode(event.target.value);
        }
    }

    return (
        <>
            <UserHeader/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt--7" fluid>
                        <Row>
                            <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
                                <Card className="card-profile shadow">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={
                                                            require("../../assets/img/theme/team-4-800x800.jpg")
                                                                .default
                                                        }
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                    <CardBody className="pt-0 pt-md-4 mt-5">
                                        <Row>
                                            <div className="col">
                                                <div
                                                    className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                    <div>
                                                        <span className="heading">{data.balanceFTXF}</span>
                                                        <span className="description">FTX</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">{data.balanceFTXFS}</span>
                                                        <span className="description">FTX Eshare</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">{data.balanceBNB}</span>
                                                        <span className="description">BNB</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">{data.balanceUSDT}</span>
                                                        <span className="description">USDT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                        <div className="text-center">
                                            <h3>
                                                Jessica Jones
                                                <span className="font-weight-light">, 27</span>
                                            </h3>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2"/>
                                                Bucharest, Romania
                                            </div>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2"/>
                                                Solution Manager - Creative Tim Officer
                                            </div>
                                            <div>
                                                <i className="ni education_hat mr-2"/>
                                                University of Computer Science
                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="order-xl-1" xl="7">
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
                                            <h6 className="heading-small text-muted mb-4">
                                                User information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Username
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue="lucky.jesse"
                                                                id="input-username"
                                                                placeholder="Username"
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
                                                                placeholder="jesse@example.com"
                                                                type="email"
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
                                                                First name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue="Lucky"
                                                                id="input-first-name"
                                                                placeholder="First name"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name"
                                                            >
                                                                Last name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue="Jesse"
                                                                id="input-last-name"
                                                                placeholder="Last name"
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
                                                            <Col lg={8}>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    placeholder="Enter email"
                                                                    type="email"
                                                                    onChange={async (e) =>  changeValue('email', e)}
                                                                />
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => validateEmail('email') }
                                                                    size="lgs"
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
                                                                    type="text"
                                                                />
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={(e) => e.preventDefault()}
                                                                    size="lgs"
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
