import fs from "fs";
import { ethers } from "hardhat";

ethers.provider.on('debug', (info) => {
  console.log(info.action);
  console.log(info.request);
  console.log(info.response);
  // console.log(info.provider);
});

async function main() {
  let erc20ABI = await ethers.getContractFactory("MockToken");
  let token = await erc20ABI.deploy();

  let flowABI = await ethers.getContractFactory("Flow");
  const blocksPerEpoch = 1000000;
  let flow = await flowABI.deploy("0x0000000000000000000000000000000000000000", blocksPerEpoch, 0);

  await token.approve(flow.address, 1e9);

  let mineABI = await ethers.getContractFactory("PoraMineTest");
  // TODO: deploy new contracts
  let mine = await mineABI.deploy(flow.address, "0x0000000000000000000000000000000000000000", 4);

  const output = `token = '${token.address}'\nflow = '${flow.address}'\nPoraMine = '${mine.address}'`;

  console.log(output);
  fs.writeFileSync("./deploy/localtest.py", output);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
