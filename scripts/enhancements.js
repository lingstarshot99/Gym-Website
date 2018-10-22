/* Part 2 Assignment of COS10011, add the use of javaScript
to validate form and make interactivity */

// author: Khairunnasulfahmi
// keywords: Javascript
// target: html in assign2 folder

"use strict";

function init() {
    // change content of section every time button is clicked
    // querySelectorAll()
    // change CSS property
    var intro = document.querySelectorAll('.brief');
    var btnNext = document.getElementById('btn-next');
    var i = 0;
    intro[i].style.display = "flex";
    btnNext.onclick = function () {
      changeContent(i, intro);
      if (i == 3) {
        i = 0;
      } else {
        i++;
      }
    }

    // change the banner on top page to be a slideshow
    // setInterval and the use of arrays
    var bg = ["images/background-resize.jpg", "images/background2-resize.jpg", "images/background3-resize.jpg"]
    var banner = document.getElementById('welcome');
    var index = 0;
    setInterval(function () {
      index = slide(banner, bg, index);
    }, 5000);


}

function slide(banner, bg, index) {
  if (index == 2) {
    index = 0;
  } else {
    index++;
  }
  //banner.style.transition = "0.5s";
  banner.style.background = "rgba(255,165,0,0.5) url(styles/" + bg[index] + ") no-repeat";
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  banner.style.backgroundBlendMode = "darken";
  console.log("Currently background: " + index)
  return index
}

function changeContent(index, section) {
  // var intro = document.querySelectorAll('.brief');
  console.log(index);
  section[index].style.display = "none";
  if (index == 3) {
    index = 0;
    section[index].style.display = "flex";
  } else {
    index++;
    section[index].style.display = "flex";
  }
}


if (document.getElementById('index-page') != null) {
  window.onload = init;

} else if (document.getElementById('payment-page') != null) {

  function display() {
    alert('You will be directed to payment page');
  }

  // to increase security
  function warn() {
    setTimeout(function() {
      alert('You have 30 seconds left to complete the form');
      console.log('warning');
    }, changeToMili(60))
  }

  function redirect() {
    setTimeout(function() {
      window.location.href = "index.html";
      console.log('timeout')
    }, changeToMili(90))
  }

  function changeToMili(number) {
    return number * 1000
  }

  var creditName = document.getElementById('credit-name');

  display();
  if (sessionStorage.firstName != undefined && sessionStorage.lastName != undefined) {
    creditName.value = sessionStorage.firstName + " " + sessionStorage.lastName;
  }
  warn(); //warn of the time left
  redirect(); // out of time and redirec to home page
}
