// await upgrades.upgradeProxy(proxyAddress, MyTokenV2);
// CONTRACT_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
import { upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployMars: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");

    const MarsV2 = await ethers.getContractFactory("MarsV2");

    log("Deploying MarsV2...");

    // proxy address

    const proxyAddress = process.env.CONTRACT_ADDRESS;

    const updatedImplementationProxy = await upgrades.upgradeProxy(proxyAddress!, MarsV2);

    await updatedImplementationProxy.deployed();

    log("Proxy address:", updatedImplementationProxy.address);
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(updatedImplementationProxy.address, []);
    }

    log("----------------------------------------------------");
};

export default deployMars;
deployMars.tags = ["all", "marsV2", "upgrade"];
