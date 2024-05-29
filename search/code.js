const api = `https://gist.githubusercontent.com/VasilyMur
/43ef6df83bba694f871f11a16ed7556d/raw/
b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json`;

const stations = [];

fetch(api)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((line) => {
            stations.push(...line.stations);
        });
    });

function getOptions(word, stations) {
    return stations.filter((s) => {
        const regex = new RegExp(word, "gi");
        return s.name.match(regex);
    });
}

function diaplayOptions() {
    const options = getOptions(this.value, stations);
    console.log(options);
    const html = options
        .map((station) => {
            const regex = new RegExp(this.value, "gi");
            const stationName = station.name.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            return `<li><span>${stationName}</span></li>`;
        })
        .slice(0, 20)
        .join("");
    searchOptions.innerHTML = this.value ? html : null;
}

const searchInput = document.querySelector(".search");
const searchOptions = document.querySelector(".options");
searchInput.addEventListener("change", diaplayOptions);
searchInput.addEventListener("keyup", diaplayOptions);
