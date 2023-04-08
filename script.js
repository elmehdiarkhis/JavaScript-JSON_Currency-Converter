

var allSelects = document.querySelectorAll("form select");

for (let i = 0; i < allSelects.length; i++) {


    for(let code in currencyCodes){

        // Default USD CAD
        let selected;
        if (i==0){
            code == "USD" ? selected="selected" : selected="";
        }
        else if (i==1){
            code == "CAD" ? selected="selected" : selected="";
        }

        // Adding Options to the two Select
        let option = `<option value="${code}" ${selected}>${code}</option>`; 
        allSelects[i].insertAdjacentHTML("beforeend", option);
    }





    //Changer  le Flag Apres avec avoir changer de Currency
    allSelects[i].addEventListener("change", () =>{
        loadFlag(allSelects[i]); //
        
    });



}




var fromSelect = document.querySelector(".from select");
var toSelect = document.querySelector(".to select");

var switchIcon = document.querySelector("form .icon");
switchIcon.addEventListener("click", () =>{
     
    let c = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = c;

    loadFlag(fromSelect);
    loadFlag(toSelect)

});







function loadFlag(element){

    //allez cherche le code du pays correspendant a la Currency choisi pour changer le drapeau(src=.../us)
    for(let code in currencyCodes){

        if(code == element.value){ 
            element.parentElement.querySelector("img").src = `https://flagcdn.com/48x36/${currencyCodes[code].toLowerCase()}.png`;
        }
        
    }

}






// - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul - // - Calcul


window.addEventListener("load", () => {
    getExchangeRate();
});



var button = document.querySelector("form button");
button.addEventListener("click", () =>{
    getExchangeRate();
});


 

function getExchangeRate(){

    //Default 1
    const amount = document.querySelector(".amount input");
    if(amount.value == "" || amount.value == "0"){
        amount.value = "1";
    }

    //Default :Getting exchange rate...
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    exchangeRateTxt.innerText = "Getting exchange rate...";

    //API Routine
    let url = `https://v6.exchangerate-api.com/v6/68bb4671f55f5b889cfc59cb/latest/${fromSelect.value}`;
    fetch(url).then( response => response.json() ).then(result => {
        let conversionRates = result.conversion_rates[toSelect.value]; 
        let conversionCalcul = (amount.value * conversionRates).toFixed(2); 
        exchangeRateTxt.innerText = `${amount.value} ${fromSelect.value} = ${conversionCalcul} ${toSelect.value}`;
    }).catch( () =>{        // If Offlin
        exchangeRateTxt.innerText = "Something went wrong";
    });
}


































