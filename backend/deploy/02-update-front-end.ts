import { DeployFunction } from "hardhat-deploy/types";
import * as fs from "fs";
import { FRONT_END_ADDRESSES_FILE, FRONT_END_ABI_FILE } from "../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const updateFrontEnd: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, ethers, network, artifacts } = hre;
    const { log } = deployments;
    if (process.env.UPDATE_FRONT_END) {
        log("Updating front end...");
        const contractAddress = process.env.CONTRACT_ADDRESS;
        const marsArtifactPath = "./artifacts/contracts/Mars.sol/Mars.json";
        updateContractAddresses({
            log,
            network,
            ethers,
            contractAddress,
            marsArtifactPath,
        });
        updateAbi({ log, ethers, contractAddress, marsArtifactPath });
    }
};

async function updateAbi({ log, ethers, contractAddress, marsArtifactPath }: any) {
    // const mars = await ethers.getContract("Mars");
    const marsArtifact = JSON.parse(fs.readFileSync(marsArtifactPath, "utf8"));
    const mars = new ethers.Contract(contractAddress, marsArtifact.abi, ethers.provider);
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        mars.interface.format(ethers.utils.FormatTypes.json) as any
    );

    log("ABI successfully updated to frontend");
}

async function updateContractAddresses({
    log,
    network,
    ethers,
    contractAddress,
    marsArtifactPath,
}: any) {
    // const mars = await ethers.getContract("Mars");
    log("contractAddress: ", contractAddress);
    // const mars = await ethers.getContractAt("Mars", contractAddress);
    // const marsArtifact = await artifacts.readArtifact("Mars");
    const marsArtifact = JSON.parse(fs.readFileSync(marsArtifactPath, "utf8"));
    const mars = new ethers.Contract(contractAddress, marsArtifact.abi, ethers.provider);

    log("Updating front end with contract addresses...", mars.address);

    const chainId = network.config.chainId!.toString();
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"));
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId].includes(mars.address)) {
            contractAddresses[chainId].push(mars.address);
        }
    } else {
        contractAddresses[chainId] = [mars.address];
    }


    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses));

    log("Contract addresses successfully updated to frontend");
}

export default updateFrontEnd;

updateFrontEnd.tags = ["all", "frontend"];
