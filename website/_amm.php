<!-- 
<script src="assets/js/tether.min.js"></script>
	<script src="https://unpkg.com/@metamask/legacy-web3@latest/dist/metamask.web3.js"></script>
--> 
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/custom-theme.css">
<link rel="stylesheet" href="assets/css/alertify.min.css">
<link rel="stylesheet" href="assets/css/alertify-theme.min.css">
<link rel="stylesheet" href="assets/css/animate.min.css">
<script src="https://kit.fontawesome.com/f352960784.js" crossorigin="anonymous"></script>
<script src="assets/js/jquery.min.js" type="text/javascript"></script>
<script src="assets/js/popper.min.js" type="text/javascript"></script>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/alertify.min.js"></script>
<script src="assets/js/bignumber.min.js"></script>
<script src="assets/js/clipboard.min.js"></script>
<script src="assets/js/metamask.web3.min.js"></script>
<script type="text/javascript" src="assets/lib/amm.js"></script>
<script type="text/javascript" src="assets/lib/promotores.js"></script>


    <main style="margin-top: 120px;">
    <div class="container">

            <div class="row">

                <div class="col-md-6">
                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInLeft">
                        <div class="card-header bg-dark text-white rcTop">
                            <h4 class="text-white"><i class="fas fa-coins text-white"></i> acuñar/quemar bPROSUS </h4>
                        </div>
                        <div class="card-body bg-dark text-white">
                            <div class="container">
                                <div class="row">

                                    <div class="col text-center">
                                        <p>precio compra</p>
                                        <h3 class="text-white"><img src="assets/img/bnb.png" width="25px" height="25px" /> <span class="buy"><img src="./assets/img/loader.svg"></span></h3>
                                        <p>(<span class="buy-usd"><img src="./assets/img/loader.svg"></span>)</p>
                                    </div>

                                    <div class="col text-center">
                                        <p>precio venta</p>
                                        <h3 class="text-white"><img src="assets/img/bnb.png" width="25px" height="25px" /> <span class="sell"><img src="./assets/img/loader.svg"></span></h3>
                                        <p>(<span class="sell-usd"><img src="./assets/img/loader.svg"></span>)</p>
                                    </div> 

                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-white rcBottom">
                            <div class="row">
                                <div class="col text-center">
                                    <button type="button" class="btn btn-block btn-md btn-dark btn-outline-success roundedCorners" data-toggle="modal" data-backdrop="false"data-target="#buyTokensModal">MINT</button>
                                </div>
                                
                                <div class="col text-center">
                                    <button type="button" class="btn btn-block btn-md btn-dark btn-outline-danger roundedCorners" data-toggle="modal" data-backdrop="false"data-target="#sellTokensModal">BURN</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    </br>


                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInLeft">
                        <div class="card-header bg-dark text-white rcTop">
                            <h4 class="text-white"><i class="fa fa-box text-white"></i> Bodega (staking) </h4>
                        </div>
                        <div class="card-body bg-dark text-white">
                            <div class="container">
                                <div class="row text-center">
                                    <div class="col">
                                        <h3 class="text-warning"><img src="assets/img/logo.png" width="25px" height="25px" /> <span class="AMM_balance"><img src="./assets/img/loader.svg" /></span> bPROSUS</h3>
                                        <small>(<span id="myPercentage"></span>&#37; del supply en Fábrica)</small> </br> </br>
                                        <p> equivalente a: <span class="AMM_value"><img src="./assets/img/loader.svg" /></span> BNB ($<span class="AMM_value-usd"><img src="./assets/img/loader.svg" /></span> USD)</p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="card-footer bg-dark text-white rcBottom">
                            <div class="row">                                
                                <div class="col text-center">
								<button type="button" class="btn btn-block btn-md btn-dark btn-outline-light roundedCorners" data-toggle="modal" data-backdrop="false"data-target="#promotoresModal">Info promotores</button>
                                </div>							
                                <div class="col text-center">
                                <button id="copy-promo-link" data-clipboard-text="" class="btn btn-block btn-md btn-dark btn-outline-light roundedCorners" type="button">Link para promotores</button>
								</div>
                            </div>
                        </div>
                    </div>
                    <br />


                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInRight">
                        <div class="card-header bg-dark text-white rcTop">
                            <h4 class="text-white"><i class="fas fa-hand-holding-usd"></i> dividendos a tu favor</h4>
                        </div>
                        <div class="card-body">
                            <div class="container">
                                <div class="row text-center">
                                    <div class="col text-center" >
										</p>
                                        <p>(desde promotores)</br>
										<img src="assets/img/bnb.png" width="15px" height="15px" /> <span id="promodiv"><img src="./assets/img/loader.svg" /></span>
                                    </div>
                                    <div class="col">
										<p>TOTAL: </p>
                                        <h3 class="text-warning"><img src="assets/img/bnb.png" width="25px" height="25px" /> <span class="div"><img src="./assets/img/loader.svg" /></span></h3>
                                        <p>($<span class="div-usd"><img src="./assets/img/loader.svg" /></span> USD)</p>
                                    </div>
									
                                </div>
                            </div>
                        </div>

                        <div class="card-footer bg-dark text-white rcBottom">
                            <div class="row">
                                <div class="col">
                                    <button id="reinvest-btn" class="btn btn-block btn-dark btn-md btn-outline-info roundedCorners text-white" type="button"><i class="fas fa-recycle"></i> Reinvertir</button>
                                </div>

                                <div class="col">
                                    <button id="withdraw-btn" class="btn btn-block btn-dark btn-md btn-outline-warning roundedCorners text-white" type="button"><i class="fas fa-hand-holding-usd"></i> Retirar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                  </div>
                  
                  
                <div class="col-md-6">

                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInLeft">
                        <div class="card-header bg-dark text-white rcTop">
                        <h4 class="text-white"><i class="fas fa-wallet text-white"></i> tu billetera (bPROSUS libres) </h4>
                        </div>
                        <div class="card-body bg-dark text-white">
                            Address: 
                            <div class="col text-left" >
                            <h6 class="text-success"><span class="myAddress"> <p class="text-danger">(no conectado) </p> </span> </h6>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-white rcBottom">
                            Saldo : 
                            <div class="col text-left" > </br>
                            <h6 class="text-warning"><img src="assets/img/bnb.png" width="25px" height="25px" />  <span class="address-balance"><img src="./assets/img/loader.svg"></span> </h6>
                            <h6 class="text-warning"><img src="assets/img/logo.png" width="25px" height="25px" /> <span class="balance"><img src="./assets/img/loader.svg" /></span> </h6> 
                            </div>
                        </div>
                    </div> </br>


                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInRight">
                        <div class="card-header bg-dark text-white rcTop">
                        <h4 class="text-white"><i class="fas fa-arrow-right"></i> importar/exportar bPROSUS</h4>
                        </div> 
                        <div class="card-body">
                            <div class="container">
                            <small><b>Los bPROSUS en Bodega se liberan (van a tu billetera).</b></small>
                            <div class="row">
                                <div class="col-md-4 text-left">
                                <input id="amm_bep-tokens" class="form-control roundedCorners" type="number" placeholder="(cantidad)" />
                                </div>
                                <div class="col-md-6 text-left">
                                <button id="amm_bep-btn" class="btn btn-block btn-dark text-warning roundedCorners" type="button">AMM <i class="fas fa-arrow-right"></i> BEP20</button>
                                </div>
                            </div>
                            </div>
                        </div> 
                        <div class="card-body">
                            <div class="container">
                            <small><b>Los bPROSUS libres (en billetera) se almacenan en Bodega.</b></small>
                            <div class="row">
                                <div class="col-md-4 text-left">
                                <input id="bep_amm-tokens" class="form-control roundedCorners" type="number" placeholder="(cantidad)" />
                                </div>
                                <div class="col-md-6 text-left">
                                <button id="bep_amm-btn" class="btn btn-block btn-dark text-warning roundedCorners" type="button">BEP20 <i class="fas fa-arrow-right"></i> AMM</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </br>

                </div>
                  
            </div> </br>

            <div class="row">
                <div class="col text-center">
                    <div class="card bg-dark text-white roundedCorners orangeBorder animated fadeInUp delay-1s">
                        <div class="card-header bg-dark text-white rcTop"><i class="fas fa-chart-bar"></i> Estadísticas de la Fábrica</div>
                        <div class="card-body bg-dark text-white">
                            <div class="row">
                                <div class="col text-center">
                                    <img src="assets/img/logo.png" width="40px" height="40px" /><br />
                                    <br />
                                    <b class="text-warning"><span class="AMM_contract-tokens"><img src="./assets/img/loader.svg"></span> bPROSUS</b><br />
                                    <small>total en staking</small>
                                </div>

                                <div class="col text-center">
                                    <img src="assets/img/bnb.png" width="40px" height="40px" /><br />
                                    <br />
                                    <b class="text-warning"><span class="AMM_contract-balance"><img src="./assets/img/loader.svg"></span> BNB</b><br />
                                    <small>dividendos a repartir</small>
                                </div>

                                <div class="col text-center">
                                    <img src="assets/img/dollar.png" width="40px" height="40px" /><br />
                                    <br />
                                    <b class="text-warning"><span class="AMM_contract-balance-usd"><img src="./assets/img/loader.svg"></span></b><br />
                                    <small>valor Fábrica</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
    </div>
    </main>
    <br />



    <!-- Modals -->
    
    <!-- Buy bPROSUS modal -->
    <div class="modal" id="buyTokensModal">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white orangeBorder roundedCorners">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title text-white">comprar bPROSUS</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <h4 class="text-white"> <img src="assets/img/bnb.png" width="30px" height="30px" /> <span class="buy"><img src="./assets/img/loader.svg"></span> </h4>
                                <p>(<span class="buy-usd"><img src="./assets/img/loader.svg"></span>)</p>
                                <input id="purchase-amount" class="form-control roundedCorners" type="number" placeholder="(BNB)" />
                                Disponible para gastar: <span class="address-balance">0 BNB</span>
                                <p class="text-success"><span id="deposit-hint"></span></p>
                            </div>
                        </div>
                        <br />
                                
                        <div class="row">
                            <div class="col text-center">
                                <button id="buy-tokens" class="btn btn-block btn-md btn-success roundedCorners" type="button"><i class="fas fa-plus"></i> comprar bPROSUS</button>
                                <small>Elije una cantidad de BNB para comprar bPROSUS. Se cobrará un 10&#37; de impuesto que será distribuído proporcionalmente entre todos los participantes. - Mientras más bPROSUS tienes, más dividendos ganas (gracias a este 10% de impuesto cobrado a los demás participantes en sus compras/ventas).</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <button type="button" class="btn btn-block btn-md btn-dark roundedCorners" data-dismiss="modal">CERRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Sell bPROSUS modal -->
    <div class="modal" id="sellTokensModal">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white orangeBorder roundedCorners">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title text-white">vender bPROSUS</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <h4 class="text-white"> <img src="assets/img/bnb.png" width="30px" height="30px" /> <span class="sell"><img src="./assets/img/loader.svg"></span> </h4>
                                <p>(<span class="sell-usd"><img src="./assets/img/loader.svg"></span>)</p>
                                <input id="sell-tokens-amount" class="form-control roundedCorners" type="number" placeholder="(bPROSUS)" />
                                Disponible para gastar: <span class="AMM_balance">0 bPROSUS</span> bPROSUS
                                <p class="text-danger"><span id="withdraw-hint"></span></p>
                            </div>
                        </div>
                        <br />
                                
                        <div class="row">
                            <div class="col text-center">
                                <button id="sell-tokens-btn" class="btn btn-block btn-md btn-danger text-white roundedCorners" type="button"><i class="fas fa-minus"></i> vender bPROSUS</button>
                                <small>Elije una cantidad de bPROSUS para vender. Cuando vendes bPROSUS, los BNB adquiridos son agregados a tus dividendos (después podrás enviar el total de dividendos hacia tu wallet).</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <button type="button" class="btn btn-block btn-md btn-dark roundedCorners" data-dismiss="modal">CERRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- promotores (modal) -->
    <div class="modal" id="promotoresModal">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white orangeBorder roundedCorners">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title text-white">Tus promotores de PROSUS-BSC</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <h3 class="text-white"><img src="assets/img/bnb.png" width="25px" height="25px" /> <span id="totalPromoEarnings"><img src="./assets/img/loader.svg" /></span></h3>
                                <small>total ganancias desde promotores</small>
                            </div>

                            <div class="col text-center">
                                <h3 class="text-white"><span id="promoUseCount"><img src="./assets/img/loader.svg" /></span></h3>
                                <small>cantidad de promotores</small>
                            </div>
                        </div>
                        <br />

                        <div class="row">
                            <div class="col text-center"
                                <h4 class="text-success">Gana el 50&#37; de los dividendos que obtienen tus promotores!</h4>
                                <small><strong>ADVERTENCIA: </strong> Es muy importante que tus invitados esten dentro de tu LINK PARA PROMOTORES cuando realicen su primera transacción , sólo así serán registrados en tu cuenta (en la primera vez ambos participantes quedan enlazados aunque después ya no se use el link para promotores). Si tu invitado ya pertenece a la lista de promotores de otro participante, no será agregado a tu cuenta. Si un nuevo participante no usa un link para promotores, las ganancias serán enviadas a Prosus Corp (quien las repartira entre el resto de los participantes).</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <button type="button" class="btn btn-block btn-md btn-dark roundedCorners" data-dismiss="modal">CERRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

