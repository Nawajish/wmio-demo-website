/*
	Marketo Custom Form Script
	Version 1.0
	Author: Phil Hiemstra
	Published: 2017-09-22
*/


function GetLocationByIP(){
	
	if(document.getElementsByName('munchkinId').length > 0){
		
		if ($("#Address_Visit_Country__c").val() != undefined && $("#Address_Visit_Country__c").val() != ''){return;}
		
		var geoCountry;
		var geoState;
		
		// IP to country/state
		$.getJSON('https://freegeoip.net/json/', function(result) {
						
			geoCountry = result.country_name;
			geoState = result.region_code;
			
			if (geoCountry != "DE" && geoCountry != "Germany"){
				$("#Address_Visit_Country__c").val(geoCountry).trigger("change");
				$("#Address_Visit_State__c").val(geoState);
			}
		});
	} else {
		 setTimeout(function() { GetLocationByIP() }, 50);
	}
	
}

function defer() {
          if (window.jQuery) {
			  
				var head  = document.getElementsByTagName('head')[0];
				var link  = document.createElement('link');
				link.id   = 'myCss';
				link.rel  = 'stylesheet';
				link.type = 'text/css';
				link.href = '../../../info.softwareag.com/rs/858-DJP-749/images/marketo_direct.css';
				link.media = 'all';
				head.appendChild(link);
			  
                var a = document.createElement( 'script' );
				a.setAttribute( 'src', '../../../info.softwareag.com/rs/858-DJP-749/images/jquery.autocomplete.js' );
				a.setAttribute( 'type', 'text/javascript' );
				document.body.appendChild( a );

				var b = document.createElement( 'script' );
				b.setAttribute( 'src', '../../../info.softwareag.com/rs/858-DJP-749/images/marketo.direct.js' );
				a.setAttribute( 'type', 'text/javascript' );
				document.body.appendChild( b );
				
				//GetLocationByIP();
          } else {
               setTimeout(function() { defer() }, 50);
          }
     };
	 
	 defer();
