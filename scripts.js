document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Slideshow
  const slideshowImages = document.querySelectorAll(".slideshow img")
  let currentSlide = 0

  function showNextSlide() {
    slideshowImages[currentSlide].classList.remove("active")
    currentSlide = (currentSlide + 1) % slideshowImages.length
    slideshowImages[currentSlide].classList.add("active")
  }

  setInterval(showNextSlide, 5000)
  slideshowImages[0].classList.add("active")

  // Fetch and display testimonials
  fetch("data/testimonials.json")
    .then((response) => response.json())
    .then((testimonials) => {
      const testimoniosContainer = document.querySelector(".testimonios-container")
      testimonials.forEach((testimonial) => {
        const testimonioElement = document.createElement("div")
        testimonioElement.classList.add("testimonio")
        testimonioElement.innerHTML = `
                <p>"${testimonial.quote}"</p>
                <p class="cliente">${testimonial.client}</p>
            `
        testimoniosContainer.appendChild(testimonioElement)
      })
    })
    .catch((error) => console.error("Error loading testimonials:", error))

  // Form submission
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.")
    contactForm.reset()
  })
})

