/* Part 2 Assignment of COS10011, add the use of javaScript
to validate form and make interactivity */

// author: Khairunnasulfahmi
// keywords: Javascript
// target: html in assign2 folder

"use strict"; //var must be declared

function init() {
  // works in enquiry page
  if (document.getElementById('enquiry-page') != null) {
    var enquireForm = document.getElementById('enquiry');
    prefill();
    enquireForm.onsubmit = validateEnquire;
  }
  // works in payment page
  if (document.getElementById('payment-page') != null) {
    var creditForm = document.getElementById('credit-form');
    creditForm.onsubmit = validateCredit;
    creditForm.onreset = resetStorage;
    getInfo();
  }
}


function validateEnquire() {
  var errMsg = ""; // initialize errMsg to null
  var result = true; //initialize to true

  // get all the DOM object in html
  var firstname = document.getElementById('firstName');
  var lastname = document.getElementById('lastName');
  var email = document.getElementById('email');
  var street = document.getElementById('street');
  var suburb = document.getElementById('suburb');
  var phone = document.getElementById('phone');
  var product = document.getElementById('product');
  var type = document.getElementById('member-type');
  var comment = document.getElementById('comment');
  var contactMethod = document.getElementsByName('preferredContact');
  var duration = document.getElementById('duration');
  var state = document.getElementById('state');
  var postcode = document.getElementById('postcode');
  var isContentFeature = document.getElementById('content');
  var isPriceFeature = document.getElementById('price');
  var isOtherFeature = document.getElementById('other');
  var preferredContact;

  for (var i = 0; i < contactMethod.length; i++) {
    if (contactMethod[i].checked) {
      preferredContact = contactMethod[i].value;
    }
  }

  //validate postcode based on state chosen
  if (duration.value < 1) {
    errMsg = 'Days must be a positive value';
  } else {
    switch (state.value) {
      case 'VIC':
        if (!postcode.value.match(/^[38]{1}[0-9]{3}$/)) {
          errMsg = 'VIC postcode must start with 3 or 8';
        }
        break;
      case 'NSW':
        if (!postcode.value.match(/^[12]{1}[0-9]{3}$/)) {
          errMsg = 'NSW postcode must start with 1 or 2';
        }
        break;
      case 'QLD':
        if (!postcode.value.match(/^[49]{1}[0-9]{3}$/)) {
          errMsg = 'QLD postcode must start with 4 or 9';
        }
        break;
      case 'NT':
        if (!postcode.value.match(/^[0]{1}[0-9]{3}$/)) {
          errMsg = 'NT postcode must start with 0';
        }
        break;
      case 'WA':
        if (!postcode.value.match(/^[6]{1}[0-9]{3}$/)) {
          errMsg = 'WA postcode must start with 6';
        }
        break;
      case 'SA':
        if (!postcode.value.match(/^[5]{1}[0-9]{3}$/)) {
          errMsg = 'SA postcode must start with 5';
        }
        break;
      case 'TAS':
        if (!postcode.value.match(/^[7]{1}[0-9]{3}$/)) {
          errMsg = 'TAS postcode must start with 7';
        }
        break;
      case 'ACT':
        if (!postcode.value.match(/^[0]{1}[0-9]{3}$/)) {
          errMsg = 'ACT postcode must start with 0';
        }
        break;
    }
  }

  if (errMsg != "") {
    alert(errMsg);
    result = false; // not allow the onsubmit to work
  }

  // store to session storage if no errMsg
  if (result) {
    storeInfo(firstName.value, lastName.value, email.value, street.value, suburb.value, state.value, postcode.value, phone.value, preferredContact, product.value, duration.value, type.value, comment.value, isContentFeature.checked, isPriceFeature.checked, isOtherFeature.checked);
  }

  return result;
}

function validateCredit() {

  var errMsg = "";
  var result = true;

  // get all the DOM object from the html
  var creditName = document.getElementById('credit-name');
  var creditNumber = document.getElementById('credit-number');
  var cardType = document.getElementById('credit-type');
  var ccv = document.getElementById('credit-verification');
  var creditExpiry = document.getElementById('credit-expiry');
  if (creditName.value == "") {
    errMsg = 'Your Name on credit card is empty'; // name cannot be empty
  } else if (creditNumber.value == "") {
    errMsg = 'Your credit number is empty'; // credit number cannot be empty
  } else if (creditExpiry.value == "") {
    errMsg = 'Your credit card expiry date is empty';
  } else if (!creditName.value.match(/^([a-zA-Z ]){1,40}$/)) {
    errMsg = 'Name on credit card must only have alphabet and space and a maximum of 40 characters';
  } else if (!creditNumber.value.match(/^([0-9]){15,16}$/)) {
    errMsg = 'Credit card must only have number for 15 or 16 digits';
  } else if (!creditExpiry.value.match(/^[0-9]{2}[-]{1}[0-9]{2}$/)) {
    errMsg = 'Credit card expiry number must be in xx-xx format';
  } else {
    switch (cardType.value) { //validate the credit number and ccv based on credit cardtype
      case 'Visa':
        if (ccv.value.length != 3) {
          errMsg = 'Incorrect CCV for Visa';
        } else if (!creditNumber.value.match(/^[4]{1}[0-9]{15}$/)) {
          errMsg = 'Visa number must start with 4 and have 16 digits';
        }
        break;
      case 'Mastercard':
        if (ccv.value.length != 3) {
          errMsg = 'Incorrect CCV for Mastercard';
        } else if (!creditNumber.value.match(/^[5]{1}[1-5]{1}[0-9]{14}$/)) {
          errMsg = 'Mastercard must start with 51 to 55 and have 16 digits';
        }
        break;
      case 'American Express':
        if (ccv.value.length != 4) {
          errMsg = 'Incorrect CCV for American Express';
        } else if (!creditNumber.value.match(/^[3]{1}[47]{1}[0-9]{13}$/)) {
          errMsg = 'Amex must start with 34 or 37 and have 15 digits';
        }
        break;
      default:
        errMsg = 'Card Type not exist';
    }
  }

  //validate the expiry

  var pairs = creditExpiry.value.split("-");
  var expiryMonth = Number(pairs[0]);
  var expiryYear = Number(pairs[1]);
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear() - 2000;

  if (expiryMonth > 12) {
    errMsg = "Month wrong format";
  } else if (expiryYear < year) {
    errMsg = "The card is expired";
  } else if (expiryYear == year) {
    if (expiryMonth < month) {
      console.log(expiryYear)
      console.log(year)
      errMsg = "The card can no longer be used";
    }
  }

  if (errMsg != "") {
    alert(errMsg);
    result = false;
  }

  return result;
}

function getInfo() {
  // retrieve the info from session storage
  // fill the page with statements
  document.getElementById('confirm_name').textContent = sessionStorage.firstName + " " + sessionStorage.lastName;
  document.getElementById('confirm_email').textContent = sessionStorage.email;
  document.getElementById('confirm_address').textContent = sessionStorage.street + ", " + sessionStorage.suburb + ", " + sessionStorage.postcode + ", " + sessionStorage.state;
  document.getElementById('confirm_phone').textContent = sessionStorage.phone;
  document.getElementById('confirm_contact').textContent = sessionStorage.preferredContact;
  document.getElementById('confirm_product').textContent = sessionStorage.product;
  document.getElementById('confirm_ndays').textContent = sessionStorage.ndays;
  document.getElementById('confirm_type').textContent = sessionStorage.type;
  document.getElementById('confirm_features').textContent = sessionStorage.features;
  document.getElementById('confirm_comment').textContent = sessionStorage.comment;
  var cost = calculateCost()
  document.getElementById('confirm_price').textContent = '$' + cost;

  document.getElementById('firstName').value = sessionStorage.firstName;
  document.getElementById('lastName').value = sessionStorage.lastName;
  document.getElementById('street').value = sessionStorage.street;
  document.getElementById('suburb').value = sessionStorage.suburb;
  document.getElementById('postcode').value = sessionStorage.postcode;
  document.getElementById('state').value = sessionStorage.state;
  document.getElementById('email').value = sessionStorage.email;
  document.getElementById('phone').value = sessionStorage.phone;
  document.getElementById('product').value = sessionStorage.product;
  document.getElementById('type').value = sessionStorage.type;
  document.getElementById('features').value = sessionStorage.features;
  document.getElementById('comment').value = sessionStorage.comment;
  document.getElementById('preferredContact').value = sessionStorage.preferredContact;
  document.getElementById('ndays').value = sessionStorage.ndays;
  document.getElementById('price').value = cost;
}

// store the info to session storage
function storeInfo(firstName, lastName, email, street, suburb, state, postcode, phone, preferredContact, product, ndays, type, comment, isContentFeature, isPriceFeature, isOtherFeature) {
  sessionStorage.firstName = firstName;
  sessionStorage.lastName = lastName;
  sessionStorage.email = email;
  sessionStorage.street = street;
  sessionStorage.suburb = suburb;
  sessionStorage.state = state;
  sessionStorage.postcode = postcode;
  sessionStorage.phone = phone;
  sessionStorage.preferredContact = preferredContact;
  sessionStorage.product = product;
  sessionStorage.ndays = ndays;
  sessionStorage.type = type;
  sessionStorage.comment = comment;

  var features = "";

  if (isContentFeature) {
    features = 'Content';
  }
  if (isPriceFeature) {
    features += ', Price';
  }
  if (isOtherFeature) {
    features += ', Others';
  }

  sessionStorage.features = features;
}

// cancel order to clear out all the session storage for new user
function resetStorage() {
  sessionStorage.firstName = "";
  sessionStorage.lastName = "";
  sessionStorage.email = "";
  sessionStorage.street = "";
  sessionStorage.suburb = "";
  sessionStorage.state = "";
  sessionStorage.postcode = "";
  sessionStorage.phone = "";
  sessionStorage.preferredContact = "";
  sessionStorage.ndays = "";
  sessionStorage.product = "";
  sessionStorage.type = "";
  sessionStorage.comment = "";
  sessionStorage.features = "";

  window.location.href = 'index.html';
}


// if the sessionstorage has value, it will prefill the form with its value
function prefill() {

  if (sessionStorage.firstName != undefined) {
    document.getElementById('firstName').value = sessionStorage.firstName;
  }
  if (sessionStorage.lastName != undefined) {
    document.getElementById('lastName').value = sessionStorage.lastName;
  }
  if (sessionStorage.email != undefined) {
    document.getElementById('email').value = sessionStorage.email;
  }
  if (sessionStorage.street != undefined) {
    document.getElementById('street').value = sessionStorage.street;
  }
  if (sessionStorage.suburb != undefined) {
    document.getElementById('suburb').value = sessionStorage.suburb;
  }
  if (sessionStorage.state != undefined) {
    document.getElementById('state').value = sessionStorage.state;
  }
  if (sessionStorage.postcode != undefined) {
    document.getElementById('postcode').value = sessionStorage.postcode;
  }
  if (sessionStorage.phone != undefined) {
    document.getElementById('phone').value = sessionStorage.phone;
  }
  if (sessionStorage.product != undefined) {
    document.getElementById('product').value = sessionStorage.product;
  }
  if (sessionStorage.ndays != undefined) {
    document.getElementById('duration').value = sessionStorage.ndays;
  }
  if (sessionStorage.type != undefined) {
    document.getElementById('member-type').value = sessionStorage.type;
  }
  if (sessionStorage.comment != undefined) {
    document.getElementById('comment').value = sessionStorage.comment;
  }

  switch (sessionStorage.preferredContact) {
    case 'Email':
      document.getElementById('online').checked = true;
      break;
    case 'Post':
      document.getElementById('post').checked = true;
      break;
    case 'Call':
      document.getElementById('call').checked = true;
      break;
  }

  if (sessionStorage.features != undefined) {
    if (sessionStorage.features.search('Content') != -1) {
      document.getElementById('content').checked = true;
    }
    if (sessionStorage.features.search(', Price') != -1) {
      document.getElementById('price').checked = true;
    }
    if (sessionStorage.features.search(', Others')!=  -1) {
      document.getElementById('other').checked = true;
    }

  }
}

// cost calculation based on user pick
function calculateCost() {

  //contract will have $0 register fee and price everyday = $10
  //prepaid will have $150 register fee and daily of $15

  // cost = register fee + (number of days X daily price)
  switch (sessionStorage.type) {
    case 'Contract':
      var registerFee = 0;
      var price = 10;
      break;
    case 'Pre-paid':
      var registerFee = 100;
      price = 5;
      break;
    default:
      var registerFee = 150;
      var price = 15;
  }

  var days = sessionStorage.ndays;
  var cost = registerFee + (price * days);
  return cost
}


window.onload = init;
