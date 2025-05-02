// DOM Elements
const menuToggle = document.querySelector(".menu-toggle")
const nav = document.querySelector("nav")
const heroSlides = document.querySelectorAll(".hero-slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.querySelector(".prev-slide")
const nextBtn = document.querySelector(".next-slide")
const brandNavBtns = document.querySelectorAll(".brand-nav-btn")
const brandContents = document.querySelectorAll(".brand-content")
const previewBtns = document.querySelectorAll(".preview-btn")
const previewModal = document.getElementById("preview-modal")
const closeModal = document.querySelector(".close-modal")
const modalBody = document.querySelector(".modal-body")

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    nav.classList.toggle("active")

    // Prevent scrolling when menu is open
    if (nav.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  })
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (nav && nav.classList.contains("active") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("active")
    menuToggle.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Hero Slider
let currentSlide = 0
let slideInterval

// Initialize hero slider
function initHeroSlider() {
  if (heroSlides.length === 0) return

  // Show first slide
  showSlide(currentSlide)

  // Start auto slide
  startSlideInterval()

  // Event listeners
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1))
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1))

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = Number.parseInt(dot.dataset.index)
      showSlide(currentSlide)
      resetSlideInterval()
    })
  })
}

function showSlide(index) {
  heroSlides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  heroSlides[index].classList.add("active")
  dots[index].classList.add("active")
}

function changeSlide(direction) {
  currentSlide += direction

  if (currentSlide < 0) {
    currentSlide = heroSlides.length - 1
  } else if (currentSlide >= heroSlides.length) {
    currentSlide = 0
  }

  showSlide(currentSlide)
  resetSlideInterval()
}

function startSlideInterval() {
  slideInterval = setInterval(() => {
    changeSlide(1)
  }, 5000)
}

function resetSlideInterval() {
  clearInterval(slideInterval)
  startSlideInterval()
}

// Brand Navigation
function initBrandNav() {
  brandNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const brandId = btn.dataset.brand

      // Update active button
      brandNavBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Show corresponding content
      brandContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === `${brandId}-content`) {
          content.classList.add("active")
        }
      })
    })
  })
}

// Brand Preview Modal
function initPreviewModal() {
  // Open modal
  previewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const brandId = btn.dataset.brand

      // Load content based on brand
      loadModalContent(brandId)

      // Show modal
      previewModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", closePreviewModal)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === previewModal) {
      closePreviewModal()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && previewModal.style.display === "block") {
      closePreviewModal()
    }
  })
}

function closePreviewModal() {
  previewModal.style.display = "none"
  document.body.style.overflow = ""
}

// function loadModalContent(brandId) {
//   // Sample content for each brand
//   const brandContent = {
//     astral: {
//       title: "Astral Pipes Products",
//       description:
//         "Astral Pipes offers a comprehensive range of piping solutions for plumbing, drainage, agriculture, and industrial applications.",
//       products: [
//         { name: "CPVC Plumbing System", image: "/placeholder.svg?height=200&width=300&text=CPVC Pipes" },
//         { name: "UPVC Plumbing System", image: "/placeholder.svg?height=200&width=300&text=UPVC Pipes" },
//         { name: "SWR Drainage System", image: "/placeholder.svg?height=200&width=300&text=SWR Pipes" },
//         { name: "Agriculture Pipes", image: "/placeholder.svg?height=200&width=300&text=Agri Pipes" },
//       ],
//     },
//     supreme: {
//       title: "Supreme Pipes Products",
//       description:
//         "Supreme Industries offers a wide range of plastic piping systems for various applications including water management, industrial and agricultural use.",
//       products: [
//         { name: "PVC Pipes", image: "/placeholder.svg?height=200&width=300&text=PVC Pipes" },
//         { name: "HDPE Pipes", image: "/placeholder.svg?height=200&width=300&text=HDPE Pipes" },
//         { name: "PPR Pipes", image: "/placeholder.svg?height=200&width=300&text=PPR Pipes" },
//         { name: "CPVC Pipes", image: "/placeholder.svg?height=200&width=300&text=CPVC Pipes" },
//       ],
//     },
//     // Add content for other brands similarly
//     finolex: {
//       title: "Finolex Pipes Products",
//       description:
//         "Finolex is one of India's largest manufacturers of PVC pipes and fittings, known for their durability and reliability.",
//       products: [
//         { name: "PVC Pipes", image: "/placeholder.svg?height=200&width=300&text=PVC Pipes" },
//         { name: "UPVC Pipes", image: "/placeholder.svg?height=200&width=300&text=UPVC Pipes" },
//         { name: "CPVC Pipes", image: "/placeholder.svg?height=200&width=300&text=CPVC Pipes" },
//         { name: "SWR Pipes", image: "/placeholder.svg?height=200&width=300&text=SWR Pipes" },
//       ],
//     },
//   }

//   // Default content if brand not found
//   const defaultContent = {
//     title: "Product Catalog",
//     description: "Browse our extensive range of high-quality piping solutions.",
//     products: [
//       { name: "PVC Pipes", image: "/placeholder.svg?height=200&width=300&text=PVC Pipes" },
//       { name: "CPVC Pipes", image: "/placeholder.svg?height=200&width=300&text=CPVC Pipes" },
//     ],
//   }

//   // Get content for selected brand or use default
//   const content = brandContent[brandId] || defaultContent

//   // Build HTML for modal
//   let html = `
//         <h2>${content.title}</h2>
//         <p class="modal-description">${content.description}</p>
//         <div class="product-grid">
//     `

//   // Add products
//   content.products.forEach((product) => {
//     html += `
//             <div class="product-card">
//                 <div class="product-image">
//                     <img src="${product.image}" alt="${product.name}">
//                 </div>
//                 <div class="product-info">
//                     <h3>${product.name}</h3>
//                     <a href="#" class="btn">View Details</a>
//                 </div>
//             </div>
//         `
//   })

//   html += `</div>`

//   // Add styles for modal content
//   html += `
//         <style>
//             .modal-description {
//                 margin-bottom: 30px;
//                 color: var(--gray);
//                 line-height: 1.7;
//             }
            
//             .product-grid {
//                 display: grid;
//                 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//                 gap: 20px;
//             }
            
//             .product-card {
//                 background-color: var(--light);
//                 border-radius: var(--radius);
//                 overflow: hidden;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//                 transition: var(--transition);
//             }
            
//             .product-card:hover {
//                 transform: translateY(-5px);
//                 box-shadow: var(--shadow);
//             }
            
//             .product-image {
//                 position: relative;
//                 width: 100%;
//                 height: 0;
//                 padding-bottom: 66.67%; /* 3:2 aspect ratio */
//                 overflow: hidden;
//             }
            
//             .product-image img {
//                 position: absolute;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 object-fit: cover;
//                 transition: transform 0.3s ease;
//             }
            
//             .product-card:hover .product-image img {
//                 transform: scale(1.05);
//             }
            
//             .product-info {
//                 padding: 15px;
//             }
            
//             .product-info h3 {
//                 font-size: 1.2rem;
//                 margin-bottom: 15px;
//                 color: var(--secondary);
//             }
            
//             .product-info .btn {
//                 width: 100%;
//                 padding: 8px 15px;
//                 font-size: 0.9rem;
//             }
            
//             @media (max-width: 576px) {
//                 .product-grid {
//                     grid-template-columns: 1fr;
//                 }
//             }
//         </style>
//     `

//   // Insert content into modal
//   modalBody.innerHTML = html
// }

// Clone brands for continuous carousel
function setupBrandsCarousel() {
  const brandsTrack = document.querySelector(".brands-track")
  if (!brandsTrack) return

  const brandLogos = document.querySelectorAll(".brand-logo")

  // Clone brand logos to ensure continuous scrolling
  brandLogos.forEach((logo) => {
    const clone = logo.cloneNode(true)
    brandsTrack.appendChild(clone)
  })

  // Add a second set of clones for smoother infinite scroll
  brandLogos.forEach((logo) => {
    const clone = logo.cloneNode(true)
    brandsTrack.appendChild(clone)
  })

  // Pause animation on hover
  brandsTrack.addEventListener("mouseenter", () => {
    brandsTrack.style.animationPlayState = "paused"
  })

  brandsTrack.addEventListener("mouseleave", () => {
    brandsTrack.style.animationPlayState = "running"
  })
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's a modal trigger or just "#"
      if (this.classList.contains("preview-btn") || href === "#") return

      e.preventDefault()

      const targetId = href
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (nav && nav.classList.contains("active")) {
          nav.classList.remove("active")
          menuToggle.classList.remove("active")
          document.body.style.overflow = ""
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
}

// Newsletter form submission
function setupNewsletterForm() {
  const form = document.querySelector(".newsletter-form")
  if (!form) return

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const emailInput = this.querySelector('input[type="email"]')
    const email = emailInput.value.trim()

    if (email) {
      // Simulate form submission
      alert("Thank you for subscribing to our newsletter!")
      emailInput.value = ""
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider()
  initBrandNav()
  initPreviewModal()
  setupBrandsCarousel()
  setupSmoothScrolling()
  setupNewsletterForm()
})

// Fix for iOS vh units
function fixVhUnits() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

window.addEventListener("resize", fixVhUnits)
fixVhUnits()


