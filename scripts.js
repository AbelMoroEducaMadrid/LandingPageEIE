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

  // Testimonials
  const testimonials = [
    {
      quote:
        "Medida ha transformado completamente nuestra gestión de inventario. Ahora tenemos un control total y hemos reducido los costos significativamente.",
      client: "María Rodríguez, Gerente de Operaciones en TechSolutions",
    },
    {
      quote:
        "La optimización de rutas de Medida nos ha permitido aumentar nuestra eficiencia de entrega en un 30%. ¡Increíble!",
      client: "Carlos Gómez, Director Logístico en LogiExpress",
    },
    {
      quote:
        "Gracias a Medida, hemos automatizado nuestros procesos clave y ahora podemos enfocarnos en el crecimiento de nuestro negocio.",
      client: "Ana Martínez, CEO de InnovaTech",
    },
  ]

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

  // Form submission
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.")
    contactForm.reset()
  })
})

