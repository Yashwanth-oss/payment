document.addEventListener("DOMContentLoaded", function(){

    let input = document.getElementById('card-number');
    
    let cardImg = document.getElementById('creditCard');
    
    let form = document.getElementById('payment-form');
    
    let exit = document.getElementById('exit');
    
    // Regular Expressions to test for the IIN's of the accepted cards
    let amex = /^3(?=4|7)/;
    let discover = /(^6(?=011)|^6(?=(2|4|5)))/;
    let mastercard = /(^5(?=[1-5])|^2(?=[2-7]))/;
    let visa = /^4/;
    
    function cardTypeCheck() {  //Checks for the type of card and applies appropriate card image or keeps the image as a blank card if no type is recognized
        if (amex.test(input.value)) {
            cardImg.src = "https://www.texvisions.com/design_tool/data/test_logos/amex.png"
        } else if (visa.test(input.value)) {
            cardImg.src = "https://www.texvisions.com/design_tool/data/test_logos/visa.png"
        } else if (mastercard.test(input.value)) {
            cardImg.src = "https://www.texvisions.com/design_tool/data/test_logos/mastercard.png"
        } else if (discover.test(input.value)) {
            cardImg.src = "https://www.texvisions.com/design_tool/data/test_logos/discover.png"
        } else {
            cardImg.src = "https://www.texvisions.com/design_tool/data/test_logos/blank_card.png"
        };
    };
    
    function displayReceipt() { //Displays the receipt with information from the submitted form
        let redactedNum = document.getElementById("card-number").value.substring(12);
        document.getElementById("receipt").style.display = "block";
        document.getElementById("rcpt-email").innerHTML = "Email: " + document.getElementById("email").value;
        document.getElementById("rcpt-amount").innerHTML = "Amount: $" + document.getElementById("amount").value;
        document.getElementById("rcpt-card").innerHTML = 
            "Card Number: ************" + redactedNum + "<br>" +
            "Cardholder's Name: " + document.getElementById("cardholder").value;
    }
    
    function resetForm() { //Resets the form inputs and closes out the receipt
        document.getElementById("payment-form").reset();
        document.getElementById("receipt").style.display = "none";
    }
    
    //Gets the current month and year and sets those numbers to the minimun accepted values for the appropriate inputs
    let month = new Date().getMonth() + 1;
    let year = parseInt(new Date().getFullYear().toString().substring(2));
    document.getElementById("month").min = month; 
    document.getElementById("year").min = year;
    
    
    input.addEventListener("keyup", cardTypeCheck); //Runs the cardTypeCheck function for every time a key is lifted within the input
    input.addEventListener("blur", cardTypeCheck); //Runs the cardTypeCheck function for every time a value is pasted into the input
    form.addEventListener("submit", displayReceipt); //Runs the displayReceipt function when the completed, validated form is submitted
    exit.addEventListener("click", resetForm); //Runs the resetForm function when the button is clicked within the receipt
    });