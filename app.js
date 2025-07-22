const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns = document.querySelectorAll('.currency-wrapper select');
const btn = document.querySelector('.convert-btn');
const fromCurr = document.querySelector('.from-currency select');
const toCurr = document.querySelector('.to-currency select');
const msg = document.querySelector('.converted-amount');

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from-currency" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to-currency" && currCode === "NPR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener('change', (evt) => {
            updateFlag(evt.target)
        })
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount');
    let amtVal = amount.value;
    if(amount === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmount = amtVal * rate;
    msg.innerText = finalAmount;
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load', () => {
    updateExchangeRate();
}) 