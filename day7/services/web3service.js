const {Web3} = require('web3');

class Web3Service {
  constructor() {
    this.web3 = new Web3('https://eth-mainnet.alchemyapi.io/v2/nY77MCqT3zzuW4puu7FbUijtpljWfdH8');
  }

  createAccount() {
    return this.web3.eth.accounts.create();
  }

  getBalance(address) {
    return this.web3.eth.getBalance(address);
  }

  sendTransaction(transactionObject) {
    return this.web3.eth.sendTransaction(transactionObject);
  }

  generateAccountFromPrivateKey(privateKey) {
    return this.web3.eth.accounts.privateKeyToAccount(privateKey);
   }

  signData(account, data='') {
    return account.sign(data);
  }

}

module.exports = Web3Service;
