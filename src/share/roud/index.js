import React from 'react';

class Round {
    getRound = async () => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/getCurrentRound`).then(res => {
            return res.text();
        })
    }

    byAmount =  async (address, currentRound) => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/buyAmount?address=${address}&round=${currentRound}`).then(res => {
            return res.text();
        })
    }

    getAmountBNB = async  () => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/getBNBPrice`).then(res => {
            return res.text();
        })
    }
}

export default new Round();
