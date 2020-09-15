$(function(){
//*****************************country change text start*****************************************
var loadedXML = "";

function loadCountries()
{
    if (loadedXML == "")
    {
		var xmlUrl = "";
		if (window.location.href.indexOf("cumulocity.com") > -1){
			xmlUrl = "https://info.softwareag.com/countries.xml";
		} else if (window.location.href.indexOf("softwareag.cloud") > -1){
			xmlUrl = "https://info.softwareag.com/site/countries.xml";
		}else {
			xmlUrl = "countries.xml";
		}
		
        return $.ajax({
            type: "GET",
            url: xmlUrl,
            dataType: "xml",
            success: function (xml) {
                loadedXML = xml;
            },
            error: function () {
                loadedXML = "";
            }
        });
    }
}

function proceedXML(selectedCountry)
{
	if (window.location.href.indexOf("cumulocity.com") == -1){
		if(selectedCountry == 'USA'){
			$("#temporaryEmailOptIn").closest('.mktoFormRow').hide();
			$("#consent").closest('.mktoFormRow').hide();
			$("#consent").hide();
		} else {
			$("#temporaryEmailOptIn").closest('.mktoFormRow').show();
			$("#consent").closest('.mktoFormRow').show();
			$("#consent").show();
		}
	}

    if (loadedXML == "") {
        loadCountries();
    }
    if (loadedXML != "") {
        var defaultText = "";
        var selectedText = "";
        var defaultCountry = "default";
        var currentCountry = selectedCountry != "" ? selectedCountry : defaultCountry;

        var cNodes = loadedXML.getElementsByTagName("country");
        for (var i = 0; i < cNodes.length; i++)
        {
            var cNames = cNodes[i].getElementsByTagName("name");
            for (var j = 0; j < cNames.length; j++)
            {
                if (cNames[j].firstChild.nodeValue == defaultCountry)
                {
                    defaultText = cNodes[i].getElementsByTagName("value")[0].firstChild.wholeText;
                }
                else if (cNames[j].firstChild.nodeValue == currentCountry)
                {
                    selectedText = cNodes[i].getElementsByTagName("value")[0].firstChild.wholeText;
                }
            }
        }
        if(selectedText != "" || defaultText != "")
        {
            var $textHolder = $("#consent");
            if ($textHolder != null) {
                $textHolder.html(selectedText != "" ? selectedText : defaultText);
            }
        }
    }
}

$.when(loadCountries()).done(function(){
		proceedXML($("#Address_Visit_Country__c").val());
});

$(document).one("focus", "#Address_Visit_Country__c", function () {
    loadCountries();
    var $country = $(this);
    $country.change(function () {
        proceedXML($country.val());
    });
});

//*********************************country change end*******************************************
	
	
$(document).one("focus", "#Company", function () {

    var $company = $(this),
        $country = $("#Address_Visit_Country__c"),
        $state = $("#Address_Visit_State__c"),
        $duns = $("[name='DUNS_Number__c']"),
		$dnbAddress = $("[name='dnbAddress']"),
		$dnbAnnualRevenueCurrency = $("[name='dnbAnnualRevenueCurrency']"),
		$dnbAnnualRevenue = $("[name='dnbAnnualRevenue']"),
		$dnbCity = $("[name='dnbCity']"),
		$dnbEmployeeCount = $("[name='dnbEmployeeCount']"),
		$dnbPostalCode = $("[name='dnbPostalCode']"),
		$dnbSICCode = $("[name='dnbSICCode']"),
		$dnbSICDescription = $("[name='dnbSICDescription']");
/*		
	$company.change(function () {
        $duns.val("");
    });

	 $state.change(function () {
        $company.val("");
        $duns.val("");
    });
	
	 $country.change(function () {
        $state.val("");
        $company.val("");
        $duns.val("");
    });
*/
    $company.autocomplete({
        minLength: 2,
        autoFocus: true,
        source: function (request, response) {
			if ($country.val() != '') {
				var $xhr = $.ajax({
					type: "GET",
					url: "https://www.softwareag.com/dnbservice",
					data: {
						searchTerm: request.term,
						country: $country.val(),
						stateCode: $("#Address_Visit_State__c").val() || ""
					},
					contentType: "application/json",
					dataType: "json",
					success: function (data) {
						if (data != null) {
							response(data.searchCandidates);
						}
					},
					error: function () {
						response([]);
					}
				});
			}
        },
        select: function (event, ui) {
            $duns.val(ui.item.organization.duns);
            setTimeout(function () {$company.val(ui.item.organization.primaryName);}, 1);
			
			if (ui.item.organization.financials){
				setTimeout(function () {$dnbAnnualRevenueCurrency.val(ui.item.organization.financials[0].yearlyRevenue[0].currency);}, 1);
				setTimeout(function () {$dnbAnnualRevenue.val(ui.item.organization.financials[0].yearlyRevenue[0].value);}, 1);
			}
			if (ui.item.organization.numberOfEmployees){
				setTimeout(function () {$dnbEmployeeCount.val(ui.item.organization.numberOfEmployees[0].value);}, 1);
			}
			
			setTimeout(function () {$dnbAddress.val(ui.item.organization.primaryAddress.streetAddress.line1);}, 1);
			setTimeout(function () {$dnbCity.val(ui.item.organization.primaryAddress.addressLocality.name);}, 1);
			setTimeout(function () {$dnbPostalCode.val(ui.item.organization.primaryAddress.postalCode);}, 1);
			
			if (ui.item.organization.primaryIndustryCodes){
				setTimeout(function () {$dnbSICCode.val(ui.item.organization.primaryIndustryCodes[0].usSicV4);}, 1);
				setTimeout(function () {$dnbSICDescription.val(ui.item.organization.primaryIndustryCodes[0].usSicV4Description);}, 1);	
			}
        },
		change: function () {
            if ($("[name=DUNS_Number__c]").val())
            {                
                var requestDunsNumbers = $.ajax({
                    type: "get",
                    url: "https://www.softwareag.com/dnbservice",
                    data: {
                        apiCall: "additionalinformation",
                        dunsNumber: $("[name=DUNS_Number__c]").val()
                    },
                    success: function (data) {
                        $("[name=Domestic_Ultimate_DUNS_Number__c]").val(data.organization.corporateLinkage.domesticUltimate.duns);
                        $("[name=Global_Ultimate_DUNS_Number__c]").val(data.organization.corporateLinkage.globalUltimate.duns);
                    }
                })
            }
            
        }
    });

    
                $company.data('ui-autocomplete')._renderItem = function ($ul, item) {
                    //var $div = $("<div>").text(item.organization.primaryName).addClass("ui-item-wrapper");
                
                    var strToDisplay = "<strong>" + item.organization.primaryName + "</strong><br><small>";
                    if (item.organization.primaryAddress.streetAddress)
                    {
                        strToDisplay += item.organization.primaryAddress.streetAddress.line1 || "";
                    }
                    if (item.organization.primaryAddress.addressLocality)
                    {
                        strToDisplay += ", " + item.organization.primaryAddress.addressLocality.name || "";
                    }
                    if (item.organization.addressRegion)
                    {
                        strToDisplay += ", " + item.organization.primaryAddress.addressRegion.name || "";
                    }
                    //if (item.organization.primaryAddress.addressCountry)
                    //{
                    //    strToDisplay += item.organization.primaryAddress.addressCountry.isoAlpha2Code || "";
                    //}
                    strToDisplay += "</small>";

                    var $div = $("<div>").html(strToDisplay).addClass("ui-item-wrapper");

                   
                    var $li = $("<li>").append($div);
                    return $li.appendTo($ul);
                };
});
});