// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IRewards {
    function stake(address, uint256) external;

    function stakeFor(address, uint256) external;

    function queueNewRewards(uint256) external;

    function stakingToken() external returns (address);

    function rewardToken() external returns (address);
}

interface IMagicDepositor {
    function deposit(uint256) external;

    function depositFor(uint256 amount, address to) external;

    function claimMintedShares(uint256 atlasDepositIndex, bool stake) external returns (uint256);

    function update() external;

    function withdrawAndHarvestAll() external;

    function getUserDepositedMagic(uint256 atlasDepositId, address user)
        external
        view
        returns (uint256);
}

interface IPrMagicToken is IERC20Upgradeable {
    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;
}
