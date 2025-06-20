document.addEventListener("DOMContentLoaded", () => {
  const inputsToSave = document.querySelectorAll(
    '#ac-details-section input[type="text"], #ac-details-section input[type="number"]'
  );

  function saveAcDetails() {
    const acDetails = {};
    inputsToSave.forEach((input) => {
      acDetails[input.name] = input.value;
    });
    localStorage.setItem("acDetails", JSON.stringify(acDetails));
  }

  function loadAcDetails() {
    const savedDetails = JSON.parse(localStorage.getItem("acDetails"));
    if (savedDetails) {
      inputsToSave.forEach((input) => {
        if (savedDetails[input.name] !== undefined) {
          input.value = savedDetails[input.name];
        }
      });
    }
  }

  inputsToSave.forEach((input) => {
    input.addEventListener("input", saveAcDetails);
  });

  loadAcDetails();
});
