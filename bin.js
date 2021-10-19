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
            App.web3Provider = web3.currentProvider; // window.ethereum
            web3 = new Web3(App.web3Provider); // but there is no Web3 Constructor!
        } else {
            window.alert("Please connect to Metamask.");
            console.log(web3);
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
                window.alert("User Access Denied Transaction");
                console.log('User access has been denied ether.disabled()', error);
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
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
});







App = {
    load: async () => {
        // Load The Application
        console.warn("The Application is Loading...");

        // Connection to web3 // TODO: This may need to be revised based on metamask new support etc 
        await App.connectMetaMask();

    },

    connectMetaMask: async () => {

        // Modern dapp browsers...
        if (window.ethereum) {
            try {
                // Request account access if needed
                const accounts = await ethereum.send('eth_requestAccounts');
                // Accounts now exposed, use them
                ethereum.sendAsync('eth_sendTransaction', { from: accounts[0], /* ... */ });
                window.alert('You are connected to MetaMask!')
            } catch (error) {
                // User denied account access
                window.alert('Oh no there was an error')
                console.error(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
});







App = {
    load: async () => {
        // Load The Application
        console.warn("The Application is Loading...");

        // Connection to web3 // TODO: This may need to be revised based on metamask new support etc 
        await App.connectMetaMask();

    },

    connectMetaMask: async () => {

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');

            if(ethereum.isMetaMask) {
                console.log('MetaMask is being used!');
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                console.log(account);
            }
        }
        
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
});

const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
    //Will Start the metamask extension
    ethereum.request({ method: 'eth_requestAccounts' });
});