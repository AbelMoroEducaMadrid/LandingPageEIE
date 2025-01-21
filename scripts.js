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
  const slideshowContainer = document.querySelector(".slideshow")
  const slideshowNav = document.querySelector(".slideshow-nav")
  const slides = []
  let currentSlide = 0

  function createSlide(slideData, index) {
    const slide = document.createElement("div")
    slide.classList.add("slide")
    slide.style.backgroundImage = `url(${slideData.image})`

    const content = document.createElement("div")
    content.classList.add("slide-content")

    const title = document.createElement("h2")
    title.textContent = slideData.title

    const text = document.createElement("p")
    text.textContent = slideData.text

    content.appendChild(title)
    content.appendChild(text)
    slide.appendChild(content)

    if (index === 0) {
      slide.classList.add("active")
    }

    return slide
  }

  function createNavDot(index) {
    const dot = document.createElement("div")
    dot.classList.add("nav-dot")
    if (index === 0) {
      dot.classList.add("active")
    }
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
    return dot
  }

  function showNextSlide() {
    slides[currentSlide].classList.remove("active")
    slideshowNav.children[currentSlide].classList.remove("active")
    currentSlide = (currentSlide + 1) % slides.length
    slides[currentSlide].classList.add("active")
    slideshowNav.children[currentSlide].classList.add("active")
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active")
    slideshowNav.children[currentSlide].classList.remove("active")
    currentSlide = index
    slides[currentSlide].classList.add("active")
    slideshowNav.children[currentSlide].classList.add("active")
  }

  // Fetch and display slideshow
  fetch("data/slideshow.json")
    .then((response) => response.json())
    .then((slideshowData) => {
      slideshowData.forEach((slideData, index) => {
        const slide = createSlide(slideData, index)
        slideshowContainer.appendChild(slide)
        slides.push(slide)

        const navDot = createNavDot(index)
        slideshowNav.appendChild(navDot)
      })

      setInterval(showNextSlide, 5000)
    })
    .catch((error) => console.error("Error loading slideshow:", error))

  // Fetch and display testimonials
  fetch("data/testimonials.json")
    .then((response) => response.json())
    .then((testimonials) => {
      const testimoniosContainer = document.querySelector(".testimonios-container")
      testimonials.forEach((testimonial) => {
        const testimonioElement = document.createElement("div")
        testimonioElement.classList.add("testimonio")

        const starsHTML =
          '<div class="stars">' + "★".repeat(testimonial.stars) + "☆".repeat(5 - testimonial.stars) + "</div>"

        testimonioElement.innerHTML = `
          ${starsHTML}
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

