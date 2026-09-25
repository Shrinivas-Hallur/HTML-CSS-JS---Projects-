const fromAmount = document.querySelector(".inp-amount");
const fromCurrency = document.querySelector(".fromCurrency");
const toAmount = document.querySelector(".convert-amount");
const toCurrency = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
const converterContainer = document.querySelector(".converter-container");

const countries = [
  {
    code: "USD",
    name: "United States Dollar",
  },
  {
    code: "INR",
    name: "Indian Rupee",
  },
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "GBP",
    name: "British Pound",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
  },
  {
    code: "CHF",
    name: "Swiss Franc",
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
  },
  {
    code: "AED",
    name: "United Arab Emirates Dirham",
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
  },
  {
    code: "KRW",
    name: "South Korean Won",
  },
  {
    code: "RUB",
    name: "Russian Ruble",
  },
  {
    code: "ZAR",
    name: "South African Rand",
  },
  {
    code: "BRL",
    name: "Brazilian Real",
  },
  {
    code: "MXN",
    name: "Mexican Peso",
  },
  {
    code: "THB",
    name: "Thai Baht",
  },
  {
    code: "MYR",
    name: "Malaysian Ringgit",
  },
  {
    code: "IDR",
    name: "Indonesian Rupiah",
  },
  {
    code: "PHP",
    name: "Philippine Peso",
  },
  {
    code: "PKR",
    name: "Pakistani Rupee",
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
  },
  {
    code: "LKR",
    name: "Sri Lankan Rupee",
  },
];

countries.forEach((country) => {
  const option1 = document.createElement("option");
  option1.value = country.code;
  option1.textContent = `${country.code}(${country.name})`;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = country.code;
  option2.textContent = `${country.code}(${country.name})`;
  toCurrency.appendChild(option2);

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
});

const getExchangeRate = async () => {
  const amount = parseFloat(fromAmount.value);
  const fromCurrrency = fromCurrency.value;
  const toCurrrency = toCurrency.value;
  resultElement.textContent = `Fetching Exchange Rates`;

  if (isNaN(amount)) {
    toAmount.value = "";
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ce2f11d2076802e1e58871d6/latest/${fromCurrrency}`,
    );
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);

    const conversionRate = data.conversion_rates[toCurrrency];

    const convertedAmount = (amount * conversionRate).toFixed(2);

    if (typeof conversionRate === "undefined") {
      resultElement.textContent = `Excchange rate data is not available 
        for selected`;
      convertedAmount = "";
    } else {
      toAmount.value = convertedAmount;
      resultElement.textContent = `${amount}${fromCurrrency} = ${convertedAmount} ${toCurrrency}`;
    }

  } catch (error) {
    converterContainer.innerHTML = `<h2>Error while fetching exchange rates!!!</h2>`;
  }
};
fromAmount.addEventListener("input", getExchangeRate);
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
