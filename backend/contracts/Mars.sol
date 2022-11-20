// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// @openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Mars is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __Ownable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
        onlyOwner
    {}

    function getVersion() public pure virtual returns (uint256) {
        return 1;
    }
}
