
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
<!--
<script src="assets/js/jquery.min.js" type="text/javascript"></script>
<script src="assets/js/popper.min.js" type="text/javascript"></script>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="https://kit.fontawesome.com/f352960784.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="assets/css/alertify.min.css">
<link rel="stylesheet" href="assets/css/alertify-theme.min.css">
<link rel="stylesheet" href="assets/css/animate.min.css">
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/custom-theme.css">
<script src="assets/js/alertify.min.js"></script>
<script src="assets/js/bignumber.min.js"></script>
<script src="assets/js/clipboard.min.js"></script>
-->

<?php
 switch ($contenido){
	case "01":
	  include ("_amm.php");
	  break;
	case "02":
	  include ("_hold.php");
	  break; 
	case "03":
	  include ("_crosschain.php");
	  break; 
	case "04":
	  include ("_cajafuerte.php");
	  break;
	default:
	  include ("_amm.php");
 }
 ?>

<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark darkNavbar fixed-top">
		<a class="navbar-brand" ><img src="assets/img/logo.png" width="40px" /></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuDapp" aria-controls="menuDapp" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="menuDapp">
			<ul class="navbar-nav mr-auto">

				<li class="nav-item">
					<a class="nav-link text-white" id="div-app00" href="/intro">
					<i class="fas fa-home"></i> Inicio
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" id="div-app01" href="<?=$urlSitio;?>?dapp=01">
					<i class="fa fa-university"></i> Fábrica
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" id="div-app02" href="<?=$urlSitio;?>?dapp=02">
					<i class="fa fa-hand-rock-o"></i> Holdea
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" id="div-app03" href="<?=$urlSitio;?>?dapp=03">
					<i class="fas fa-exchange-alt"></i> Crosschain
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" id="div-app04" href="<?=$urlSitio;?>?dapp=04">
                    <i class="fas fa-lock"></i> Cajafuerte
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" id="dex01" target="_blank" href="https://pancakeswap.finance/swap?inputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&outputCurrency=0xcdfd3d7817f9402e58a428cf304cb7493e98336d">
					<i class="fa fa-line-chart"></i> PancakeSwap					
					</a>
				</li>

			</ul>

			<ul class="navbar-nav ml-auto"> <!--
				<li class="nav-item">
					<a class="nav-link text-white" id="div-menu01" href="https://prosus-bsc.cl/intro">
						<i class="fas fa-info-circle"></i> Presentación
					</a>
				</li> -->

				<li class="nav-item">
					<a class="nav-link text-white" id="div-menu02" href="instrucciones.php" target="_blank">
						<i class="fas fa-question"></i> Instrucciones
					</a>
				</li>


				<li class="nav-item">
					<a class="nav-link text-white" id="div-menu03" href="#" onclick="watchAsset()">
						<i class="fas fa-folder-plus"></i> Listar en wallet
					</a>
				</li>
<!--				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<i class="fas fa-chevron-circle-down text-white"></i> Explorar
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="https://bscscan.com/address/0x0000000000000000000000000000000000000000" target="_blank"><i class="fas fa-search-dollar"></i> Contrato: Fábrica</a></br>
						<a class="dropdown-item" href="https://bscscan.com/address/0x0000000000000000000000000000000000000000" target="_blank"><i class="fas fa-search-dollar"></i> Contrato: Holdea</a></br>						
						<a class="dropdown-item" href="https://github.com/ProsusCorp/Prosus-BSC" target="_blank"><i class="fab fa-github"></i> GitHub</a>
					</div> -->
				</li>
			</ul>
		</div>
	</nav>

<script>
	function watchAsset() {
		ethereum.sendAsync({
			method: 'wallet_watchAsset',
			params: {
				"type":"ERC20", // es compatible con BEP20
				"options":{
					"address": '0xCDfd3D7817F9402e58a428CF304Cb7493e98336D',
					"symbol": 'bPROSUS',
					"decimals": 12,
					"image": 'https://prosus-bsc.cl/assets/img/logo.png' ,
				},
			},
			id: Math.round(Math.random() * 100000),
		}, (err, added) => {

			if (added) {
				console.log("token ya agregado a MetaMask")
			} else {
				console.log("token todavía no agregado a MetaMask")
			}

		})
	window.location.replace("https://prosus-bsc.cl/")
	}
</script>

</header>


