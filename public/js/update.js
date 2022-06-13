const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');
const storeLat = document.getElementById('store-lat');
const storeLong = document.getElementById('store-long');

// Send POST to API to add store
async function updateStore(e) {
  e.preventDefault();

  if (storeId.value === '' || storeAddress.value === '' || storeLat.value === '' || storeLong.value === '') {
    alert('Please fill in fields');
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value,
    latitude: storeLat.value,
    longitude: storeLong.value

  };

  try {
    const res = await fetch('/api/v1/stores', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
        throw Error('Store not exist!');
      }
    if (res.status === 401) {
      throw Error('Store not exist!');
    }

    alert('Store added!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', updateStore);
