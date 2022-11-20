// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./Mars.sol";

contract MarsV2 is Mars {
    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
        onlyOwner
    {}

    function getVersion() public pure virtual override returns (uint256) {
        return 2;
    }
}
