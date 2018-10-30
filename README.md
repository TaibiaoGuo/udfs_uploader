# UDFS_Uploader

[TOC]

## 1.简介
   UDFS_Uploader 是一个为社区开发者熟悉Ulord使用而创建的demo项目，跟随本教程重新开发一遍本项目，您将了
解到如何在Ulord上开发出属于自己的分布式应用程序。
本教程首先将文件存储在UDFS（Ulord分布式存储系统）上，再将Hash（一种文件特征码）存储在Ulord链上。

   文件Hash可以验证文件正确性，在链上存储文件Hash后此Hash不会被篡改，而文件存储在支持版本控制的UDFS上，我
们可以通过文件Hash得到文件的特定版本并验证文件是否正确。


   本教程运行效果如图所示：
【图】





```
              +----------+
              |          |
     +--------+   DAPP   +---------+
     |        |          |         |
     |        +----+-----+         |
 file|             ^               |
     |             |               |  fileHash
     |             | fileHash      |
     |             |               |
+----v----+        |          +----v----+
|         |        |          |         |
|  UDFS   +--------+          |   USC   |
|         |                   |         |
+---------+                   +---------+

           UDFS Uploader 原理图
```
   本项目通过UDFS api 将文件上传至UDFS 网络，UDFS返回文件Hash值给DAPP，通过web3j我们可以很方便地让前
端与区块链进行交互，这里我们利用web3j和Chrome浏览器的钱包插件MetaMask交互，调用智能合约fileHashStore
中的方法将文件Hash保存到Ulord测试侧链USC中，DAPP利用了web3 V1.0.0 的新特性 async进行异步等待，更优雅
地等待UDFS和USC的反馈。

## 2.如何运行本项目

*step 1.如果未安装`nodejs`，请先安装:*
```
# linux-ubuntu 环境安装步骤

sudo apt install nodejs
sudo npm -g install n
sudo n stable

# linux-centos 环境安装步骤

sudo yum install nodejs
sudo npm -g install n
sudo n stable

# mac 环境安装步骤

# step1:若未安装包管理器 HomeBrew 请先安装 HomeBrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# step2:利用 HomeBrew 安装nodejs 
brew install nodejs
npm install n
n stable

# windowindows 环境安装步骤

下载`nodejs V11.0.0`并安装，地址：https://nodejs.org/dist/v11.0.0/node-v11.0.0-x86.msi
```

*step 2.安装本项目依赖包*

```
npm install -g create-react-app
npm install reat-bootstrap
npm install fs-extra
npm install ipfs-api
npm install web3@^1.0.0-beta.26
```

*step 3.在Chrome浏览器中安装钱包插件`MetaMask`并连接到USC测试网（若不进行上链操作可不进行此步）

*3.1 根据MetaMask的提示生成自己的地址*
*3.2 将MetaMask切换到USC测试网*
    点击`Main Ethereum Network`，在下拉菜单中选择 `Custom RPC`,在新弹出界面中的 `setting` 选项卡中
找到 `New RPC URL` ，填入USC测试网RPC通信地址：`http://usc.ulord.one:58858`, 点击旁边的`SAVE`进行
保存。此时 MetaMask 会自动切换到USC测试网，若未切换请自行点击点击`Main Ethereum Network`，在下拉菜单中
选择 `http://usc.ulord.one:58858` 。
*3.3 获取一点USC测试币*
    因为每次一上链操作都需要费用，因此我们还需要获取一点USC测试币。
    USC测试币获取网址是`usc.ulord.one:8088/faucet/`
    在网页我们填入MetaMask为我们生成的地址，点击 `MetaMask`地址中的 `Account 1`即可复制您的地址，稍等一
    会儿就有10tSUT存入您的账户。


*step 4.运行本项目*

在本项目目录下运行命令 `npm start`
