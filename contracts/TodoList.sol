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

    // TRIGGER: Task Created - Event Listener  
    event TaskCreated(
        uint id,
        string content, 
        bool completed
    );

    // TRIGGER: Task Completed - Event Listener
    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public {
        createTask("Check out SLMODD.COM");
    }

    function createTask(string memory _content) public {
        // detemine the ID of the taks we are creating 
        taskCount ++;
        // Create the new task and add it to the count indexed array. 
        // IE = create new Task _blank_ w/ text here that is incomplete -> array[0]. ++
        tasks[taskCount] = Task(taskCount, _content, false);

        // broadcast event that this task was created
        // Whenever we call the createTask FN it can listen for us
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleComplete(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;

        // broadcast event that this task was completed
        // Whenver we call the toggleCompleted FN it can listen for us
        emit TaskCompleted(_id, _task.completed);
    }
} 