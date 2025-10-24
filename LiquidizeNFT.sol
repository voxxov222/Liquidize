// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LiquidizeNFT
 * @dev Dynamic NFT with embedded liquidity and AI agent capabilities
 */
contract LiquidizeNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct NFTMetadata {
        string personality;
        string[] abilities;
        uint256 liquidityValue;
        address liquidityToken;
        uint256 lastUpdate;
        bool isDynamic;
    }

    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(uint256 => mapping(string => uint256)) public abilityLevels;
    
    event NFTMinted(uint256 indexed tokenId, address indexed owner, uint256 liquidityValue);
    event NFTUpdated(uint256 indexed tokenId, string personality, string[] abilities);
    event LiquidityAdded(uint256 indexed tokenId, uint256 amount, address token);

    constructor() ERC721("Liquidize", "LQDZ") Ownable(msg.sender) {}

    function mintNFT(
        address recipient,
        string memory tokenURI,
        string memory personality,
        string[] memory abilities,
        uint256 liquidityValue,
        address liquidityToken
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        nftMetadata[newTokenId] = NFTMetadata({
            personality: personality,
            abilities: abilities,
            liquidityValue: liquidityValue,
            liquidityToken: liquidityToken,
            lastUpdate: block.timestamp,
            isDynamic: true
        });

        for (uint i = 0; i < abilities.length; i++) {
            abilityLevels[newTokenId][abilities[i]] = 1;
        }

        emit NFTMinted(newTokenId, recipient, liquidityValue);
        return newTokenId;
    }

    function updateNFTAbilities(
        uint256 tokenId,
        string[] memory newAbilities
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        
        nftMetadata[tokenId].abilities = newAbilities;
        nftMetadata[tokenId].lastUpdate = block.timestamp;

        emit NFTUpdated(tokenId, nftMetadata[tokenId].personality, newAbilities);
    }

    function addLiquidity(
        uint256 tokenId,
        uint256 amount,
        address token
    ) public payable {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        
        nftMetadata[tokenId].liquidityValue += amount;
        nftMetadata[tokenId].liquidityToken = token;

        emit LiquidityAdded(tokenId, amount, token);
    }

    function getNFTMetadata(uint256 tokenId) public view returns (NFTMetadata memory) {
        return nftMetadata[tokenId];
    }

    function getAbilityLevel(uint256 tokenId, string memory ability) public view returns (uint256) {
        return abilityLevels[tokenId][ability];
    }
}
