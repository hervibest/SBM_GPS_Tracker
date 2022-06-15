const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");


// Get user location automatically

function showError(error) {
  alert(error.message);
}


// Send POST to API to add store
async function deleteStores(e) {
  e.preventDefault();

  if (
    storeId.value === ""
  ) {
    alert("Please fill in fields");
  }

  const sendBody = {
    storeId: storeId.value,
  };

  try {
    const res = await fetch("/api/v1/stores", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store not exist!");
    }
    if (res.status === 401) {
      throw Error("Store not exist!");
    }

    alert("Device deleted!");
    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", deleteStores);
