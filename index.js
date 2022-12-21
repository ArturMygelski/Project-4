const currencySelect = document.querySelector("#currencySelect");
const button = document.querySelector("#getCurrencies");
const input = document.querySelector("#input");
const url = "https://api.nbp.pl/api/exchangerates/tables/A/";
const select = document.createElement("select");
const result = document.querySelector("#result");

function updateValue(e) {
  if (input.value < 0) {
    alert("Brak możliwości wpisana liczb ujemnych");
  } else {
    getValueData();
  }
}

const getCurrencies = () => {
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      const allRates = data[0].rates;
      allRates.forEach(({ code, currency }) => {
        const option = document.createElement("option");
        option.value = code;
        option.innerText = `${code} (${currency})`;
        select.appendChild(option);
      });

      currencySelect.appendChild(select);
    })
    .catch((err) => console.log(err));
};
const getValueData = () => {
  const selectedValue = select.value;
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      const rateCurrency = data[0].rates;
      const exMid = rateCurrency.find((item) => item.code === selectedValue);
      result.innerText = (input.value * exMid.mid).toFixed(2);
    })
    .catch((err) => console.log(err));
};
getCurrencies();
button.addEventListener("click", updateValue, getValueData);
select.addEventListener("click", getValueData);
