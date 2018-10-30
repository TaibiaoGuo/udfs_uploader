
//本教程使用了Wvb3@1.0.0 的新特性 "await"，需要覆盖MetaMask的老方法
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default web3;