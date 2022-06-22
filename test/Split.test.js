const SplitPayment = artifacts.require("SplitPayment");

contract("Split contract tests", accounts =>{
    NUMBER_OF_RECEIVERS = 5
    const sender = accounts[0];
    let receivers = [];
    let amounts = [];
    let sum = 0;
    for (i = 0; i < NUMBER_OF_RECEIVERS; i++)
    {
        receivers.push(accounts[i+1]);
        amounts.push(Math.floor(Math.random()*50));
        sum += amounts[i];
    }

    it("payment gets correctly split", async () =>{
        let initialAmmount = await web3.eth.getBalance(accounts[1]);    
        let splitPayment = await SplitPayment.deployed();
        await splitPayment.splitEther(receivers, amounts, {value: sum, from: accounts[0]});
        for (i = 0; i < NUMBER_OF_RECEIVERS; i++)
        {
            currentBalance = await web3.eth.getBalance(receivers[i]);
            assert.equal(parseInt(initialAmmount)+amounts[i], currentBalance);
        }
    });

    it("number of receivers is different from number of ammounts - error should be catched", async () => {
        let splitPayment = await SplitPayment.deployed();
        try {
            await splitPayment.splitEther(receivers.slice(0, -1), amounts, {value: sum, from: accounts[0]});
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "There must be same number of receivers as ammounts");
        };
    });

    it("number of receivers must be greater than 0", async () => {
        let splitPayment = await SplitPayment.deployed();
        try {
            await splitPayment.splitEther([], [], {value: sum, from: accounts[0]});
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "You must provide at least one receiver");
        };
    });

    it("Amount of ether sent in the transaction must be equal to the sum of ammounts", async () => {
        let splitPayment = await SplitPayment.deployed();
        try {
            await splitPayment.splitEther(receivers, amounts, {value: sum - 1, from: accounts[0]});
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "Total ammout to be distributed must equal to number of ethers sent");
        };
    });

    it("Amount of ether sent in the transaction must be equal to the sum of ammounts", async () => {
        let splitPayment = await SplitPayment.deployed();
        try {
            await splitPayment.splitEther(receivers, amounts, {value: sum + 1, from: accounts[0]});
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "Total ammout to be distributed must equal to number of ethers sent");
        };
    });

    it("Amount of ether sent in the transaction must be equal to the sum of ammounts", async () => {
        let splitPayment = await SplitPayment.deployed();
        try {
            await splitPayment.splitEther(receivers, amounts, {value: 0, from: accounts[0]});
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "Total ammout to be distributed must equal to number of ethers sent");
        };
    });

})
