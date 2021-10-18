App = {
    load: async () => {
        // Load The Application
        console.warn("The Application is Loading...");

        // Connection to web3 // TODO: This may need to be revised based on metamask new support etc 
        await App.loadWeb3();

    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    // ERROR: You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. 
    // For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
    // ERROR: Web3 is not defined ! 
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
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