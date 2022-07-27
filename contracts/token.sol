// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract token{
    string public name;
    string public symbol;
    uint public total_supply;
    event _Transfer(address indexed _from,address indexed _to,uint _amount);
    event _Approve(address indexed _owner, address indexed _spender,uint _amount);
    mapping (address=>uint) public balanceOf;
    mapping (address=> mapping(address=>uint)) public allowance;//main=>another=>amount
    constructor(uint _totalsupply,string memory _name,string memory _symbol)   {
        name=_name;
        symbol=_symbol;
        balanceOf[msg.sender]=_totalsupply;
        total_supply=_totalsupply;
    }
    function transfer(address _to,uint _amount) public returns(bool success) {
        require(balanceOf[msg.sender]>=_amount,"not enough token");
        // transfer
        balanceOf[msg.sender]-=_amount;
        // to
        balanceOf[_to]+=_amount;
        // emit
        emit _Transfer(msg.sender, _to, _amount);
        return true;
    }
    // approve
    function approve(address _spender , uint _amount) public returns (bool sucess){
        balanceOf[_spender]+=_amount;
        allowance[msg.sender][_spender]=_amount;
        emit _Approve(msg.sender, _spender, _amount);
        return true;
    }
    function transferFrom(address _from,address _to,uint _amount) public returns(bool success){
        require(allowance[msg.sender][_from]>=_amount,"hello");
        require(balanceOf[_from]>=_amount,"not enough token");
        // transfer
        allowance[msg.sender][_from]-=_amount;
        balanceOf[_from]-=_amount;
        // to
        balanceOf[_to]+=_amount;
        // emit
        emit _Transfer(_from, _to, _amount);
        return true;
    }
}