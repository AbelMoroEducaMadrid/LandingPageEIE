document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      const headerOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition - headerOffset

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      })
    })
  })

  // Generic Slideshow function
  function createSlideshow(containerSelector, navSelector, dataUrl) {
    const container = document.querySelector(containerSelector)
    const nav = document.querySelector(navSelector)
    const slides = []
    let currentSlide = 0
    let slideInterval

    function showNextSlide() {
      slides[currentSlide].classList.remove("active")
      nav.children[currentSlide].classList.remove("active")
      currentSlide = (currentSlide + 1) % slides.length
      slides[currentSlide].classList.add("active")
      nav.children[currentSlide].classList.add("active")
    }

    function startSlideTimer() {
      clearInterval(slideInterval)
      slideInterval = setInterval(showNextSlide, 5000)
    }

    function goToSlide(index) {
      slides[currentSlide].classList.remove("active")
      nav.children[currentSlide].classList.remove("active")
      currentSlide = index
      slides[currentSlide].classList.add("active")
      nav.children[currentSlide].classList.add("active")
      startSlideTimer()
    }

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((slideData, index) => {
          const slide = document.createElement("div")
          slide.classList.add("slide")
          slide.style.backgroundImage = `url(${slideData.image})`

          const content = document.createElement("div")
          content.classList.add("slide-content")

          const title = document.createElement("h2")
          title.textContent = slideData.title

          const text = document.createElement("p")
          text.textContent = slideData.content || slideData.text

          content.appendChild(title)
          content.appendChild(text)
          slide.appendChild(content)

          if (index === 0) {
            slide.classList.add("active")
          }

          container.appendChild(slide)
          slides.push(slide)

          const navDot = document.createElement("div")
          navDot.classList.add("nav-dot")
          if (index === 0) {
            navDot.classList.add("active")
          }
          navDot.addEventListener("click", () => {
            goToSlide(index)
          })
          nav.appendChild(navDot)
        })

        setInterval(showNextSlide, 5000)
        startSlideTimer()
      })
      .catch((error) => console.error(`Error loading slideshow from ${dataUrl}:`, error))
  }

  // Main Slideshow
  createSlideshow(".slideshow", ".slideshow-nav", "data/slideshow.json")

  // Sobre Medida Slideshow
  createSlideshow(".sobre-medida-slideshow", ".sobre-medida-nav", "data/sobre-medida.json")

  // Testimonials slideshow
  function createTestimonialsSlideshow() {
    const container = document.querySelector(".testimonios-slideshow")
    let testimonials = []
    let currentIndex = 0

    function showTestimonials() {
      container.innerHTML = ""
      for (let i = 0; i < 2; i++) {
        const index = (currentIndex + i) % testimonials.length
        const testimonialElement = testimonials[index].cloneNode(true)
        animateStars(testimonialElement.querySelector(".stars"))
        container.appendChild(testimonialElement)
      }
      currentIndex = (currentIndex + 2) % testimonials.length
    }

    function animateStars(starsElement) {
      starsElement.style.opacity = "0"
      starsElement.style.transform = "scale(0.8)"
      setTimeout(() => {
        starsElement.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
        starsElement.style.opacity = "1"
        starsElement.style.transform = "scale(1)"
      }, 50)
    }

    fetch("data/testimonials.json")
      .then((response) => response.json())
      .then((data) => {
        testimonials = data.map((testimonial) => {
          const testimonioElement = document.createElement("div")
          testimonioElement.classList.add("testimonio")
          const starsHTML =
            '<div class="stars">' + "★".repeat(testimonial.stars) + "☆".repeat(5 - testimonial.stars) + "</div>"
          testimonioElement.innerHTML = `
            ${starsHTML}
            <p>"${testimonial.quote}"</p>
            <p class="cliente">${testimonial.client}</p>
          `
          return testimonioElement
        })
        showTestimonials()
        setInterval(showTestimonials, 5000)
      })
      .catch((error) => console.error("Error loading testimonials:", error))
  }

  createTestimonialsSlideshow()

  // Form
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Send form data to server
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.")
    contactForm.reset()
  })
})

