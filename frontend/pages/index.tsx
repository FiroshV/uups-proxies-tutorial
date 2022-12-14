import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import { BigNumber } from "ethers";

interface contractAddressesInterface {
    [key: string]: string[];
}

export default function Home() {
    const [version, setVersion] = useState("Welcome to the UUPS demo !!!");
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const addresses: contractAddressesInterface = contractAddresses;
    const chainId = parseInt(chainIdHex!);
    const proxyAddress = chainId in contractAddresses ? addresses[chainId][0] : null;

    const { runContractFunction: getVersion } = useWeb3Contract({
        abi: abi,
        contractAddress: proxyAddress!,
        functionName: "getVersion",
        params: {},
    });

    const fetchVersion = async () => {
        const result = ((await getVersion()) as BigNumber).toString();
        setVersion(result);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="grid place-content-center h-48">
                {version.length < 2 ? `Current version is : ${version}` : version}
            </div>
            <div
                className="grid place-content-center w-40 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 mx-auto"
                onClick={fetchVersion}
            >
                Check Version
            </div>
        </div>
    );
}
