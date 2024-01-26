import { ethers } from "hardhat";

async function main() {
  // const factory = await ethers.getContractFactory("Counter");

  // // If we had constructor arguments, they would be passed into deploy()
  // let contract = await factory.deploy();

  // console.log(`The address the Contract WILL have once mined: ${contract.address}`);

  // console.log(
  //   `The transaction that was sent to the network to deploy the Contract: ${contract.deployTransaction.hash}`
  // );

  // console.log("The contract is NOT deployed yet; we must wait until it is mined...");
  // await contract.deployed();
  // console.log("Mined!");
  const MagicMockToken = await ethers.getContractFactory("Magic");
  const magicMockToken = await MagicMockToken.deploy();
  await magicMockToken.deployed();

  const RewardPool = await ethers.getContractFactory("RewardPool");
  const rewardPool = await RewardPool.deploy(
    magicMockToken.address,
    magicMockToken.address,
    "0xA7f2F87701B414FA7818b1DE789d3ac50D1cc69b"
  );
  await rewardPool.deployed();

  console.log("MagicMockToken deployed to:", magicMockToken.address);
  console.log("RewardPool deployed to:", rewardPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
