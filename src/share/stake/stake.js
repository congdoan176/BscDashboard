import React from 'react';

class SaveStake {
    save = async (address, amount, date) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/createStake?address=${address}&amount=${amount}&date=${date}`).then(res => {
            return res.text();
        })
    }

    get = async (address) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/getCountStake?address=${address}`).then(res => {
            return res.text();
        })
    }
}

export default new SaveStake();
