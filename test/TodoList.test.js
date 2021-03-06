const { assert } = require("chai");

const TodoList = artifacts.require('./TodoList.sol');

/* !!IMPORTANT: ALL TEST GO IN THE BELOW CALLBACK */
// @params - accounts === ALL accounts on the blockchain network
contract('TodoList', (accounts) => {
    before( async () => {
        this.todoList = await TodoList.deployed();
    })

    it('deploys successfully', async () => {
        const address = await this.todoList.address;

        // check that the address exists 
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async () => {
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(), taskCount.toNumber()); // <- this is the same as if task.id === taskCount (used as ID)
        assert.equal(task.content, "Check out SLMODD.COM");
        assert.equal(task.completed, false);
        assert.equal(taskCount.toNumber(), 1);
    })

    it('creates tasks', async () => {
        const result    = await this.todoList.createTask("A new Task!");
        const taskCount = await this.todoList.taskCount();
        assert.equal(taskCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.content, "A new Task!");
        assert.equal(event.completed, false);
    })

    it('updates tasks', async () => {
        const updatedTask = await this.todoList.modifyTask(1, "Updated Task 2");
        const taskCount = await this.todoList.taskCount();
        assert.equal(taskCount, 2);
        const event = updatedTask.logs[0].args;
        assert.equal(event.id.toNumber(), taskCount.toNumber() - 1);
        assert.equal(event.content, "Updated Task 2");
        assert.equal(event.completed, false);
    })

    it('completes tasks', async () => {
        const completedTask = await this.todoList.toggleComplete(1);
        const task = await this.todoList.tasks(1);
        assert.equal(task.completed, true);
        const event = completedTask.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.completed, true);
    })
});