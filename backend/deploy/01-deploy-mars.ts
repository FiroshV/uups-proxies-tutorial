import { upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import verify from "../utils/verify";
import * as fs from "fs";
import * as os from "os";

const deployMars: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");

    const Mars = await ethers.getContractFactory("Mars");

    log("Deploying Mars...");

    const proxy = await upgrades.deployProxy(Mars, [], {
        initializer: "initialize",
        kind: "uups",
    });

    await proxy.deployed();

    log("Proxy deployed to:", proxy.address);
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(proxy.address, []);
    }

    setEnvValue("CONTRACT_ADDRESS", proxy.address);
    log("----------------------------------------------------");
};

function setEnvValue(key: any, value: any) {
    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(
        ENV_VARS.find((line) => {
            return line.match(new RegExp(key));
        }) as any
    );

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `${key}=${value}`);

    // write everything back to the file system
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

export default deployMars;
deployMars.tags = ["all", "mars"];
