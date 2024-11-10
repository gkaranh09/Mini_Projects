const dropdown = document.querySelectorAll(".select-container select");
const flagimg = document.querySelectorAll(".select-container img");
const convertAmount = document.querySelector(".convertMessage");
const uservalue = document.querySelector("#amount");
const submit = document.querySelector(".Submit-btn");
const ConvertMessage = document.querySelector(".ConvertedMessege");
const option = document.querySelectorAll("option");
const reverse = document.querySelector("i");
const Lastupdate = document.querySelector(".updated-date");
for (let select of dropdown) {
  for (let CurrCode in countryList1) {
    let option = document.createElement("option");
    option.innerText = countryList1[CurrCode].fullName;
    option.value = CurrCode;
    if (select.name === "from" && CurrCode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && CurrCode === "INR") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (evt) => {
    UpdateFlag(evt.target);
    CallApi();
  });
}

UpdateFlag = (element) => {
  let CurrCode = element.value;
  let CountryCode = countryList1[CurrCode].countryCode;
  newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
  let flagimg = element.parentElement.querySelector("img");
  flagimg.src = newSrc;
};

const getdata = async (Fromcode, Tocode) => {
  let response;
  try {
    response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${Fromcode.toLowerCase()}.json`
    );
  } catch {
    alert("API fails");
  }
  let data = await response.json();
  let convertdata = data[Fromcode.toLowerCase()][Tocode.toLowerCase()];
  UpdateMessage(Fromcode, Tocode, convertdata);
  Lastupdate.innerText = `Last Updated ${data.date}`;
};

let CallApi = () => {
  const fromValue = dropdown[0].value;
  const toValue = dropdown[1].value;
  getdata(fromValue, toValue);
};
let UpdateMessage = (Fromcode, Tocode, ConvertedValue) => {
  let InputValue = 0;
  InputValue = uservalue.value;
  let convertValofInput = InputValue * ConvertedValue;
  convertAmount.innerText = `${InputValue} ${Fromcode} = ${convertValofInput.toFixed(
    4
  )} ${Tocode} `;
};

document.addEventListener("DOMContentLoaded", () => {
  CallApi();
});

reverse.addEventListener("click", () => {
  let temp = dropdown[0].value;
  dropdown[0].value = dropdown[1].value;
  dropdown[1].value = temp;
  UpdateFlag(dropdown[0]);
  UpdateFlag(dropdown[1]);
  CallApi();
});

uservalue.addEventListener("input", () => {
  uservalue.value = Math.abs(uservalue.value);
  CallApi();
});
