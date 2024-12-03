document.addEventListener("DOMContentLoaded", () => {
    const capsuleContainer = document.querySelector(".capsule-container");
  
    const capsules = [
      {
        title: "Dream Job",
        message: "I hope to land my dream job at SpaceTech Inc. by 2025!",
        unlockDate: "2025-06-10",
      },
      {
        title: "Personal Growth",
        message: "I want to be fluent in French and travel to Paris!",
        unlockDate: "2024-12-25",
      },
      {
        title: "Health Goal",
        message: "Run a marathon and maintain a healthy lifestyle.",
        unlockDate: "2025-03-15",
      },
    ];
  
    capsules.forEach((capsule) => {
      const capsuleEntry = document.createElement("div");
      capsuleEntry.classList.add("capsule-entry");
  
      capsuleEntry.innerHTML = `
        <h3>${capsule.title}</h3>
        <p>${capsule.message}</p>
        <div class="unlock-date">Unlocks on: ${capsule.unlockDate}</div>
      `;
  
      capsuleContainer.appendChild(capsuleEntry);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const capsuleForm = document.getElementById("capsule-form");
    const capsuleContainer = document.querySelector(".capsule-container");
  
    capsuleForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const title = document.getElementById("capsule-title").value;
      const message = document.getElementById("capsule-message").value;
      const unlockDate = document.getElementById("unlock-date").value;
      const unlockTime = document.getElementById("unlock-time").value; // get time value

      const capsuleEntry = document.createElement("div");
      capsuleEntry.classList.add("capsule-entry");
  
      const previewMessage = message.length > 100 ? message.substring(0, 100) + "..." : message;
  
      // add time value
      capsuleEntry.innerHTML = `
        <h3>${title}</h3>
        <p>${previewMessage}</p>
        <div class="unlock-date">Unlocks on: ${unlockDate} at ${unlockTime} clock</div>
      `; 
  
      capsuleContainer.appendChild(capsuleEntry);
      
      capsuleForm.reset();
    });
  });
  