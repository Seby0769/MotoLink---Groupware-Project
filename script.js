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

const searchLocation = document.querySelector("#search-location");
const carduriFavorite = document.querySelectorAll(".favorite-card");

if (searchLocation) 
    {
    searchLocation.addEventListener("input", function() {
        const cautare = searchLocation.value.toLowerCase().trim();

        carduriFavorite.forEach(function(card) {
            const textCard = card.textContent.toLowerCase();

            if (textCard.includes(cautare)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}
if (document.getElementById("map")) {
    const map = L.map("map").setView([47.1585, 27.6014], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    let markerUtilizator = null;

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                if (markerUtilizator === null) {
                    markerUtilizator = L.circleMarker([lat, lng], {
                        radius: 9,
                        color: "white",
                        weight: 3,
                        fillColor: "#2196F3",
                        fillOpacity: 1
                    }).addTo(map);

                    markerUtilizator.bindPopup("📍 Locația mea");
                    map.setView([lat, lng], 16);
                } else {
                    markerUtilizator.setLatLng([lat, lng]);
                }
            },
            function(error) {
                console.log("Eroare GPS:", error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 15000
            }
        );
    } else {
        console.log("Browserul nu suporta geolocalizarea.");
    }
}

const editProfileBtn = document.querySelector(".edit-profile-btn");
const editProfileForm = document.querySelector("#edit-profile-form");

if (editProfileBtn && editProfileForm) {
    const displayName = document.querySelector("#display-name");
    const displayMotorcycle = document.querySelector("#display-motorcycle");
    const displayCity = document.querySelector("#display-city");
    const displayBio = document.querySelector("#display-bio");

    const profileName = document.querySelector("#profile-name");
    const profileMotorcycle = document.querySelector("#profile-motorcycle");
    const profileCity = document.querySelector("#profile-city");
    const profileBio = document.querySelector("#profile-bio");

    const savedProfile = localStorage.getItem("motolink-profile");

    if (savedProfile) {
        const profile = JSON.parse(savedProfile);

        displayName.textContent = profile.name;
        displayMotorcycle.textContent = "🏍️ " + profile.motorcycle;
        displayCity.textContent = "📍 " + profile.city;
        displayBio.textContent = profile.bio;
    }

    editProfileBtn.addEventListener("click", function() {
        editProfileForm.hidden = !editProfileForm.hidden;

        if (!editProfileForm.hidden) {
            profileName.value = displayName.textContent;
            profileMotorcycle.value = displayMotorcycle.textContent.replace("🏍️ ", "");
            profileCity.value = displayCity.textContent.replace("📍 ", "");
            profileBio.value = displayBio.textContent;
        }
    });

    editProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const profile = {
            name: profileName.value.trim(),
            motorcycle: profileMotorcycle.value.trim(),
            city: profileCity.value.trim(),
            bio: profileBio.value.trim()
        };

        displayName.textContent = profile.name;
        displayMotorcycle.textContent = "🏍️ " + profile.motorcycle;
        displayCity.textContent = "📍 " + profile.city;
        displayBio.textContent = profile.bio;

        localStorage.setItem("motolink-profile", JSON.stringify(profile));

        editProfileForm.hidden = true;
    });
}

