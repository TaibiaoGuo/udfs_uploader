
// 本教程使用了一个UDFS测试节点，不需要您自己搭建UDFS节点，若发现UDFS临时节点连接失
// 败请发送邮件至 dev@ulord.one 或者提交issue。您可以自己搭建本地udfs节点。

const UDFS = require('ipfs-api');
const udfs = new UDFS({ host: 'udfs1.ulord.one', port: 5001, protocol: 'http' });

//使用本地UDFS节点
// const udfsApi = require('ipfs-api');
// const udfs = new udfsApi('localhost', '5001', {protocol: 'http'});

export default udfs;
