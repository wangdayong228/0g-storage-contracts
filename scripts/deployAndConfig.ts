import fs from "fs";
import path from "path";
import { deployNoMarket } from "./deploy";

function setCwd() {
    // 获取当前工作目录
    console.log(`Current working directory: ${process.cwd()}`);

    // 假设你要将工作目录更改为项目的根目录
    const newDirectory = path.resolve(__dirname, '..'); // 假设当前文件在项目的子目录中
    process.chdir(newDirectory);

    // 获取更改后的工作目录
    console.log(`New working directory: ${process.cwd()}`);
}

function writeConfig(config: string, file: string) {
    fs.writeFileSync(file, config)
}

function genZgnodeConfig(flow: string, mine: string, blockNumber: number): string {
    return `
log_config_file = "log_config"
network_libp2p_port = 11000
network_discovery_port = 11000
rpc_listen_address = "127.0.0.1:11100"
log_contract_address = "${flow}"
mine_contract_address = "${mine}"
blockchain_rpc_endpoint = "https://etest-rpc.nftrainbow.cn/JwtQFtZXar"
network_libp2p_nodes = []
log_sync_start_block_number = ${blockNumber}
`
}

function genZgKvConfig(flow: string, blockNumber: number) {
    return `
stream_ids = ["000000000000000000000000000000000000000000000000000000000000f2bd", "000000000000000000000000000000000000000000000000000000000000f009", "0000000000000000000000000000000000000000000000000000000000016879", "0000000000000000000000000000000000000000000000000000000000002e3d"]

db_dir = "db"
kv_db_dir = "kv.DB"

rpc_enabled = true
rpc_listen_address = "127.0.0.1:6789"
zgs_node_urls = "http://127.0.0.1:11100"

log_config_file = "log_config"

blockchain_rpc_endpoint = "https://etest-rpc.nftrainbow.cn/JwtQFtZXar"
log_contract_address = "${flow}"
log_sync_start_block_number = ${blockNumber}
`
}

function genZgToolConfig(flow: string) {
    return `
blockChain:
  url: "https://etest-rpc.nftrainbow.cn/JwtQFtZXar"
  # url: "http://127.0.0.1:8545"
  flowContract: "${flow}"
  templateContract: "0x34Ab680c8De93aA0742EF5843520E86239B954EF"
storageNodes:
  - "http://127.0.0.1:11100"
kvNode: "http://127.0.0.1:6789"
zkNode: "http://127.0.0.1:3030"
privateKeys:
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e23" #0x26154DF6A79a6C241b46545D672A3Ba6AE8813bE
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e24" #0xd68D7A9639FaaDed2a6002562178502fA3b3Af9b
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e25" #0xe61646FD48adF644404f373D984B14C877957F7c
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e26" #0xE7b3CafBf258804B867Df17e0AE5238030658a03
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e27" #0x8Faf8127849e4157dD086C923576a4029cA4E2B5
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e28" #0x0513B660EaBb10Ee88b8AC69188d3994f184a3D9
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e29" #0x60E54B5daD7331a85c3408A887588430B19b26D6
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e30" #0xB1b635163C5f58327b2FeD3a83131B6B209082C8
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e31" #0x581773C26661fA73f45516a72a138341F75a4cDD
  - "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e32" #0xC933adff23Ce870B290C3D59b872855568eBE505
log : info # info,debug
`
}

async function main() {
    setCwd()

    const result = await deployNoMarket();
    const { flow, mine, blockNumber } = result;
    
    // gen and write zg-node config
    let config = genZgnodeConfig(flow, mine, blockNumber)
    writeConfig(config, "../0g-storage-node/run/config.toml")
    // gen and write zg-kv config
    config = genZgKvConfig(flow, blockNumber)
    writeConfig(config, "../0g-storage-kv/run/config.toml")
    // gen and write zg-tool config
    config = genZgToolConfig(flow)
    writeConfig(config, "../storage-tool/config.yaml")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });