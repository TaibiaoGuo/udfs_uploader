import web3 from './web3';

//将此合约部署到测试链USC（Ulord侧链）上
//将此地址改为您合约的地址
const address = '0x78c9c31e8aa70d16d16c2e5caf6b5ffd3ef03302';
//将此ABI替换成您从remix出来的ABI
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getHash",
        "outputs": [
            {
                "name": "fileHash",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "fileHash",
                "type": "string"
            }
        ],
        "name": "sendHash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export default new web3.eth.Contract(abi, address);