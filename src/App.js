import {Table, Grid, Button, Form} from 'react-bootstrap';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import udfs from './udfs';
import storehash from './storehash';

class App extends Component {

    state = {
        udfsHash: null,
        buffer: '',
        ethAddress: '',
        blockNumber: '',
        transactionHash: '',
        gasUsed: '',
        txReceipt: ''
    };

    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async (reader) => {
        //加载文件准备上传到UDFS
        const buffer = await Buffer.from(reader.result);
        //使用es6语法设置此缓冲区
        this.setState({buffer});
    };

    onClick = async () => {

        try {
            this.setState({blockNumber: "等待.."});
            this.setState({gasUsed: "等待..."});

            // 点击控制台获取交易数据
            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
                console.log(err, txReceipt);
                this.setState({txReceipt});
            }); //等待 getTransactionReceipt

            await this.setState({blockNumber: this.state.txReceipt.blockNumber});
            await this.setState({gasUsed: this.state.txReceipt.gasUsed});
        } //try
        catch (error) {
            console.log(error);
        } //获取
    } //点击

    onSubmit = async (event) => {
        event.preventDefault();


        // 读取用户的MetaMask账户地址
        const accounts = await web3.eth.getAccounts();

        console.log('从MetaMask账户发送: ' + accounts[0]);

        // 从 fileHashStore.sol 获取合同地址
        const ethAddress = await storehash.options.address;
        this.setState({ethAddress});

        //将文件保存到UDFS，返回其Hash，并将Hash设置为state
        await udfs.add(this.state.buffer, (err, udfsHash) => {
            console.log(err, udfsHash);

            // 通过将udfsHash设置为udfsHash[0].hash 来设置 setState
            this.setState({udfsHash: udfsHash[0].hash});


            storehash.methods.sendHash(this.state.udfsHash).send({
                from: accounts[0]
            }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
            }); //存储hash
        }) //等待 udfs.add
    }; //提交

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h1>欢迎使用Ulord搭建的分布式文件存储系统</h1>
                </header>

                <hr/>

                <Grid>
                    <h3> 选择要发送到UDFS的文件 </h3>
                    <Form onSubmit={this.onSubmit}>
                        <input
                            type="file"
                            onChange={this.captureFile}
                        />
                        <Button
                            bsStyle="primary"
                            type="submit">
                            发送
                        </Button>
                    </Form>

                    <hr/>
                    <Button onClick={this.onClick}> 获取交易数据 </Button>

                    <Table bordered responsive>
                        <thead>
                        <tr>
                            <th>交易回执类型</th>
                            <th>值</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>UDFS Hash( 存储在Ulord)</td>
                            <td>{this.state.udfsHash}</td>
                        </tr>
                        <tr>
                            <td>Ulord 合约地址</td>
                            <td>{this.state.ethAddress}</td>
                        </tr>

                        <tr>
                            <td>交易Hash</td>
                            <td>{this.state.transactionHash}</td>
                        </tr>

                        <tr>
                            <td>区块高度 </td>
                            <td>{this.state.blockNumber}</td>
                        </tr>

                        <tr>
                            <td>Gas 费用</td>
                            <td>{this.state.gasUsed}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Grid>
            </div>
        );
    } //网页渲染
}

export default App;
