// GLOBALS
let AMM_Address = '0xCDfd3D7817F9402e58a428CF304Cb7493e98336Ds'; 
let Hold_Address = '';

//var web3Mode = null;
var walletMode = 'metamask';
//var currentAddress = null;
//var dividendValue = 0;
//var contract = null;
var myBalance = 0;

var buyPrice = 0;
//var globalBuyPrice = 0;
var sellPrice = 0;
var bnbPrice = 0;
var currency = (typeof default_currency === 'undefined') ? 'USD' : default_currency;
var bnbPriceTimer = null;
//var dataTimer = null;
//var infoTimer = null;


window.addEventListener('load', async () => {
    // billeteras dApp actualizadas...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Solicitar acceso si es necesario
            await ethereum.enable();
        } 
		catch (error) {
            alert('Recarga esta página para tener acceso a la dApp.');
        }
        startDapp();
        
    } else if (window.web3) {
        // billeteras dApp obsoletas
        window.web3 = new Web3(web3.currentProvider);
        startDapp();
    } else {
        // sin billeteras dApp
        alert('Debes instalar MetaMask! \n (o cualquier otra billetera compatible con Binance Smart Chain)');
    }
});


let el = function (id) {
    return document.querySelector(id);
};

var ProsusHoldDeploy_ABI = ([{"constant":false,"inputs":[{"name":"_unlockAfterNDays","type":"uint256"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"ProsusHold","type":"address"}],"name":"HoldCreado","type":"event"},{"constant":true,"inputs":[],"name":"esBuenInversionista","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"miHold","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ProsusHolder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]);

var ProsusHold_ABI = ([{"constant":true,"inputs":[],"name":"creationDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buyWithBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_howManyDays","type":"uint256"}],"name":"extendLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"unlockAfterNDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isLocked","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"developer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lockedUntil","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_unlockAfterNDays","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);

var ProsusAMM_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbReinvested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"incomingBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"},{"indexed":true,"internalType":"address","name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensBurned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bnbEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensToSell","type":"uint256"}],"name":"calculateBNBReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnbToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployer","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"},{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferralEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferrals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"statusOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalDepositsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralEarningsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalWithdrawalsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_toAddress","type":"address"},{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let ProsusHoldDeploy_clase = web3.eth.contract(ProsusHoldDeploy_ABI);
let ProsusHoldDeploy_instancia = ProsusHoldDeploy_clase.at(Hold_Address);

let ProsusAMM_clase = web3.eth.contract(ProsusAMM_ABI);
let ProsusAMM_instancia = ProsusAMM_clase.at(AMM_Address);

let ProsusHold_clase = web3.eth.contract(ProsusHold_ABI);
let ProsusHold_instancia;

function startDapp() {
    setInterval(miProsusHold, 3000);
    updateBNBPrice();
}

function miProsusHold() {
    ProsusHoldDeploy_instancia.esBuenInversionista((error, esBuenInversionista) => {
        if (esBuenInversionista) {

            ProsusHoldDeploy_instancia.miHold((error, miProsusHold_address) => {
                el('#address').innerHTML = miProsusHold_address;
                ProsusHold_instancia = ProsusHold_clase.at(miProsusHold_address);
				
				ProsusHold_instancia.balanceOf((error, myProsusBalance) => {
//				el('#myBalance').innerHTML = ((web3.fromWei(myProsusBalance, 'ether')*1e6).toFixed(2) + " PROSUS");
                el('#myBalance').innerHTML = ((Math.floor((web3.fromWei(myProsusBalance, 'ether')*1e6) * 1e2)/1e2).toFixed(2) + " PROSUS"); // sin aproximar decimales
					// ProsusAMM_instancia.calculateBNBReceived(myProsusBalance, (error, result) => {
					// el('#myValue').innerHTML = ("( $" + (((result * bnbPrice) / 1e18).toFixed(2)) + " USD )");
					// });
				});
                ProsusHold_instancia.dividendsOf((error, misDividendos) => {
//              el('#misDividendos').innerHTML = (web3.fromWei(misDividendos, 'ether').toFixed(6) + " BNB");
                el('#misDividendos').innerHTML = ((Math.floor(web3.fromWei(misDividendos, 'ether') * 1e6)/1e6).toFixed(6) + " BNB"); // sin aproximar decimales
                    // ProsusAMM_instancia.calculateBNBReceived(misDividendos, (error, result) => {
                    // el('#myDivsValue').innerHTML = ("( $" + (((result * bnbPrice) /1e18 ).toFixed(2)  ) + " USD )");
                    // });
                });
                ProsusHold_instancia.creationDate((error, creationDate) => {
                    var _date = new Date(creationDate * 1000);
                    el('#created').innerHTML = (_date.getDate() + "/" + (_date.getMonth() + 1) + "/" + _date.getFullYear());
                });

                ProsusHold_instancia.isLocked((error, isLocked) => {
                    if (isLocked) { // vista bloqueado (hold)
                        ProsusHold_instancia.lockedUntil((error, lockedUntil) => {
							var _until = new Date(lockedUntil * 1000);
							ProsusHold_instancia.unlockAfterNDays((error, unlockAfterNDays) => {
						//	el('#daysUntil').innerHTML = unlockAfterNDays; 
							});
							el('#lockedUntil').innerHTML = (_until.getDate() + "/" + (_until.getMonth() + 1) + "/" + _until.getFullYear());
                        el('#myStatus').innerHTML = '<strong><span class="text-danger">BLOQUEADO</span> (HOLD)</strong>';
						$("#setupPanel").hide(); // iniciar bloqueo
						$("#myDepositPanel").show(); // depositar BNB
						$('#myTimePanel').show(); // extender periodo
						$('#myControlsPanel').show(); // reinvertir-retirar
						$('#mySellPanel').hide(); // vender prosus
                        });
                    } else { // vista días finalizados
                        ProsusHold_instancia.lockedUntil((error, lockedUntil) => {
							var _until = new Date(lockedUntil * 1000);
							ProsusHold_instancia.unlockAfterNDays((error, unlockAfterNDays) => {
						//	el('#daysUntil').innerHTML = unlockAfterNDays; 
							});
							el('#lockedUntil').innerHTML = (_until.getDate() + "/" + (_until.getMonth() + 1) + "/" + _until.getFullYear());
						el('#myStatus').innerHTML = ('<strong class="text-warning">bloqueo finalizado</b>');
						//el('#daysUntil').innerHTML = ('finalizado'); 
			            //el('#lockedUntil').innerHTML = ('(finalizado)');
						$("#setupPanel").hide(); // iniciar bloqueo
						$("#myDepositPanel").hide(); // depositar BNB
						$('#myTimePanel').show(); // extender periodo
						$('#myControlsPanel').show(); // reinvertir-retirar
						$('#mySellPanel').show(); // vender prosus
                        });						
                    }
                });
            });

        } 
		else { // vista cuenta nueva
            el('#address').innerHTML = ("--");
            el('#myBalance').innerHTML = ("-- PROSUS");
            el('#myValue').innerHTML = (" ");
            el('#misDividendos').innerHTML = ("-- BNB");
            el('#myDivsValue').innerHTML = (" ");
            el('#myStatus').innerHTML = ('<strong class="text-warning">(no iniciado)</b>');
            el('#lockedUntil').innerHTML = ("--/--/----");
//            el('#daysUntil').innerHTML = ("--");
            el('#created').innerHTML = ("--");
			
		// $("#setupPanel").show(); // iniciar bloqueo
		// $("#myDepositPanel").hide(); // depositar BNB
		// $("#myTimePanel").hide(); // extender periodo
		// $("#myControlsPanel").hide(); // reinvertir-retirar
		// $("#mySellPanel").hide(); // vender prosus
        }
		
    });
}

function updateBNBPrice() {
    clearTimeout(bnbPriceTimer);
    if (currency === 'PROSUS') {
        bnbPrice = 1 / (sellPrice + ((buyPrice - sellPrice) / 2));
        bnbPriceTimer = setTimeout(updateBNBPrice, 5000);
    } 
	else {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=' + currency, function (result) {
		for (var key in result.binancecoin) {
			var bnb = result.binancecoin[key];
		}
		bnbPrice = parseFloat(bnb);
		$('.bnbPrice').text(bnbPrice);
		bnbPriceTimer = setTimeout(updateBNBPrice, 5000);
        });
    }
}

function iniciarHold() {
    ProsusHoldDeploy_instancia.create(el('#locktime').value, (error, result) => {
        if (!error) {
            alertify.success("Creating HOLD, please wait...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

function buyPROSUS() {
    ProsusHold_instancia.buy({
        value: web3.toWei(el('#buyamount').value, 'ether')
    }, (error, result) => {
        if (!error) {
            alertify.success("Adquiriendo PROSUS, por favor espere...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

function withdrawDividends() {
    ProsusHold_instancia.withdrawDividends((error, result) => {
        if (!error) {
            alertify.success("Cosechando dividendos, por favor espere...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

function reinvestDividends() {
    ProsusHold_instancia.reinvest((error, result) => {
        if (!error) {
            alertify.success("Reinvertir PROSUS, por favor espere...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

function extendLock() {
    ProsusHold_instancia.extendLock(el('#extendlocktime').value, (error, result) => {
        if (!error) {
            alertify.success("Extendiendo periodo, por favor espere...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

function sellPROSUS() {
    ProsusHold_instancia.sell( web3.toWei(el('#sellamount').value, 'micro'), (error, result) => { // micro = 1e12
        if (!error) {
            alertify.success("Vendiendo PROSUS, por favor espere...");
        } else {
            alertify.error("Error inesperado. Intente más tarde.")
        }
    });
}

// function transferirPROSUS_simple() {
    // ProsusHold_instancia.transfer( el('#transfer-address').value, web3.toWei(el('#transfer-tokens').value, 'micro'), (error, result) => { // micro = 1e12
        // if (!error) {
            // alertify.success("Transfiriendo PROSUS, por favor espere...");
        // } else {
            // alertify.error("Error inesperado. Intente más tarde.")
        // }
    // });
// }

function transferirPROSUS() {
	let amount = $('#transfer-tokens').val();
	let address = $('#transfer-address').val();
		if (!parseFloat(amount)) {
			alertify.error("La cantidad de PROSUS es incorrecta!");
			return
		}
		if (!web3.isAddress(address)) {
			alertify.error("La dirección del destinatario es incorrecta!");
			return;
		}
	amount = web3.toWei(amount, 'micro'); // micro = 1e12

	if (walletMode === 'metamask') {
		ProsusHold_instancia.balanceOf(function (err, miSaldo) {
			// alert(address);
			// alert(parseFloat(amount));
			// alert(parseFloat(miSaldo));
			if (parseFloat(amount) <= parseFloat(miSaldo)) {
				ProsusHold_instancia.transfer(address, amount, function (err, result) {
						if (!err) {
						alertify.success("Transfiriendo PROSUS, por favor espere...");
						} else {
						alertify.error('Error inesperado. Intente más tarde.');
						console.log('Registro de error: ', err);
					}
				});
			}
		});
	} else {
		alert('Las transferencias están disponibles sólo para Metamask o Trust Wallet.');
	}
	
}
