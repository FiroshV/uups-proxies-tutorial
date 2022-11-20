# UUPS Proxies Tutorial

This tutorial will walk you through the process of creating a UUPS proxy contract.

## What is a UUPS proxy?

A UUPS proxy is a proxy contract that uses the [Universal Upgradeable Proxy Standard](https://eips.ethereum.org/EIPS/eip-1822) to upgrade the implementation of the proxy contract.

## Steps to run this tutorial

Below are the steps to run this tutorial with local hardhat node.

1. Clone this repository
2. Inside the backend directory run `yarn` to install the dependencies.
3. Run `yarn hardhat node --tags mars,frontend` to start a local hardhat node and deploy the contract.
4. Open a new terminal from the frontend directory and run `yarn` to install the dependencies.
5. Run `yarn dev` to start the frontend.
6. Open <http://localhost:3000> to view the app.
7. Click on the `Connect` button to connect your Metamask account.
8. Connect your Metamask account to the local hardhat node.
9. Refer ![hardhat network details](https://github.com/FiroshV/uups-proxies-tutorial/blob/main/images/hardhat_network_details.png) to add the local hardhat network to your Metamask account.
10. Import first account from the local hardhat node using the private key to your Metamask account.
11. Once you have connected your Metamask account, click on the `Check Version` button.
12. You should see the version of the contract as `1`.
13. Open a new terminal from the backend directory and run `yarn hardhat deploy --network localhost --tags marsV2`.
14. Wait for the contract to be deployed.
15. Once the contract is deployed, click on the `Check Version` button again.
16. You should see the version of the contract as `2`.
17. If you are trying to redloy the contracts, make sure to reset your Metamask account from advanced settings ![Reset account](https://github.com/FiroshV/uups-proxies-tutorial/blob/main/images/reset_account.png).

## TODO

- [ ] Add tests for the contracts

## References

- [Openzeppelin UUPS Proxy Tutorial](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)  
- [Full blockchain Solidity course - js](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
