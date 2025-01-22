// <!-- upperscroll hide -->

  // Get the navbar
  var navbar = document.getElementById("uppernav");
  // Get the initial scroll position
  var prevScrollpos = window.pageYOffset;

  // Function to handle scroll event
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    // Add condition to check if user has scrolled down enough
    if (prevScrollpos > currentScrollPos) {
      // If scrolled up, show the navbar
      navbar.classList.remove("hidden");
    } else {
      // If scrolled down, hide the navbar
      navbar.classList.add("hidden");
    }
    prevScrollpos = currentScrollPos;
  };



//   <!-- for login, register and forgetpassword -->
  document.getElementById("loginlink").addEventListener("click", function () {
    document.getElementById("registerform").style.display = "none";
    document.getElementById("loginform").style.display = "block";
  });

  document
    .getElementById("registerlink")
    .addEventListener("click", function () {
      document.getElementById("loginform").style.display = "none";
      document.getElementById("registerform").style.display = "block";
    });

  document.getElementById("forgetlink").addEventListener("click", function () {
    document.getElementById("forgetpasswordform").style.display = "block";
    document.getElementById("loginform").style.display = "none";
  });


// <!-- //for login and register showup -->

  function register() {
    var registerForm = document.getElementById("registerform");
    registerForm.style.display = "block";
    registerForm.style.position = "fixed";
    registerForm.style.top = "50%";
    registerForm.style.left = "50%";
    registerForm.style.transform = "translate(-50%, -50%)";
  }

  function login() {
    var registerForm = document.getElementById("loginform");
    registerForm.style.display = "block";
    registerForm.style.position = "fixed";
    registerForm.style.top = "50%";
    registerForm.style.left = "50%";
    registerForm.style.transform = "translate(-50%, -50%)";
  }

  function forgetpassowrd() {
    var registerForm = document.getElementById("forgetpasswordform");
    registerForm.style.display = "block";
    registerForm.style.position = "fixed";
    registerForm.style.top = "50%";
    registerForm.style.left = "50%";
    registerForm.style.transform = "translate(-50%, -50%)";
  }

  function closebtn() {
    var loginForm = document.getElementById("loginform");
    var registerForm = document.getElementById("registerform");
    var forgetpassowrdForm = document.getElementById("forgetpasswordform");
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    forgetpassowrdForm.style.display = "none";
  }

// Show the appropriate form based on the URL query parameter
function showFormBasedOnQueryParam() {
  const formType = new URLSearchParams(window.location.search).get("form");

  // Hide all forms initially
  const forms = {
    register: document.getElementById("registerform"),
    login: document.getElementById("loginform"),
    forgetpassword: document.getElementById("forgetpasswordform"),
  };

  // Hide all forms
  Object.values(forms).forEach((form) => form.style.display = "none");

  // Show the form based on query parameter
  if (forms[formType]) {
    forms[formType].style.display = "block";
  }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", showFormBasedOnQueryParam);

// Product popup information
document.addEventListener("DOMContentLoaded", function () {
  // Select all toggle buttons, minus icons, and their corresponding price breakdowns
  const toggleButtons = document.querySelectorAll(".toggle");
  const priceBreakdowns = document.querySelectorAll(".price-breakdown");
  const minusIcons = document.querySelectorAll(".minus-icon");

  // Hide all price breakdowns initially
  priceBreakdowns.forEach(breakdown => breakdown.style.display = "none");

  // Add event listener to each toggle button
  toggleButtons.forEach((toggleButton, index) => {
    toggleButton.addEventListener("click", function () {
      const priceBreakdown = priceBreakdowns[index];
      const minusIcon = minusIcons[index];

      // Toggle display of the price breakdown
      const isHidden = priceBreakdown.style.display === "none" || !priceBreakdown.style.display;
      priceBreakdown.style.display = isHidden ? "block" : "none";
      toggleButton.textContent = isHidden ? "Hide price breakup" : "Show price breakup";
      minusIcon.textContent = isHidden ? "−" : "+";
    });
  });
});


// Function to fetch conversion rates based on the selected currency
async function fetchConversionRates(currency) {
  const baseCurrency = currency === 'INR' ? 'USD' : 'INR';
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    return response.data.rates[currency];
  } catch (error) {
    console.error('Error fetching conversion rates:', error);
    return 1; // Default rate if there's an error
  }
}

// Function to convert a single price based on the rate
const convertPrice = (price, rate) => (price * rate).toFixed(2);

// Function to update prices of elements based on attribute and currency
function updateElementPrices(attribute, currencySymbol, rate, isConvert) {
  document.querySelectorAll(`[${attribute}]`).forEach(element => {
    const basePrice = parseFloat(element.getAttribute(attribute));
    const convertedPrice = isConvert ? convertPrice(basePrice, rate) : basePrice.toFixed(2);
    element.innerHTML = `${currencySymbol}${convertedPrice}`;
  });
}

// Function to update all prices on the page
async function updatePrices(currency, rate) {
  const currencySymbol = currency === 'USD' ? '$' : '&#8377;';
  const isConvert = currency === 'USD';

  // Update all price-related elements
  ['data-price', 'data-fakeprice', 'data-realprice', 'data-saveprice'].forEach(attr => {
    updateElementPrices(attr, currencySymbol, rate, isConvert);
  });

  // Update price breakdown items
  document.querySelectorAll('.price-breakdown .price-item').forEach(element => {
    const basePrice = parseFloat(element.getAttribute('data-price'));
    const convertedPrice = isConvert ? convertPrice(basePrice, rate) : basePrice.toFixed(2);
    element.querySelector('.price').innerHTML = `${currencySymbol}${convertedPrice}`;
  });
}

// Function to change the currency based on user selection
async function changeCurrency(currency) {
  const rate = await fetchConversionRates(currency);
  localStorage.setItem('selectedCurrency', currency); // Store the selected currency
  document.getElementById('currencybtn').innerText = currency === 'INR' ? 'INR - Indian Rupee' : 'USD - US Dollar';
  await updatePrices(currency, rate);
}

// Function to apply stored currency selection on page load
async function applyStoredCurrency() {
  const storedCurrency = localStorage.getItem('selectedCurrency') || 'INR';
  await changeCurrency(storedCurrency);
}

// Apply stored currency on page load
document.addEventListener('DOMContentLoaded', applyStoredCurrency);

// Event listener for the currency button to change currency dynamically
document.getElementById('currencybtn').addEventListener('click', async () => {
  const currentCurrency = localStorage.getItem('selectedCurrency') || 'INR';
  const newCurrency = currentCurrency === 'INR' ? 'USD' : 'INR'; // Toggle between INR and USD
  await changeCurrency(newCurrency);
});

