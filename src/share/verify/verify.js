import React from 'react';
import axios from "axios";

class Verify {
    sendEmail = async (email, address) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/sendEMailCodeVerify?email=${email}&address=${address}`)
            .then(response => response.text())
    }

    sendCode = async (code, address, email, sponsor) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/confirmVerifyEmail?address=${address}&codeVerify=${code}&email=${email}&sponsor=${sponsor}`)
            .then(res => res.text())
    }
}

export default new Verify();
