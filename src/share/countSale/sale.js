import React from 'react';

class Sale {
    countSale = async () => {
        return await fetch(`https://us-central1-ftxtoken.cloudfunctions.net/processBCWNotificationSales-1`).then(res => {
            return res.text();
        })
    }
}

export default new Sale();
