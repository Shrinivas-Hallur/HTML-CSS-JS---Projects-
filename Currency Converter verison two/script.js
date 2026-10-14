const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const reverseBtn = document.querySelector(".dropdown i");

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  console.log(data)
  let rate =
    data[fromCurr.value.toLowerCase()]
        [toCurr.value.toLowerCase()];

  let finalAmount = Number(amtVal) * rate;

  msg.innerText =
    `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const reverseCurrencies = () => {
  let temp = fromCurr.value;

  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  updateFlag(fromCurr);
  updateFlag(toCurr);

  updateExchangeRate();
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }
}

for (let select of dropdowns) {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
}

reverseBtn.addEventListener("click", () => {
  reverseCurrencies();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});