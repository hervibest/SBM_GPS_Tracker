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

// Send PUT to API to add store
async function updateStore(e) {
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Device not exist!");
    }
    if (res.status === 401) {
      throw Error("Device not exist!");
    }

    alert("Device updated!");
    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", updateStore);
lockButton.addEventListener("click", getLocation);
