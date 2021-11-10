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
});