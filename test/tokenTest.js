const { assert } = require("chai");
const token = artifacts.require("token");
contract("token",function(accounts){
    var tokenInstance; 
    it("check name",function (){
        return token.deployed().then(instance=>{
            tokenInstance=instance;
            return tokenInstance.name();
        }).then(check=>{
            assert.equal(check,"yakshesh","name issue")
        })
    })  
    it("set the total amount on dep",function (){
        return token.deployed().then(instance=>{
            tokenInstance=instance;
            return tokenInstance.total_supply();
        }).then(check=>{
            assert.equal(check.toNumber(),100,"sets the total supply to 100")
            return tokenInstance.balanceOf(accounts[0])
        }).then(checke=>{
            assert.equal(checke.toNumber(),100,"sets the total supply to 100 yeah boi")
        })
    })
    it("check transfer",function (){
        return token.deployed().then(instance=>{
            tokenInstance=instance;
            return tokenInstance.transfer.call(accounts[1],99)
        }).then(assert.fail).catch(error=>{
            // assert(error.message.indexOf('revert')>=0,"error should contain revert")
            return tokenInstance.transfer.call(accounts[1],25,{from:accounts[0]})
        }).then(res=>{
            assert.equal(res,true,"value is true")
            console.log(res);
            return tokenInstance.transfer(accounts[1],25,{from:accounts[0]})
        })
        .then(res=>{
            assert.equal(res.logs.length,1,"1 event emmited")
            assert.equal(res.logs[0].event,"_Transfer","should be the transfer event")
            assert.equal(res.logs[0].args._from,accounts[0],"account _from")
            assert.equal(res.logs[0].args._amount,25,"_amount")
            assert.equal(res.logs[0].args._to,accounts[1],"account _to")
            return tokenInstance.balanceOf(accounts[1])
        }).then(res=>{
            assert.equal(res.toNumber(),25,"less transfered")
            return tokenInstance.balanceOf(accounts[0])
        }).then(res=>{
            assert.equal(res.toNumber(),75,"less transfered_______")
        })
    })
    it("amount",function (){
        return token.deployed().then(instance=>{
            tokenInstance=instance;
            return tokenInstance.approve(accounts[1],25,{from:accounts[0]});
        }).then(res=>{
            assert.equal(res.logs.length,1,"approve event")
            assert.equal(res.logs[0].args._spender,accounts[1],"_spender")
            assert.equal(res.logs[0].args._owner,accounts[0],"_owner")
            assert.equal(res.logs[0].args._amount,25,"_amount")
            return tokenInstance.allowance(accounts[0],accounts[1])
        }).then(res=>{
            assert.equal(res,25,"25 tokens limit")
        })
    }) 
    it("dalagated token transfer",function (){
        return token.deployed().then(instance=>{
            tokenInstance=instance;
            return tokenInstance.transferFrom.call(accounts[1],accounts[2],25,{from:accounts[0]})
        }).then(res=>{
            assert.equal(res,true,"true TF")
            // console.log(res);
        })
    }) 
})