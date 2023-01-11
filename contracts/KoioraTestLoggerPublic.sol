// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title KoioraTestLoggerPublic
 * update the log with an event activity hash
 * contract calls are not restricted
 */

contract KoioraTestLoggerPublic {
    event UpdateProgressEvent(bytes32 hash);

    /**
     * @param sha256Hash a 32-byte hash object to be emitted
     */
    function writeHash(bytes32 sha256Hash) public {
        require(sha256Hash != bytes32(0), "Invalid input: sha256Hash should be a 32 byte object");
        emit UpdateProgressEvent(sha256Hash);
    }
}
