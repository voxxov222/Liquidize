// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CrossChainBridge
 * @dev Handles cross-chain NFT transfers and liquidity bridging
 */
contract CrossChainBridge is Ownable {
    
    struct BridgeRequest {
        uint256 tokenId;
        address owner;
        uint256 sourceChain;
        uint256 targetChain;
        uint256 timestamp;
        bool completed;
    }

    mapping(bytes32 => BridgeRequest) public bridgeRequests;
    mapping(uint256 => bool) public supportedChains;
    
    event BridgeInitiated(bytes32 indexed requestId, uint256 tokenId, uint256 sourceChain, uint256 targetChain);
    event BridgeCompleted(bytes32 indexed requestId, uint256 tokenId);

    constructor() Ownable(msg.sender) {
        // Initialize supported chains
        supportedChains[1] = true;      // Ethereum
        supportedChains[137] = true;    // Polygon
        supportedChains[56] = true;     // BSC
        supportedChains[43114] = true;  // Avalanche
        supportedChains[42161] = true;  // Arbitrum
    }

    function initiateBridge(
        uint256 tokenId,
        uint256 targetChain
    ) public returns (bytes32) {
        require(supportedChains[targetChain], "Chain not supported");
        
        bytes32 requestId = keccak256(abi.encodePacked(
            tokenId,
            msg.sender,
            block.chainid,
            targetChain,
            block.timestamp
        ));

        bridgeRequests[requestId] = BridgeRequest({
            tokenId: tokenId,
            owner: msg.sender,
            sourceChain: block.chainid,
            targetChain: targetChain,
            timestamp: block.timestamp,
            completed: false
        });

        emit BridgeInitiated(requestId, tokenId, block.chainid, targetChain);
        return requestId;
    }

    function completeBridge(bytes32 requestId) public onlyOwner {
        require(!bridgeRequests[requestId].completed, "Already completed");
        
        bridgeRequests[requestId].completed = true;
        
        emit BridgeCompleted(requestId, bridgeRequests[requestId].tokenId);
    }

    function addSupportedChain(uint256 chainId) public onlyOwner {
        supportedChains[chainId] = true;
    }
}
