import React from "react";

// reactstrap components
import {Container, Row, Col} from "reactstrap";

const UserHeader = () => {
    return (
        // <>
        //     <div
        //         className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        //         style={{
        //             minHeight: "600px",
        //             backgroundImage:
        //                 "url(" +
        //                 require("../../assets/img/theme/profile-cover.jpg").default +
        //                 ")",
        //             backgroundSize: "cover",
        //             backgroundPosition: "center top",
        //         }}
        //     >
        //         {/* Mask */}
        //         <span className="mask bg-gradient-default opacity-8"/>
        //         {/* Header container */}
        //
        //     </div>
        // </>
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">

                    </div>
                </Container>
            </div>
        </>
    );
};

export default UserHeader;
