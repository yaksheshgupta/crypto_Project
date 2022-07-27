const token = artifacts.require("token");
const tokenSale = artifacts.require("tokenSale");

module.exports = function (deployer) {
  deployer.deploy(token,100,"yakshesh","YKSH").then(()=>{
      return deployer.deploy(tokenSale,token.address,10000);
  })
  
};
