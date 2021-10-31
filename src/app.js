App = {
    load: async () => {
        // Load The Application
        console.warn("The Application is Loading...");
        await App.loadWeb3();
        await App.loadAccount();
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8 
    // https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#sendtransaction
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = window.ethereum; //  web3.currentProvider
            web3 = new Web3(App.web3Provider); // but there is no Web3 Constructor!
            console.log("Connected to MetaMask 🦊")
            
            // Modern dapp browsers... -- // TODO: This gets the transsactiosn and makes a transaction req. move to loadAccount!
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                console.log("The Provider is ETHER!");
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                const testing = '0x3CEb3E76fC5c0d63dfdC5bE93a7366504369fF3D';
                console.log(account);
                console.log("__________");
                console.log(testing);

                try {
                    // using the event emitter
                    web3.eth.sendTransaction({
                        to: testing,
                        from: account
                    })
                    .on('transactionHash', function(hash){
                        console.log("Success!", hash)
                    })
                    .on('receipt', function(receipt){
                        console.log("Success!", receipt)
                    })
                    .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber, " ", receipt) })
                    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
                } catch (error) {
                    console.log('There was a problem with the block transaction!', error);
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                App.web3Provider = web3.currentProvider
                window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
                web3.eth.sendTransaction({/* ... */ });
                console.error("Legacy dApp Browser Detected: Accounts Exposed!");
            }
            // Non-dapp browsers...
            else {
                console.error('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
        } else {
            window.alert("Please connect to Metamask.");
            console.log(web3);
        }
    },

    loadAccount: async () => {
        window.web3 = new Web3(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
        console.log("___Loading Accounts:___");
        console.log(App.account);
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
});



/* SAVE2: This one actually connected to metamask ! but web3 error stil occurs web3 is not a constructor! */
// App = {
//     load: async () => {
//     if (window.ethereum) { //check if Metamask is installed
//             try {
//                 const address = await window.ethereum.enable(); //connect Metamask
//                 const obj = {
//                         connectedStatus: true,
//                         status: "",
//                         address: address
//                     }
//                     return obj;
                
//             } catch (error) {
//                 return {
//                     connectedStatus: false,
//                     status: "🦊 Connect to Metamask using the button on the top right."
//                 }
//             }
            
//     } else {
//             return {
//                 connectedStatus: false,
//                 status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
//             }
//         } 
//     }
// };

// $(() => {
//     $(window).load(() => {
//         App.load();
//     })
// });




/* SAVE: this is before web3 issues! */
// App = {
//     load: async () => {
//         // Load App..
//         console.log("App Loading...");
//     }
// }


// $(() => {
//     $(window).load(() => {
//         App.load();
//     })
// })