// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    // keep track of the to-do list items 
    uint public taskCount = 0; // variables are written => blockchain unsigned int -  cannot be negative

    // Define data type - like the model
    struct Task {
        uint id;
        string content;
        bool completed;  
    }

    // Create Mapping (key/value pair) like an array/obj? hash
    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("Check out SLMODD.COM");
    }

    // Create a task inside the mapping 
    function createTask(string memory _content) public {
        // detemine the ID of the taks we are creating 
        taskCount ++;
        // Create the new task and add it to the countindexed array. 
        // IE = create new Task _blank_ w/ text here that is incomplete -> array[0]. ++
        tasks[taskCount] = Task(taskCount, _content, false);
    }
} 