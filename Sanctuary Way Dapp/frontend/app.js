// Scroll to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
    const scrollUp = document.getElementById("scrollUp");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollUp.style.display = "block";
        } else {
            scrollUp.style.display = "none";
        }
    });

    // Scroll smoothly to top when clicked
    scrollUp.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



// nav hide  
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function(a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})





