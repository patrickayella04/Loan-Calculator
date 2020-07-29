// List for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // show loader
    const loader = document.getElementById('loading');
    loader.style.display = 'block';

    setTimeout(clearLoader, 2000)

    e.preventDefault();
});

function clearLoader(){
    document.getElementById('loading').remove();
    document.getElementById('results').style.display = 'block';
    calculateResults();
}

// Anding spining loading disc & remove both results and loading gif disc from user view ----  Here we replace calculateResults() function from eventListener and use an anonomous function. We also remove the (e) and e.default as calculateResults() is no longer an event handler.

// Calculate Results
function calculateResults() { 

    console.log('Calculating...');
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculations for interest - parseFloat() method makes sure it is a number that has been entered. If parseFloat encounters a character other than a plus sign (+), minus sign (- U+002D HYPHEN-MINUS), numeral (0–9), decimal point (.), or exponent (e or E), it returns the value up to that character, ignoring the invalid character and characters following it.
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayemnts = parseFloat(years.value) * 12;

    // Calculations for monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayemnts);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    // Once monthyly is calculated, must check if its a finite number using js method below. This makes sure the number is just that, a number! not a string '123' or words but a number (321) only. 
    if (isFinite(monthly)) {
        // if finite we display our results in the respected fields using the .value method and set it equal to what is to be displayed. 
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayemnts).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayemnts) - principal).toFixed(2);

    } else {
        // console.log('Please check your numbers');
        // Here we build alert message if user inputs invalid information. We will use the CreatElement method from DOM and build/inject the alert from javaScript into the DOM, rather than hard coding it into the DOM, and hiding and showing it. We will build a custom function: 

        showError('Plaase check your numbers');


    }

    // e.preventDefault(); // since its a event parameter we prevent default
};

function showError(error) {
    //1.create a div
    const errorDiv = document.createElement('div');

    // 4. Get elements of where we want to put our error
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // 2. Add class
    errorDiv.className = 'alert alert-danger';

    // 3.Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // 5. Insert error
    card.insertBefore(errorDiv, heading);// call insertBefore on a parent element, then you pass in what new element you want to put in which is the errorDiv, and you also put what element you want to intsert the errorDiv in before which is this case is the heading.

    // 6. Clear error after 3 seconds - window object in javaScript call setTimeout() which takes in two parameters(1. is a function(or a named function) and 2. the time in miliseconds, thousand miliseconds is 1 sec ), we can have something happen after a set amount of seconds.

    setTimeout(clearError, 3000);

}

// 7. clear error
function clearError() {
    document.querySelector('.alert').remove();
}
