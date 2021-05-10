import React from 'react';

class Login {
    login = async (address) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/login`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                address: address,
            })
        }).then(res => {
            console.log(res.text());
        }).then(data => {
            console.log(data)
        });
    }
}

export default new Login();
