document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
console.log(data);
    // Send data to the server via POST request
    fetch("/formSubmit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Form data submitted successfully:", result);
        // You can handle the response from the server here
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  });
});
