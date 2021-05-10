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

    addAccount = async (address, sponsor) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/addUser`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                address: address,
                sponsor: sponsor
            })
        }).then(res => {
            console.log(res)
        })
    }
}

export default new Login();
