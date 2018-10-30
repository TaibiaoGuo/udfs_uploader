//本示例使用remix和MetaMask进行开发

contract fileHashStore {
 string udfsHash;

    //将文件哈希存储到链上，需要利用MetaMask进行签名

    //下面是一个叫做natspec的特殊注释，
    //由3个连续的斜杠标记，当询问用户确认交易事务时将显示。

    ///本交易将使一个将文件哈希存储到链上的智能合约上链
 function sendHash(string fileHash) public {
   udfsHash = fileHash;
 }

    //在区块链上查询文件
 function getHash() public view returns (string fileHash) {
   return udfsHash;
 }
}
