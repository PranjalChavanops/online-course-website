/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});


/* =====================================================
   COURSE FILTER
===================================================== */

const categoryButtons =
    document.querySelectorAll(".category-card");

const courseCards =
    document.querySelectorAll(".course-card");

const searchInput =
    document.getElementById("courseSearch");

const noResults =
    document.getElementById("noResults");

let selectedCategory = "All";


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active-category");
        });

        button.classList.add("active-category");

        selectedCategory =
            button.getAttribute("data-category");

        filterCourses();

    });

});


searchInput.addEventListener("input", () => {

    filterCourses();

});


function filterCourses() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCourses = 0;


    courseCards.forEach(card => {

        const category =
            card.getAttribute("data-category");

        const courseName =
            card.getAttribute("data-course").toLowerCase();


        const categoryMatch =
            selectedCategory === "All" ||
            category === selectedCategory;


        const searchMatch =
            courseName.includes(searchText);


        if (categoryMatch && searchMatch) {

            card.style.display = "block";
            visibleCourses++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCourses === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* =====================================================
   ENROLL BUTTON
===================================================== */

const enrollButtons =
    document.querySelectorAll(".enroll-course-btn");

const courseSelect =
    document.getElementById("course");

const enrollSection =
    document.getElementById("enroll");


enrollButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCourse =
            button.getAttribute("data-course");

        courseSelect.value = selectedCourse;

        enrollSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =====================================================
   FORM VALIDATION
===================================================== */

const enrollmentForm =
    document.getElementById("enrollmentForm");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const course =
    document.getElementById("course");

const terms =
    document.getElementById("terms");

const successMessage =
    document.getElementById("successMessage");


enrollmentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    /* Clear previous errors */

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("courseError").textContent = "";
    document.getElementById("termsError").textContent = "";

    successMessage.style.display = "none";


    let valid = true;


    /* NAME */

    if (fullName.value.trim() === "") {

        document.getElementById("nameError").textContent =
            "Please enter your full name.";

        valid = false;

    } else if (fullName.value.trim().length < 3) {

        document.getElementById("nameError").textContent =
            "Name must contain at least 3 characters.";

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email.value.trim() === "") {

        document.getElementById("emailError").textContent =
            "Please enter your email address.";

        valid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    /* PHONE */

    const phonePattern =
        /^[6-9][0-9]{9}$/;


    if (phone.value.trim() === "") {

        document.getElementById("phoneError").textContent =
            "Please enter your phone number.";

        valid = false;

    } else if (!phonePattern.test(phone.value.trim())) {

        document.getElementById("phoneError").textContent =
            "Enter a valid 10-digit Indian phone number.";

        valid = false;

    }


    /* COURSE */

    if (course.value === "") {

        document.getElementById("courseError").textContent =
            "Please select a course.";

        valid = false;

    }


    /* TERMS */

    if (!terms.checked) {

        document.getElementById("termsError").textContent =
            "Please agree to the enrollment terms.";

        valid = false;

    }


    /* SUCCESS */

    if (valid) {

        successMessage.style.display = "flex";

        enrollmentForm.reset();

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});


/* =====================================================
   PHONE INPUT
===================================================== */

phone.addEventListener("input", () => {

    phone.value =
        phone.value.replace(/\D/g, "").slice(0, 10);

});