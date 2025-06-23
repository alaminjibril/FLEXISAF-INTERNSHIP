var carTypes = ["sedan", "suv", "truck"];
var carPrices = {
  sedan: 30000,
  suv: 50000,
  truck: 70000
};

// Form handling
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("booking-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from submitting right away

    var carType = document.getElementById("car-type").value;
    var pickupDate = new Date(document.getElementById("pickup-date").value);
    var returnDate = new Date(document.getElementById("return-date").value);

    if (!carType || isNaN(pickupDate) || isNaN(returnDate)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Check date difference
    var timeDiff = returnDate - pickupDate;
    var days = timeDiff / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      alert("Return date must be after pick-up date.");
      return;
    }

    var pricePerDay = carPrices[carType];
    var total = pricePerDay * days;

    alert("You booked a " + carType + " for " + days + " days.\nTotal: ₦" + total.toLocaleString());

    // Redirect to thank you page
    window.location.href = "thank_you.html";
  });
});
