const colorPicker = document.getElementById("primaryColorPicker");

// Load saved color
const savedColor = localStorage.getItem("primaryColor");
if (savedColor) {
  document.documentElement.style.setProperty("--primary-color", savedColor);
  colorPicker.value = savedColor;
}

// Change color on selection
colorPicker.addEventListener("input", (e) => {
  const newColor = e.target.value;
  document.documentElement.style.setProperty("--primary-color", newColor);
  localStorage.setItem("primaryColor", newColor);
});
