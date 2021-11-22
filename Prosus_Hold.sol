pragma solidity 0.4.26;

interface Prosus_AMM_interfaz {
    function buy(address _playerAddress) payable external returns(uint256);
    function sell(uint256 _amountOfTokens) external;
    function reinvest() external;
    function withdraw() external;
    function transfer(address _toAddress, uint256 _amountOfTokens) external returns(bool);
    function balanceOf(address _customerAddress) view external returns(uint256);
    function myDividends(bool _includeReferralBonus) external view returns(uint256);
}

contract Prosus_Hold_deploy {
    event HoldCreado(address indexed owner, address indexed ProsusHold);
    
    mapping (address => address) public ProsusHolder;
    
    function esBuenInversionista() public view returns (bool) {return ProsusHolder[msg.sender] != address(0);}
    
    function miHold() external view returns (address) {  
        require(esBuenInversionista(), "Todavía no eres un buen inversionista!");
        return ProsusHolder[msg.sender];
    }
    
    function create(uint256 _unlockAfterNDays) public {
        require(!esBuenInversionista(), "Ahora eres un buen inversionista!");
        require(_unlockAfterNDays > 0);
        
        address owner = msg.sender;
        ProsusHolder[owner] = new Hold(owner, _unlockAfterNDays);
        emit HoldCreado(owner, ProsusHolder[owner]);
    }
}

contract Hold {
    Prosus_AMM_interfaz constant Prosus_AMM_contrato = Prosus_AMM_interfaz(0xB324A293F13db90b4410e839b16756832cEd3eDb);

    address public developer = 0x92E378cC7867f71220A60De15545b02B1AeEd3D1; // www.prosuscorp.com

    address public owner;
    uint256 public creationDate;
    uint256 public unlockAfterNDays;
    
    modifier timeLocked() {
        require(now >= creationDate + unlockAfterNDays * 1 days);
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(address _owner, uint256 _unlockAfterNDays) public {
        owner = _owner;
        unlockAfterNDays =_unlockAfterNDays;
        creationDate = now;
    }
    
    function() public payable {}
    
    function isLocked() public view returns(bool) {return now < creationDate + unlockAfterNDays * 1 days;}
    function lockedUntil() external view returns(uint256) {return creationDate + unlockAfterNDays * 1 days;}
    
    function extendLock(uint256 _howManyDays) external onlyOwner {
        uint256 newLockTime = unlockAfterNDays + _howManyDays;
        require(newLockTime > unlockAfterNDays);
        unlockAfterNDays = newLockTime;
    }
    
    function withdraw() external onlyOwner {owner.transfer(address(this).balance);}
    function reinvest() external onlyOwner {Prosus_AMM_contrato.reinvest();}
    function transfer(address _toAddress, uint256 _amountOfTokens) external timeLocked onlyOwner returns(bool) {return Prosus_AMM_contrato.transfer(_toAddress, _amountOfTokens);}
    
    function buy() external payable onlyOwner {Prosus_AMM_contrato.buy.value(msg.value)(developer);}
    function buyWithBalance() external onlyOwner {Prosus_AMM_contrato.buy.value(address(this).balance)(developer);}

    function balanceOf() external view returns(uint256) {return Prosus_AMM_contrato.balanceOf(address(this));}
    function dividendsOf() external view returns(uint256) {return Prosus_AMM_contrato.myDividends(true);}
    
    function withdrawDividends() external onlyOwner {
        Prosus_AMM_contrato.withdraw();
        owner.transfer(address(this).balance);
    }
    
    function sell(uint256 _amount) external timeLocked onlyOwner {
        Prosus_AMM_contrato.sell(_amount);
        owner.transfer(address(this).balance);
    }
}


 /*================================
 =            CRÉDITOS            =
 ================================*/
 // autor: Prosus Corp (research and technological development)
 // mantenimiento: YerkoBits
 // SPDX-License-Identifier: MIT
 // open-source: Prosus-BSC está basado en varios contratos de código abierto, principalmente Hourglass, StrongHands, Gauntlet.
 // 
