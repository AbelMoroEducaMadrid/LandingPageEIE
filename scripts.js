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
      const oldTestimonials = container.querySelectorAll(".testimonio")
      oldTestimonials.forEach((testimonial) => {
        testimonial.style.opacity = "0"
        testimonial.style.transform = "translateY(20px)"
      })

      setTimeout(() => {
        container.innerHTML = ""
        for (let i = 0; i < 2; i++) {
          const index = (currentIndex + i) % testimonials.length
          const testimonialElement = testimonials[index].cloneNode(true)
          testimonialElement.style.opacity = "0"
          testimonialElement.style.transform = "translateY(20px)"
          animateStars(testimonialElement.querySelector(".stars"))
          container.appendChild(testimonialElement)

          setTimeout(() => {
            testimonialElement.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"
            testimonialElement.style.opacity = "1"
            testimonialElement.style.transform = "translateY(0)"
          }, 50)
        }
        currentIndex = (currentIndex + 2) % testimonials.length
      }, 500)
    }

    function animateStars(starsElement) {
      const stars = starsElement.textContent.split("")
      starsElement.textContent = ""
      stars.forEach((star, index) => {
        const starSpan = document.createElement("span")
        starSpan.textContent = star
        starSpan.style.opacity = "0"
        starSpan.style.transform = "scale(0.5)"
        starsElement.appendChild(starSpan)

        setTimeout(() => {
          starSpan.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
          starSpan.style.opacity = "1"
          starSpan.style.transform = "scale(1)"
        }, index * 100)
      })
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
        setInterval(showTestimonials, 8000)
      })
      .catch((error) => console.error("Error loading testimonials:", error))
  }

  createTestimonialsSlideshow()

  // Logo and slogan animation
  function animateLogoAndSlogan() {
    const container = document.querySelector(".logo-slogan-container")
    const logo = document.querySelector(".servicios-logo")
    const slogan = document.querySelector(".servicios-slogan")
    const sloganText = "Automatizamos tu presente,\nsimplificando tu futuro."

    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768

    if (!isMobile) {
      logo.style.transform = "translateX(0)"
      slogan.style.opacity = "0"
      slogan.style.transform = "translateX(50px)"

      setTimeout(() => {
        logo.style.transform = "translateX(-25%)"
      }, 500)

      setTimeout(() => {
        slogan.style.opacity = "1"
        slogan.style.transform = "translateX(0)"
      }, 1500)

      setTimeout(() => {
        let i = 0
        const typingInterval = setInterval(() => {
          if (sloganText[i] === "\n") {
            slogan.innerHTML += "<br>"
          } else {
            slogan.innerHTML += sloganText[i]
          }
          i++
          if (i === sloganText.length) {
            clearInterval(typingInterval)
          }
        }, 50)
      }, 2000)
    } else {
      // For mobile, set the logo and slogan to their final positions immediately
      logo.style.transform = "translateX(0)"
      slogan.style.opacity = "1"
      slogan.style.transform = "translateX(0)"
      slogan.innerHTML = sloganText.replace("\n", "<br>")
    }
  }

  animateLogoAndSlogan()

  // Form
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Send form data to server
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.")
    contactForm.reset()
  })

  // Particle effect
  function createParticles() {
    const particlesContainer = document.querySelector(".particles")
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.width = `${Math.random() * 10 + 5}px`
      particle.style.height = particle.style.width
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`
      particle.style.animationDelay = `${Math.random() * 5}s`
      particlesContainer.appendChild(particle)
    }
  }

  createParticles()
})

