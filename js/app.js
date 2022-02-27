// Load Country Data Using API 
const loadCountryData = () =>{
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => singleCountryObject(data));
}
loadCountryData();

// Get Single Country Object and show in DOM
const singleCountryObject = countrys =>{
    const countryAreaDom = document.getElementById('countrys-area');
    countrys.forEach(country =>{
        // console.log(country);
        const div = document.createElement('div');
        div.classList.add('about-country')
        div.innerHTML = `
            <div class="country-image">
                <img src="${country.flags.png}" alt="">
            </div>
            <div class="country-text">
                <h5>${country.name.common}</h5>
                <p class="capital">${country.capital}</p>
                <p class="currency">${country.status}</p>
                <button onclick="singleCountryForModal('${country.name.common}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More..</button>
            </div>
        `;
        countryAreaDom.appendChild(div);
    });
};

// Get single country for modal
const singleCountryForModal = country => {
    // console.log(country);
    const url = `https://restcountries.com/v3.1/name/${country}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => pushCountryInModal(data[0]));
};
// Push single country in Modal
const pushCountryInModal = country => {
    console.log(country);
    const body = document.getElementById('modal-body');
    body.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
            <img src="${country.flags.png}" alt="" width="100%">
            <h5 class="text-gray">Offcial Name</h5>
            <h3>${country.name.official}</h3>
            <h5 class="text-gray">Capital</h5>
            <h4>${country.capital}</h4>
            <h5 class="text-gray">Region</h5>
            <p>${country.region}</p>
            <a href="${country.maps.googleMaps}" class="fw-bold" target="_blank">Google Map</a>
            `;
    const title = document.getElementById('exampleModalLabel');
    title.innerText = country.name.common;
    body.appendChild(div);
};