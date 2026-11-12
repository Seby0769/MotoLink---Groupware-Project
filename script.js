function deschideMeniu() 
{
    const meniu = document.querySelector(".quick-menu");

    if (meniu.style.display === "block") {
        meniu.style.display = "none";
    } else {
        meniu.style.display = "block";
    }
}

function deschideIncident() 
{
    const formular = document.querySelector(".incident-form");
    formular.style.display = "block";
}
function inchideIncident() 
{
    const formular = document.querySelector(".incident-form");
    formular.style.display = "none";
}
const formularIncident = document.querySelector(".incident-report");

if (formularIncident) 
    {
    formularIncident.addEventListener("submit", function(event) {
        event.preventDefault();

        const mesaj = document.querySelector("#mesaj-incident");
        mesaj.style.display = "block";
    });
}


const butoaneFavorite = document.querySelectorAll(".favorite-btn");

butoaneFavorite.forEach(function(buton) {
    const locatie = buton.dataset.location;
    const esteSalvat = localStorage.getItem(locatie);
    if (esteSalvat === "true") {
        buton.classList.add("saved");
        buton.textContent = "♥ Adăugat la favorite";
    }
    buton.addEventListener("click", function() {
        buton.classList.toggle("saved");

        if (buton.classList.contains("saved")) {
            buton.textContent = "♥ Adăugat la favorite";
            localStorage.setItem(locatie, "true");
        } else {
            buton.textContent = "♡ Adaugă la favorite";
            localStorage.removeItem(locatie);
        }
    });
});
