const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const search = document.querySelector(".search");
const suggestionList = document.querySelector(".suggestions");
const cityList = getCityList();
const defaultSugList = "<li>Filter for a city</li><li>or a state</li>";

search.addEventListener('input', function checkIput() {
    var searchContents = search.value;
    if (searchContents) {
        suggestionList.innerHTML = '';
        var suggs = getSuggestions(searchContents);
        updateSuggestions(suggs);
    }
    else
        suggestionList.innerHTML = defaultSugList;
});

// Returns an array called cities of location json objects
function getCityList() {
    var cities = [];

    fetch(api)
    .then(res => res.json())
    .then(data => data.forEach(el => cities.push(el)));
    return cities;
}

function getSuggestions(pattern) {
    const regex = new RegExp(pattern, 'gi');
    var matches = [];
    
    // Searching cityList for locations matching the input in the search bar
    for (loc of cityList) {
        if(loc.city.match(regex) || loc.state.match(regex)) {
            let html = htmlFormation(`${loc.city}, ${loc.state}`, pattern);
            matches.push(html);
        }
    }

    return matches;
}

// Appending the suggestions at the end of the suggestions UL element
function updateSuggestions(suggestions) {
    for (sugg of suggestions) {
        suggestionList.insertAdjacentHTML('beforeend', sugg);
    }
}

// Formating the matches to html friendly text
function htmlFormation(match, pattern)
{
    let html;
    html = `<li>${match.replace(new RegExp(pattern,'gi'), '<span class="hl">' + pattern + '</span>')}</li>`;
    return html;
}