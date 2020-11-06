// could use query selector, yet Id is more "direct."

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//F1 Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//Notes
//F1a pass the input element from html, grab it's parent element from html (div), change the class to include 'error' to display when a submit is clicked the 'error message'..
//F1b then grab the small element via query selector, and pass in the event listener to display the message ( written in the event listener (Username is required) ) when the 'submit' happens.

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//Notes
//Same as F1a, and since the outline color is set in CSS, as the class in Html is changed, the styling applies for the (.form-control.success input)..turning it green.

//Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}
//Notes
//Grabbed this from this link: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript


//Check required fields
//High order array methods, such as foreach...
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Notes
//Function grabs the field name(username,email,psd,psd2), then returned, removes the first letter (as it's not capitalized in html) capitalizes it, then concatentates that capital letter to the remainder of the word.


//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});




//Event Listeners
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     //prevents the default of submitting the form.  We're pausing it here to do work first.
//     if(username.value === '') {
//         showError(username, 'Username is required');
//     } else {
//         showSuccess(username);
//     }
//     //putting in just username (in the "if" statement), ie element, will render just element details from html.  Add ".value" to get the value entered in form, posted in console.

//     if(email.value === '') {
//         showError(email, 'Email is required');
//     } else if(!isValidEmail(email.value)) {
//         showError(email, 'Email is not valid');
//     } else {
//         showSuccess(email);
//     }

//     if(password.value === '') {
//         showError(password, 'Password is required');
//     } else {
//         showSuccess(password);
//     }
    
//     if(password2.value === '') {
//         showError(password2, 'Password 2 is required');
//     } else {
//         showSuccess(password2);
//     }




// });