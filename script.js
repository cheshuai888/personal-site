document.documentElement.classList.add("has-js");

const progress = document.querySelector(".page-progress");
const cursor = document.querySelector(".cursor-dot");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const form = document.querySelector("#contactForm");

const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.transform = `scaleX(${ratio})`;
};

const updateParallax = () => {
  const viewport = window.innerHeight;

  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const visible = rect.top < viewport && rect.bottom > 0;

    if (!visible) return;

    const offset = (rect.top - viewport / 2) * -0.045;
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  updateProgress();
  updateParallax();
});

window.addEventListener("resize", () => {
  updateProgress();
  updateParallax();
});

window.addEventListener("mousemove", (event) => {
  if (!cursor) return;

  cursor.style.opacity = "1";
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, input, textarea").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(2.6)";
  });

  element.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const status = form.querySelector(".form-status");
  const name = new FormData(form).get("name") || "你";

  if (status) {
    status.textContent = `${name}，消息已记录在演示表单里。上线前可接入邮件或表单服务。`;
  }

  form.reset();
});

updateProgress();
updateParallax();
