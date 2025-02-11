// Sample data (in a real application, this would come from a backend)
const events = [
  {
    title: "Annual Alumni Meet",
    date: "2024-07-15",
    location: "IGDTUW Campus",
  },
  {
    title: "Tech Talk: AI in Healthcare",
    date: "2024-08-22",
    location: "Virtual",
  },
  { title: "Career Fair", date: "2024-09-10", location: "IGDTUW Auditorium" },
];

const jobs = [
  { title: "Software Engineer", company: "TechCorp", location: "Delhi" },
  { title: "Data Scientist", company: "AI Solutions", location: "Bangalore" },
  { title: "Product Manager", company: "StartupX", location: "Mumbai" },
];

// Populate events
function populateEvents() {
  const eventList = document.getElementById("event-list");
  events.forEach(event => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("card");
    eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
        `;
    eventList.appendChild(eventCard);
  });
}

// Populate job board
function populateJobs() {
  const jobList = document.getElementById("job-list");
  jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("card");
    jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
        `;
    jobList.appendChild(jobCard);
  });
}

// // Sample alumni data
// const alumniData = [
//     {
//         name: "Monkey D. Luffy",
//         designation: "Data Scientist",
//         company: "DataWorks",
//         image: "image1.jpg", // replace with actual image path
//         linkedin: "https://linkedin.com/in/michaelbrown",
//         github: "https://github.com/michaelbrown",
//         twitter: "https://twitter.com/michaelbrown"
//     },
//     {
//         name: "Naruto Uzumaki",
//         designation: "Senior Developer",
//         company: "TechCorp",
//         image: "image2.jpg", // replace with actual image path
//         linkedin: "https://linkedin.com/in/johndoe",
//         github: "https://github.com/johndoe",
//         twitter: "https://twitter.com/johndoe"
//     },
//     {
//         name: "Yagami Light",
//         designation: "Data Scientist",
//         company: "DataWorks",
//         image: "image3.jpg", // replace with actual image path
//         linkedin: "https://linkedin.com/in/michaelbrown",
//         github: "https://github.com/michaelbrown",
//         twitter: "https://twitter.com/michaelbrown"
//     },
//     {
//         name: "Uchiha Sasuke",
//         designation: "Data Scientist",
//         company: "DataWorks",
//         image: "image4.jpg", // replace with actual image path
//         linkedin: "https://linkedin.com/in/michaelbrown",
//         github: "https://github.com/michaelbrown",
//         twitter: "https://twitter.com/michaelbrown"
//     },
// ];

// // Render alumni cards dynamically
// function renderAlumni(alumniList) {
//     const alumniListContainer = document.getElementById('alumni-list');
//     alumniListContainer.innerHTML = '';

//     alumniList.forEach(alumni => {
//         const alumniCard = document.createElement('div');
//         alumniCard.classList.add('alumni-card');

//         alumniCard.innerHTML = `
//             <img src="${alumni.image}" alt="Alumni Image">
//             <div class="alumni-info">
//                 <h3>${alumni.name}</h3>
//                 <p class="designation">${alumni.designation}</p>
//                 <p class="company">${alumni.company}</p>
//                 <div class="social-links">
//                     <a href="${alumni.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
//                     <a href="${alumni.github}" target="_blank"><i class="fab fa-github"></i></a>
//                     <a href="${alumni.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
//                 </div>
//             </div>
//         `;

//         alumniListContainer.appendChild(alumniCard);
//     });
// }

// // Initial render of all alumni
// renderAlumni(alumniData);

// Fetch alumni from MongoDB and display them
async function fetchAlumni() {
  try {
    const response = await fetch("http://localhost:5000/api/alumni"); // Fetch from backend
    const alumniList = await response.json();
    renderAlumni(alumniList); // Render fetched alumni
  } catch (err) {
    console.error("Error fetching alumni:", err);
  }
}

// Render alumni on the webpage
function renderAlumni(alumniList) {
  const alumniListContainer = document.getElementById("alumni-list");
  alumniListContainer.innerHTML = ""; // Clear previous entries

  alumniList.forEach(alumni => {
    const alumniCard = document.createElement("div");
    alumniCard.classList.add("alumni-card");

    alumniCard.innerHTML = `
            <img src="${alumni.image}" alt="Alumni Image">
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="designation">${alumni.designation}</p>
                <p class="company">${alumni.company}</p>
                <div class="social-links">
                    <a href="${alumni.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="${alumni.github}" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="${alumni.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        `;

    alumniListContainer.appendChild(alumniCard);
  });
}

// Handle form submission (Send data to backend)
function handleAlumniFormSubmission() {
  document
    .getElementById("alumni-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const newAlumni = {
        name: document.getElementById("name").value,
        designation: document.getElementById("designation").value,
        company: document.getElementById("company").value,
        image: document.getElementById("image").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        twitter: document.getElementById("twitter").value,
      };

      console.log("Submitting Data:", newAlumni); // Debugging log

      try {
        const response = await fetch("http://localhost:5000/api/alumni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAlumni),
        });

        if (response.ok) {
          console.log("Data Saved! Fetching updated list...");
          fetchAlumni(); // Refresh alumni list after submission for dynamic rendering
        } else {
          console.error("Submission Failed:", response.status);
        }
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    });
}

// Search functionality
const searchAlumniInput = document.getElementById("search-alumni");
if (searchAlumniInput) {
  searchAlumniInput.addEventListener("input", function (event) {
    const searchQuery = event.target.value.toLowerCase();
    const filteredAlumni = alumniData.filter(
      alumni =>
        alumni.name.toLowerCase().includes(searchQuery) ||
        alumni.company.toLowerCase().includes(searchQuery)
    );
    renderAlumni(filteredAlumni);
  });
}

// Handle mentorship form submission
function handleMentorshipForm() {
  const form = document.getElementById("mentorship-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log("Mentorship form submitted:", data);
    alert("Thank you for signing up for the mentorship program!");
    form.reset();
  });
}

// Initialize the page
function init() {
  populateEvents();
  populateJobs();
  fetchAlumni();
  handleAlumniFormSubmission();
  handleMentorshipForm();
}

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
