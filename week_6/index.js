// Data setup
var carPrices = {
  sedan: 30000,
  suv: 50000,
  truck: 70000
};


document.addEventListener("DOMContentLoaded", function () {
  // selectors
  var form = document.getElementById("booking-form");
  var output = document.getElementById("booking-output");
  var carTypeSelect = document.getElementById("car-type");

  // Event Listener with callback function
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default submit

    var carType = carTypeSelect.value;
    var pickup = new Date(document.getElementById("pickup-date").value);
    var dropoff = new Date(document.getElementById("return-date").value);

    if (!carType || isNaN(pickup) || isNaN(dropoff)) {
      showMessage("Please complete the form correctly.", "red");
      return;
    }

    var days = (dropoff - pickup) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      showMessage("Return date must be after pick-up date.", "orange");
      return;
    }

    var total = days * carPrices[carType];

   
    output.innerHTML = `<p>You booked a <strong>${carType}</strong> for <strong>${days}</strong> day(s).<br>Total cost: <strong>₦${total.toLocaleString()}</strong></p>`;


    setTimeout(function () {
      window.location.href = "thank_you.html";
    }, 3000);
  });


  carTypeSelect.addEventListener("change", function () {
    var value = carTypeSelect.value;
    if (value) {
      console.log("You selected:", value); // callback
    }
  });

  function showMessage(msg, color) {
    output.innerHTML = `<p style="color:${color}; font-weight:bold;">${msg}</p>`;
  }
});
