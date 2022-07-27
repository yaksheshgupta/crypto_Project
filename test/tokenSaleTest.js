const { assert } = require("chai");
const TokenSale = artifacts.require("tokenSale");
const Token = artifacts.require("token");
contract("tokenSale",function(accounts){
    var tokenSale
    var token
    const tokenPrice=10000;
    it("sale test",function(){
        return TokenSale.deployed().then(instance=>{
            tokenSale=instance
            return Token.deployed()
        }).then(instance=>{
            token=instance
            token.transfer(tokenSale.address,75,{from:accounts[0]})
            return tokenSale.tokenPrice()
        }).then(res=>{
            assert.notEqual(res,0,"token value is 0")
        })
    })
    it("test",function(){
        return TokenSale.deployed().then(instance=>{
            tokenSale=instance
            return Token.deployed()
        }).then(instance=>{
            token=instance
            value=75*tokenPrice
            // console.log(value);
            // token.transfer(tokenSale.address,75,{from:accounts[0]})
            console.log(token.balanceOf(tokenSale.address));
            return tokenSale.buyToken(15,{from:accounts[8],value:value})
        }).then(assert.fail).catch(err=>{
            // console.log(err);
        })
    })
    it("BuyToken",function(){
        return TokenSale.deployed().then(instance=>{
            tokenSale=instance
            var value=15*tokenPrice
            return tokenSale.buyToken(15,{from:accounts[0],value:value})
        }).then(res=>{
            assert.equal(res.logs.length,1,"1 event emmited")
            assert.equal(res.logs[0].event,"Sell","should be the transfer event")
            assert.equal(res.logs[0].args._buyer,accounts[1],"account _from")
            assert.equal(res.logs[0].args._amount,15,"_amount")
            return tokenSale.tokenSold()
        }).then(res=>{
            assert.equal(res.toNumber(),15,"token sold 15")
            var value=16*tokenPrice
            return token.balanceOf(tokenSale.address)
        }).then(res=>{
            assert.equal(res.toNumber(),75,"token 75")
            // console.log(res.toNumber());
            return tokenSale.buyToken(15,{from:accounts[1],value:value})
        }).then(assert.fail).catch(error=>{
            assert(error.message.indexOf('revert')>=0,"send equal amount")
            var value=80*tokenPrice
            return tokenSale.buyToken(80,{from:accounts[1],value:value})
        }).then(assert.fail).catch(error=>{
            // assert(error.message.indexOf('revert')>=0,"send equal")
            // console.log(error);
        })
    })

    it("end sale",()=>{
        return TokenSale.deployed().then(instance=>{
            tokenSale=instance
            return Token.deployed()
        }).then(instance=>{
            token=instance
            return tokenSale.endSale({from:accounts[9]})
        }).then(assert.fail).catch(err=>{
            // console.log(err);
        })
    })





    
})