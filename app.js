document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
    });
  });


  const carousel = document.querySelector(".carousel");
  let scrollPosition = 0;

  function moveCarousel(direction) {
    const cardWidth = 270;
    const totalCards = carousel.children.length;
    const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
    const maxScroll = (totalCards - visibleCards) * cardWidth;

    scrollPosition += direction * cardWidth;
    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;

    carousel.style.transform = `translateX(-${scrollPosition}px)`;
  }

  const buyButtons = document.querySelectorAll(".buy-btn");
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  let cart = [];

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      cart.push({ name, price });
      renderCart();
    });
  });

  function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button class="delete-btn" data-index="${index}">X</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = e.target.dataset.index;
        cart.splice(i, 1);
        renderCart();
      });
    });
  }

  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Gracias por contactarnos! Te responderemos pronto ☕");
    e.target.reset();
  });

  document.getElementById("logo").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
