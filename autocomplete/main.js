// сделал по этому уроку
// https://www.youtube.com/watch?v=OXd_wv7Qi4g&t=825s

const inputEl = document.querySelector("#autocomplete-input");
inputEl.addEventListener("input", onInputChange);
let countryNames = [];

async function getCountryData() {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const data = await countryRes.json();
    data.forEach((c) => {
        countryNames.push(c.name.common);
    });
}

getCountryData();

function onInputChange() {
    removeAutocompleteDropdown();
    const value = inputEl.value.toLowerCase();
    if (value.length === 0) return;
    const filteredNames = [];
    countryNames.forEach((country) => {
        if (country.substr(0, value.length).toLowerCase() === value) {
            filteredNames.push(country);
        }
    });
    createAutocompleteDropdown(filteredNames);
}

function createAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.className = "autocomplete-list";
    listEl.id = "autocomplete-list";

    list.forEach((country) => {
        const listItem = document.createElement("li");
        const countryButton = document.createElement("button");
        countryButton.innerHTML = country;
        countryButton.addEventListener("click", onCoubtryButtonClick);
        listItem.appendChild(countryButton);
        listEl.appendChild(listItem);
    });
    document.querySelector(".autocomplete-wrapper").appendChild(listEl);
}

function removeAutocompleteDropdown() {
    const listEl = document.querySelector("#autocomplete-list");
    if (listEl) listEl.remove();
}

function onCoubtryButtonClick(e) {
    e.preventDefault();
    buttonEl = e.target;
    inputEl.value = buttonEl.innerHTML;
    removeAutocompleteDropdown();
}
