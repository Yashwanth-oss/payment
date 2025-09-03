const cardNumberInput = document.getElementById("cardNumber");
const cardHolderInput = document.getElementById("cardName");
const expiryInput = document.getElementById("expiry");
const cvvInput = document.getElementById("cvv");

const cardNumberDisplay = document.getElementById("card-number");
const cardHolderDisplay = document.getElementById("card-holder");
const cardExpiryDisplay = document.getElementById("card-expiry");
const cardCvvDisplay = document.getElementById("cvv-display");
const card = document.getElementById("card");

function formatCardNumber(number) {
  return number.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function validateCardNumber(num) {
  // Luhn Algorithm
  let sum = 0, shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

cardNumberInput.addEventListener("input", () => {
  let cleanValue = cardNumberInput.value.replace(/\D/g, '').substring(0, 16);
  const formatted = formatCardNumber(cleanValue);
  cardNumberInput.value = formatted;
  cardNumberDisplay.textContent = formatted.padEnd(19, '*');

  // Validation
  if (cleanValue.length === 16) {
    cardNumberInput.classList.toggle("valid", validateCardNumber(cleanValue));
    cardNumberInput.classList.toggle("invalid", !validateCardNumber(cleanValue));
  } else {
    cardNumberInput.classList.remove("valid", "invalid");
  }
});

cardHolderInput.addEventListener("input", () => {
  cardHolderDisplay.textContent = cardHolderInput.value || 'Your Name';
});

expiryInput.addEventListener("input", () => {
  let value = expiryInput.value.replace(/\D/g, '').substring(0, 4);
  if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
  expiryInput.value = value;
  cardExpiryDisplay.textContent = value || 'MM/YY';

  expiryInput.classList.toggle("valid", /^((0[1-9])|(1[0-2]))\/\d{2}$/.test(value));
  expiryInput.classList.toggle("invalid", value && !/^((0[1-9])|(1[0-2]))\/\d{2}$/.test(value));
});

cvvInput.addEventListener("input", () => {
  let val = cvvInput.value.replace(/\D/g, '').substring(0, 3);
  cvvInput.value = val;
  cardCvvDisplay.textContent = val.padEnd(3, '*');

  cvvInput.classList.toggle("valid", val.length === 3);
  cvvInput.classList.toggle("invalid", val.length > 0 && val.length !== 3);
});

cvvInput.addEventListener("focus", () => {
  card.classList.add("flipped");
});

cvvInput.addEventListener("blur", () => {
  card.classList.remove("flipped");
});
