// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable@4.4.0/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.4.0/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.4.0/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.4.0/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.4.0/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.4.0/proxy/utils/Initializable.sol";

/// @custom:security-contact mariano.silva@gmail.com
contract ProsusBSC is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
/**
 * @dev Prosus-BNB 2.0 ( draft 0.1 ) (C) Mariano Silva
 * 
 * -- Esta es la base del contrato upgradeable. 
 * 
 * -- Falta definir el proceso de MINTEO como se manejará, quizas recibiendo BNB con un precio de base como en Prosus-BNB 1.0
 */
    constructor() initializer {}

    function initialize() initializer public {
        __ERC20_init("Prosus-BSC", "PROSUS");
        __ERC20Burnable_init();
        __Pausable_init();
        __Ownable_init();
        __ERC20Permit_init("Prosus-BSC");

        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
