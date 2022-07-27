// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "./token.sol";
contract tokenSale{
    token public Token;
    uint public tokenSold;
    address private admin;
    uint public tokenPrice=10000;
    event Sell(address _buyer,uint _amount);
    constructor (token _token,uint _tokenPrice){
        admin=msg.sender;
        Token=_token;
        tokenPrice=_tokenPrice;
    }
    function buyToken(uint _amount) public payable{
        require(msg.value==(_amount*tokenPrice),"pay equal amount");
        require(Token.balanceOf(address(this))>=_amount,"nooooo");
        require(Token.transfer(msg.sender, _amount),"transfer unsuccessful");
        tokenSold+=_amount;
        emit Sell(msg.sender,_amount);
    }
    // end sale
    function endSale() public {
        require(msg.sender==admin,"only admin");
        require(Token.transfer(admin,Token.balanceOf(address(this))),"cannnot be tranfered");
        // transfer rest of token to adminik

        
    }

}