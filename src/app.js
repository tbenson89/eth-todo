const { default: Web3 } = require("web3");

App = {
    loading: false,
    contracts: {},
    load: async () => {
        // Load The Application!
        console.warn("The Application is Loading...");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8 
    // https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#sendtransaction
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = window.ethereum; //  web3.currentProvider
            web3 = new Web3(App.web3Provider); // but there is no Web3 Constructor!
            console.log("Connected to MetaMask 🦊");
            
            // Modern dapp browsers... -- // TODO: This gets the transsactiosn and makes a transaction req. move to loadAccount!
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                console.log("The Provider is ETHER!");
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                const testing = '0x3CEb3E76fC5c0d63dfdC5bE93a7366504369fF3D';
                web3.eth.defaultAccount = web3.eth.accounts[0];
                console.log(account);
                console.log("__________");
                console.log(testing);

                // TODO: Move this out to it's own function sendETHER()
                // try {
                //     // using the event emitter
                //     web3.eth.sendTransaction({
                //         to: testing,
                //         from: account
                //     })
                //     .on('transactionHash', function(hash){
                //         console.log("Success!", hash)
                //     })
                //     .on('receipt', function(receipt){
                //         console.log("Success!", receipt)
                //     })
                //     .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber, " ", receipt) })
                //     .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
                // } catch (error) {
                //     console.log('There was a problem with the block transaction!', error);
                // }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                App.web3Provider = web3.currentProvider
                window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
                web3.eth.sendTransaction({ from: App.account });
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

        // Enable ENS support 
        // NOTE: https://docs.ens.domains/dapp-developer-guide/resolving-names --- for following the updating name service request by ENS
        // !Improtant: https://docs.ens.domains/dapp-developer-guide/working-with-ens 
        // accounts = ethereum.enable();
        // web3 = new Web3(ethereum);
        // var ens = web3.eth.ens;
    },

    loadAccount: async () => {
        window.web3 = new Web3(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
        web3.eth.defaultAccount = web3.eth.accounts[0];
        console.log("___Loading Accounts:___");
        console.log(App.account);
    },

    // get tasks from smart contract!
    loadContract: async () => {
        console.log("Loading Smart contracts. . .");
        const todoList = await $.getJSON('TodoList.json');
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);
        App.todoList = await App.contracts.TodoList.deployed();
        console.log(App.todoList);
    },

    render: async () => {

        // Prevent Double render - loading
        if (App.loading) return; 

        // Update app loading state
        App.setLoading(true);

        // Render the account on front site
        $('#account').html(App.account);

        // Render the Tasks :)
        await App.renderTasks();

        // Update loading state
        App.setLoading(false);
    },

    renderTasks: async () => {

        // We need to get teh number of tasks from the list - taskCount
        const taskCount = await App.todoList.taskCount();
        
        // Get the HTML template from front site
        const $taskTemplate = $('.taskTemplate');

        for (let i = 1; i <= taskCount; i++) {
            
            // Consume the Task Data
            const task          = await App.todoList.tasks(i),
                  taskId        = task[0].toNumber(),
                  taskContent   = task[1],
                  taskCompleted = task[2];

            // render out the tasks w/ task template HTML
            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            .on('click', App.toggleComplete);

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate);
            } else {
                $('#taskList').append($newTaskTemplate);
            }

            // Display the task
            $newTaskTemplate.show();
        }
    },

    createTask: async () => {
        App.setLoading(true);
        const content = $('#newTask').val();
        await App.todoList.createTask(content, {from: App.account});
        window.location.reload();
    },

     modifyTask: async () => {
         App.setLoading(false);
         //const content = $('#newTask').val();
         let content = "I LOVE YOU!";
         await App.todoList.modifyTask(content, {from: App.account});
         //window.location.reload();
     },

    toggleComplete: async (event) => {
        App.setLoading(true);
        const taskId = event.target.name;
        await App.todoList.toggleComplete(taskId, {from: App.account});
        window.location.reload();
    },
    
    // Loader function 
    setLoading: (Boolean) => {
        App.loading = Boolean;
        const loader  = $('#loader'),
              content = $('#content');
        
        if (Boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    }
}

// Load the Application!
$(() => {
    $(window).load(() => {
        App.load();
    })
});