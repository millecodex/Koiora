// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title KoioraTestLogger
 * update the log with an event activity hash
 * calls restricted to owner or allowlist
 */
contract KoioraTestLogger {
    address owner;
    mapping (address => bool) authorizedUsers;
    event UpdateProgressEvent(bytes32 hash);

    // constructor visibility not needed for solidity >0.7
    constructor() {
        owner = msg.sender;
    }

    modifier onlyAuthorized {
        require(msg.sender == owner || authorizedUsers[msg.sender], "You are not authorized to execute this function");
        _;
    }
    
    /**
     * @param sha256Hash a 32-byte hash object to be emitted
     */
    function writeHash(bytes32 sha256Hash) public onlyAuthorized {
        require(sha256Hash != bytes32(0), "Invalid input: sha256Hash should be a 32 byte object");
        emit UpdateProgressEvent(sha256Hash);
    }

    function addAuthorizedUser(address user) public onlyOwner {
        require(user != address(0), "Invalid address");
        authorizedUsers[user] = true;
    }

    function removeAuthorizedUser(address user) public onlyOwner {
        authorizedUsers[user] = false;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner of the contract");
        _;
    }

    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
