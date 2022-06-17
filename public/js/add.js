const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");
const storeLat = document.getElementById("store-lat");
const storeLong = document.getElementById("store-long");
const lockButton = document.getElementById("loc-check");

// Get user location automatically
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  storeLat.value = position.coords.latitude;
  storeLong.value = position.coords.longitude;
}

function showError(error) {
  alert(error.message);
}

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  if (
    storeId.value === "" ||
    storeAddress.value === "" ||
    storeLat.value === "" ||
    storeLong.value === ""
  ) {
    alert("Please fill in fields");
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value,
    latitude: storeLat.value,
    longitude: storeLong.value,
  };

  try {
    const res = await fetch("/api/v1/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 409) {
      throw Error("Store already exists!");
    }
    if(res.status === 400) {
      throw Error("Bad request! Name must be alphanumeric, lat/long must be numeric");
    }
    else if (res.status !== 201) {
      throw Error(res.body["error"] === undefined ? res.status : res.body["error"]);
    }

    alert("Device added!");
    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
lockButton.addEventListener("click", getLocation);
