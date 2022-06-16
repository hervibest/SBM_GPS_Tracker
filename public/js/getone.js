const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");


// Get user location automatically

function showError(error) {
  alert(error.message);
}


// Send POST to API to add store
async function getStore(e) {
  e.preventDefault();

  if (
    storeId.value === ""
  ) {
    alert("Please fill in fields");
  }

  

  try {
    const res = await fetch(`/api/v1/stores/getstore/${storeId.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
    const data = await res.json();
    console.log(data)
    if (res.status === 400) {
      throw Error("Store not exist!");
    }
    if (res.status === 401) {
      throw Error("Store not exist!");
    }

;
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", getStore);
