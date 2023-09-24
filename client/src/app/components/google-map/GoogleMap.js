const key = "AIzaSyDqIrqD7WLhLNEXocCc3rX0XU-KCbm1k_M";
// process.env.NEXT_PUBLIC_MAPS_KEY;
const Locations = [
  {
    name: "Kolkata",
    description:
      "4th Floor, SDF Building, Saltlake Electronic Complex, Kolkata - 700091, West Bengal, India",
    latitude: 22.568982130889037,
    longitude: 88.4318210523579,
  },
  {
    name: "Chennai",
    description:
      "Workafella High Street, 316-III  Floor, 431 Anna Salai, Theynampet, Chennai - 600018, Tamil Nadu, India",
    latitude: 13.039090474880089,
    longitude: 80.24697213872587,
  },
  {
    name: "Mumbai",
    description:
      "91Springboard, Behind Shaman Wheels Showroom, Kalina, Santacruz East, Mumbai, 400098",
    latitude: 19.073058139427186,
    longitude: 72.86956088113193,
  },
  {
    name: "Hydrabad",
    description:
      "Workafella 6-3-252/2, Sri Ram Nest, Mega City, Irram Manzil Colony, Banjara Hills, Hyderabad,  Telangana 500082",
    latitude: 17.417142100523105,
    longitude: 78.45144750994233,
  },
];
const initMap = (Locations) => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.061387298387224, lng: 79.36231183790353 },
    zoom: 4,
  });

  Locations.forEach((location, i) => {
    const marker = new google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: map,
      title: location.name,
    });

    // Set timeout to stop drop animation after 1 second
    setTimeout(() => {
      pulsateMarker(marker);
    }, 1000);
  });
};

const pulsateMarker = (marker) => {
  let scale = 1;
  let opacity = 1;
  let scaleIncrement = 0.03;
  let opacityDecrement = 0.02;

  const scaleMarker = () => {
    scale += scaleIncrement;
    opacity -= opacityDecrement;

    marker.setOpacity(opacity);

    if (scale >= 1.2) {
      scaleIncrement = -0.03;
    } else if (scale <= 1) {
      scaleIncrement = 0.03;
    }

    if (opacity <= 0.2) {
      opacityDecrement = -0.02;
    } else if (opacity >= 1) {
      opacityDecrement = 0.02;
    }
  };

  setInterval(scaleMarker, 100); // Increase the interval to slow down the animation (e.g., 100 milliseconds)
};

const loadMapScript = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
  script.async = true;
  script.defer = true;

  script.addEventListener("load", () => {
    initMap(Locations);
  });

  document.body.appendChild(script);
};

export { initMap, pulsateMarker, loadMapScript };

const colors = ["#d71f27", "#184ca1", "#0fb81f", "#fde000"];
