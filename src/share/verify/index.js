import React from 'react';

class Verify {
    sendEmail = async (email, address) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/sendEMailCodeVerify`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                address: address
            })
        }).then(res => {
            console.log(res.text());
        }).then(data => {
            console.log(data)
        });
    }

    sendCode = async (code) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/sendEMailCodeVerify`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: code,
            })
        }).then(res => {
            console.log(res.text());
        }).then(data => {
            console.log(data)
        });
    }
}

export default new Verify();
