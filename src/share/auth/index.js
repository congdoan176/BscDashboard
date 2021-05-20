import React from 'react';

class Login {
    getTotalCase = async (id) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/countAllChildren?id=${id}`).then(res => {
            return res.text();
        })
    }

    addAccount = async (address, sponsor) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/addUser?address=${address}&sponsor=${sponsor}&time=${Date.now()}`)
            .then(res => {
                return res.text();
            })
    }
}

export default new Login();
