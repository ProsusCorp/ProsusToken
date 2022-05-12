
var contractAddress = '0xCDfd3D7817F9402e58a428CF304Cb7493e98336D'; 

var web3Mode = null;
var walletMode = 'metamask';
var currentAddress = null;
var dividendValue = 0;
var myBalance = 0;
var myBalanceBEP = 0;
var myBalanceBNB = 0;
var myDivs = 0;
var divsDisponibles = 0;
var buyPrice = 0;
var sellPrice = 0;
var globalBuyPrice = 0;
var globalSellPrice = 0;
var bnbPrice = 0;
var currency = (typeof default_currency === 'undefined') ? 'USD' : default_currency;
var bnbPriceTimer = null;
var dataTimer = null;
var infoTimer = null;

var ProsusBSC_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbReinvested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"incomingBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"},{"indexed":true,"internalType":"address","name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensBurned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bnbEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"AMM_BEP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"}],"name":"AMM_balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AMM_totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"BEP_AMM","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SupplyPeg","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_referredBy","type":"address"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensToSell","type":"uint256"}],"name":"calculateBNBReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnbToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"},{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferralEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferrals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_player","type":"address"}],"name":"playerStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralEarningsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}] ;   

var ProsusBSC_clase = web3.eth.contract(ProsusBSC_ABI)
ProsusBSC_instancia = ProsusBSC_clase.at(contractAddress)


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match
        })
    }
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData('Text', text)
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' 
        document.body.appendChild(textarea)
        textarea.select()
        try {
            return document.execCommand('copy') 
        } catch (ex) {
            console.warn('Copy to clipboard failed.', ex)
            return false
        } finally {
            document.body.removeChild(textarea)
        }
    }
}

function updateBNBPrice() {
    clearTimeout(bnbPriceTimer);
    if (currency === 'noBNB') {
        bnbPrice = 1 / (sellPrice + ((buyPrice - sellPrice) / 2));
        bnbPriceTimer = setTimeout(updateBNBPrice, 10000);
    } else {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=' + currency, function (result) {

            for (var key in result.binancecoin) {
                var bnb = result.binancecoin[key];
            }

            bnbPrice = parseFloat(bnb);
            $('.bnbPrice').text(bnbPrice);

            bnbPriceTimer = setTimeout(updateBNBPrice, 10000);
        });
    }
}

function convertBnbToWei(e) {
    return 1e18 * e
}
function convertWeiToBnb(e) {
    return e / 1e18
}
function convertTokenToWei(e) {
    return 1e12 * e
}
function convertWeiToToken(e) {
    return e / 1e12
}


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
    } else if (window.web3) {
        // billeteras dApp obsoletas
        window.web3 = new Web3(web3.currentProvider);
    } else {
        // sin billeteras dApp
        alert('Debes instalar MetaMask! \n (o cualquier otra billetera compatible con Binance Smart Chain)');
    }	
});

function intervalo() {
    updateData()
    attachEvents()
    updateTokenInfo()
}

window.addEventListener('load', function () {
    setTimeout(intervalo, 500)

    function call(address, method, params, amount) {
        web3.eth.getTransactionCount(currentAddress, function (err, nonce) {
            if (err) throw err
            web3.eth.getGasPrice(function (err, gasPrice) {
                if (err) throw err
                gasPrice = Math.max(gasPrice / 10, 1000000000)
                var tx = {
                    'from': currentAddress,
                    'to': address,
                    'value': '0x' + amount.toString(16),
                    'gasPrice': '0x' + (gasPrice).toString(16),
                    'gasLimit': '0x' + (100000).toString(16),
                    'nonce': nonce,
                }
            })
        })
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);

        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = dc.length;
            }
        }

        return decodeURI(dc.substring(begin + prefix.length, end));
    }

    function crearTokens(contrato, cantidad) {
        if (walletMode === 'metamask') {
            var etcwei = convertBnbToWei(cantidad);
            var gasvalue = 150000;
            ProsusBSC_instancia.buy(promo, {
                value: etcwei
            }, function (e, r) {
              //console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contrato, 'buy', [], convertBnbToWei(cantidad))
        }
    }

    function sell(amount) {
        if (walletMode === 'metamask') {
            ProsusBSC_instancia.sell(convertTokenToWei(amount), function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'sell', [convertTokenToWei(amount)], 0)
        }
    }

    function reinvest() {
        if (walletMode === 'metamask') {
            ProsusBSC_instancia.reinvest(function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'reinvest', [], 0)
        }
    }

    function withdraw() {
        if (walletMode === 'metamask') {
            ProsusBSC_instancia.withdraw(function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'withdraw', [], 0)
        }
    }

    $('#buy-tokens').click(function () {
        let amount = $('#purchase-amount').val().trim();
        crearTokens(contractAddress, amount);
    });

    // $('#transfer-tokens-btn').click(function () {
        // let address = $('#transfer-address').val();
        // let amount = $('#transfer-tokens').val();
        // if (!web3.isAddress(address)) {
            // alertify.error("Invalid Recipient Address!");
            // return;
        // }
        
        // if (!parseFloat(amount)) {
            // alertify.error("Invalid bPROSUS Amount to Transfer!");
            // return
        // }
        // let amountConverted = web3.toBigNumber(amount * 1e12);
        // transferTokens(amountConverted, address);
    // });

    $('#sell-tokens-btn').click(function () {
        sell($("#sell-tokens-amount").val())
    });
    
    $('#reinvest-btn').click(function () {
        reinvest();
    });
    
    $('#withdraw-btn').click(function () {
		if ( myDivs >= divsDisponibles ) {
		alert("El monto a retirar excede a los dividendos disponibles para repartir.");
		} else {
        withdraw();
		}
    });
    
    $('#exit-btn').click(function () {
        ProsusBSC_instancia.exit(function (e, r) {
            console.log(e, r);
        });
    });      

    $('#currency').val(currency);

    $('#currency').change(function () {
        currency = $(this).val();
        updateBNBPrice();
    });

    updateBNBPrice();

    $('#purchase-amount').bind("keypress keyup click", function (e) {
        var number = $('#purchase-amount').val();
        var numTokens = number / globalBuyPrice;
        $('.number-of-tokens').text("Con " + (number == 0 ? 0 : number) + " BNB puedes comprar " + numTokens.toFixed(2) + " bPROSUS");
    });

    $('#copy-promo-link').click(function (e) {
        e.preventDefault();
        copyToClipboard('https://prosus-bsc.cl/?dapp=01&promo=' + currentAddress);
        alertify.success('Link de promotores copiado al portapapeles.');
    });
    
//    cambiar Prosus_AMM a Prosus_BEP
    $('#amm_bep-btn').click(function () {
        let amount = $('#amm_bep-tokens').val();
        let amountConverted = web3.toBigNumber(amount * 1e12);
        ProsusBSC_instancia.AMM_BEP(amountConverted, function (error, result) {
           // console.log(error, result);
        });
    }); 

//    cambiar Prosus_BEP a Prosus_AMM
    $('#bep_amm-btn').click(function () {
        let amount = $('#bep_amm-tokens').val();
        let amountConverted = web3.toBigNumber(amount * 1e12);
        ProsusBSC_instancia.BEP_AMM(amountConverted, function (error, result) {
           // console.log(error, result);
        });
    }); 

});
 
 
function updateData() {
    clearTimeout(dataTimer);

    var loggedIn = false

    if (walletMode === 'metamask') {
        loggedIn = typeof web3.eth.defaultAccount !== 'undefined' && web3.eth.defaultAccount !== null
        currentAddress = web3.eth.defaultAccount;
    } else if (walletMode === 'web') {
        loggedIn = currentAddress !== null;
    }

    if (loggedIn) {
        var myBalance;

        ProsusBSC_instancia.AMM_balanceOf(currentAddress, function (error, result) {
            myBalance = result / 1e12;
            const tokenAmount = myBalance ;
         // $('.AMM_balance').text(Number(tokenAmount.toFixed(2)));
         // $('.AMM_value').text( ((globalBuyPrice+globalSellPrice)/2 * myBalance).toFixed(8) );
         // $('.AMM_value-usd').text( ((globalBuyPrice+globalSellPrice)/2 * myBalance * bnbPrice).toFixed(2).toLocaleString() );

            $('.AMM_balance').text( Number(Math.floor(tokenAmount * 1e2)/1e2).toFixed(2) ); // sin redondear decimales
                if (  Number(Math.floor(tokenAmount * 1e2)/1e2).toFixed(2) != 0 ) {
                    ProsusBSC_instancia.calculateBNBReceived(result, function (e, r) {
                        let precio = convertWeiToBnb(r) * 1.2;
                        $('.AMM_value').text( precio.toFixed(8) );
                        $('.AMM_value-usd').text(Number( (precio * bnbPrice).toFixed(2) ));
                    });
                } else {
                        $('.AMM_value').text( 0 );
                        $('.AMM_value-usd').text( 0 );
                }
        });

        ProsusBSC_instancia.myDividends(false, function (e, r) {
            let div = convertWeiToBnb(r).toFixed(8);
            let promodiv = (dividendValue - div).toFixed(8);

            $('#promodiv').text(promodiv);
            $('#promodiv-usd').text(Number((promodiv * bnbPrice).toFixed(2)));

            $('#nonpromodiv').text(div);
            $('#nonpromodiv-usd').text(Number((convertWeiToBnb(r) * bnbPrice).toFixed(2)));
        });


        ProsusBSC_instancia.myDividends(true, function (e, r) {
            myDivs = convertWeiToBnb(r).toFixed(8)

            $('.div').text(myDivs);
            $('input.div').val(myDivs + " BNB");
            $('.div-usd').text(Number((convertWeiToBnb(r) * bnbPrice).toFixed(2)));

            if (dividendValue != myDivs) {
                $('.div').fadeTo(100, 0.3, function () {
                    $(this).fadeTo(250, 1.0);
                });
                dividendValue = myDivs;
            }
        });

        ProsusBSC_instancia.totalReferralsOf(currentAddress, function (e, r) {
            $('#promoUseCount').text(r)
        });
        ProsusBSC_instancia.totalReferralEarningsOf(currentAddress, function (e, r) {
            $('#totalPromoEarnings').text((r / 1e18).toFixed(8))
        });
        web3.eth.getBalance(currentAddress, function (e, r) {
            myBalanceBNB = convertWeiToBnb(r).toFixed(8);
            $('.address-balance').text(myBalanceBNB + ' BNB');
            $('.myAddress').text(currentAddress + ' (conectado)');
        });
    } else {

    }

    ProsusBSC_instancia.buyPrice(function (e, r) {
        let buyPrice = convertWeiToBnb(r);
        globalBuyPrice = convertWeiToBnb(r);
        $('.buy').text(buyPrice.toFixed(8) + ' ');
        $('.buy-usd').text('$' + Number((buyPrice * bnbPrice).toFixed(2)) + ' ' + currency + '');
    });

    ProsusBSC_instancia.AMM_totalSupply(function (e, r) {
        let actualSupply = r / 1e12;
        $('#myPercentage').text((Number(myBalance / actualSupply) * 100).toFixed(2));
        $('.AMM_contract-tokens').text(actualSupply.toFixed(0));
    });

    // Dividendos desde promotores
    ProsusBSC_instancia.dividendsOf(currentAddress, true, function (e, r) {
        let userDividends = convertWeiToBnb(r);
        $('#promoDivs').text(userDividends.toFixed(8));
    });

    ProsusBSC_instancia.sellPrice(function (e, r) {
        let sellPrice = convertWeiToBnb(r);
        globalSellPrice = convertWeiToBnb(r);
        $('.sell').text(sellPrice.toFixed(8) + ' ');
        $('.sell-usd').text('$' + Number((sellPrice * bnbPrice).toFixed(2)) + ' ' + currency + '');
    });

    web3.eth.getBalance(ProsusBSC_instancia.address, function (e, r) {
		divsDisponibles = convertWeiToBnb(r/100).toFixed(8);
        $('.AMM_contract-balance').text(divsDisponibles + " ");
        $('.AMM_contract-balance-usd').text('$' + ( (convertWeiToBnb(r)*bnbPrice)+1000 ).toFixed(0) + ' ' + currency + '');
    });
    
    $('#purchase-amount').on('input change', function() {
        var value = parseFloat($(this).val()) * 1e18;
		// if ( value === 0 || Number.isNaN(value) ) {
			// $('#deposit-hint').text("");
			// return;
		// }
		// if ( value > 0) {
            // ProsusBSC_instancia.calculateTokensReceived(value, function (e, r) {
                // var numTokens = r / 1e12;
                // $('#deposit-hint').text("Obtendrás aproximadamente " + numTokens.toFixed(2) + " bPROSUS");
            // });	
        // }
		if ( value === 0 || Number.isNaN(value) ) {
			$('#deposit-hint').text("La cantidad no es correcta");
			return;
		} else if ( value/1e18 > myBalanceBNB ) {
			$('#deposit-hint').text("No tienes suficiente BNB");
			return;
		} else if ( value > 0) {
            ProsusBSC_instancia.calculateTokensReceived(value, function (e, r) {
                $('#deposit-hint').text("Obtendrás aproximadamente " + r.div(1e12).toFixed(8) + " bPROSUS");
            });
			return;
        } 
    })
    
    $('#sell-tokens-amount').on('input change', function() {
        var value = parseFloat($(this).val()) * 1e12;
		
		if ( value === 0 || Number.isNaN(value) ) {
			$('#withdraw-hint').text("La cantidad no es correcta");
			return;
		} else if ( value/1e12 > myBalance ) {
			$('#withdraw-hint').text("No tienes suficientes bPROSUS");
			return;
		} else if ( value > 0) {
            ProsusBSC_instancia.calculateBNBReceived(value, function (e, r) {
                $('#withdraw-hint').text("Obtendrás aproximadamente " + r.div(1e18).toFixed(8) + " BNB");
            });
			return;
        } 
		
    });
 
    dataTimer = setTimeout(function () {
        updateData()
    }, web3Mode === 'metamask' ? 2000 : 6000)

    // ---------------------------
    // Prosus_BEP
    ProsusBSC_instancia.balanceOf(currentAddress, function (error, result) {
        myBalanceBEP = result / 1e12;
        const tokenAmountBEP = myBalanceBEP;
      //$('.balance').text(Number(tokenAmountBEP.toFixed(2)) + ' bPROSUS'); // se redondean decimales
        $('.balance').text( Number(Math.floor(tokenAmountBEP * 1e2)/1e2).toFixed(2) + ' bPROSUS'); // sin redondear decimales
    });

}


function updateTokenInfo() {
    clearTimeout(infoTimer)

    infoTimer = setTimeout(function () {
        updateTokenInfo()
    }, web3Mode === 'metamask' ? 5000 : 10000)
}

function attachEvents() {
	promo = localStorage.getItem("promo")
	if (promo == null) {
		console.log('No hay link de promotores.');
		promo = "0x92E378cC7867f71220A60De15545b02B1AeEd3D1"; // www.prosuscorp.com
	} 
	else {
		promo = promo;
		console.log('Gracias por utilizar el link de promotores ' + promo );
	}

    // iniciar en el bloque anterior
    web3.eth.getBlockNumber(function (error, result) {
        alertify.set('notifier','position', 'top-center');
        console.log("Último bloque de la blockchain: ", result);
        ProsusBSC_instancia.allEvents({
            fromBlock: result - 1,
        }, function (error, recibido) {
			if (typeof recibido == 'undefined') {
			recibido = 0;
			}
            let currentUserEvent = web3.eth.accounts[0]
            switch (recibido.event) {
                case 'onTokenPurchase':
                    if (currentUserEvent) {
                        alertify.success('Fueron comprados ' + recibido.args.tokensMinted.div(1e12).toFixed(2) + ' bPROSUS pagando ' + recibido.args.incomingBNB.div(1e18).toFixed(8) + ' BNB');
                    } else {
                        alertify.message(recibido.args.tokensMinted.div(1e12).toFixed(2) + ' bPROSUS fueron comprados por otro usuario, pagando ' + recibido.args.incomingBNB.div(1e18).toFixed(2) + ' BNB.');
                    }
                    break;
                case 'onTokenSell':
                    if (currentUserEvent) {
                        alertify.success('Fueron vendidos ' + recibido.args.tokensBurned.div(1e12).toFixed(4) + ' bPROSUS recibiendo ' + recibido.args['bnbEarned'].div(1e18).toFixed(4) + ' BNB.');
                    } else {
                        alertify.warning('Se realizó una venta. Recibiendo ' + recibido.args['bnbEarned'].div(1e18).toFixed(4) + ' BNB a cambio de ' + recibido.args.tokensBurned.div(1e12).toFixed(4) + ' bPROSUS.');
                    }
                    break;
                case 'onWithdraw':
                    if (currentUserEvent) {
                        alertify.warning('El retiro de ' + recibido.args['bnbWithdrawn'].div(1e18).toFixed(4) + ' BNB fue realizado correctamente.');
                    }
                    break;
                case 'onReinvestment':
                    if (currentUserEvent) {
                        alertify.success('Fueron reinvertidos ' + recibido.args.bnbReinvested.div(1e18).toFixed(4) + ' BNB que se transformaron en ' + recibido.args.tokensMinted.div(1e12).toFixed(4) + ' bPROSUS');
                    } else {
                        alertify.message('Se realizó una reinversión de ' + recibido.args.bnbReinvested.div(1e18).toFixed(4) + ' BNB a cambio de ' + recibido.args.tokensMinted.div(1e12).toFixed(4) + '. bPROSUS ');
                    }
                    break;
                // case 'Transfer':
                    // if (currentUserEvent) {
                        // alertify.message('Transfiriendo ' + recibido.args['tokens'].div(1e12).toFixed(4) + ' bPROSUS hacia' + recibido.args['to'] + '... en proceso.');
                    // }
                    // break;
            }
        })
    })
}
