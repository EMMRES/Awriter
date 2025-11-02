<script>
  // ==============================
  // Sticky header on scroll
  // ==============================
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  });

  // ==============================
  // IntersectionObserver animations
  // ==============================
  (function () {
    const staggerDelay = 80;
    const ioOptions = { root: null, threshold: 0.12 };
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("in-view");
        const children = el.querySelectorAll(".animate, [data-anim]");
        children.forEach((child, i) =>
          setTimeout(() => child.classList.add("in-view"), i * staggerDelay)
        );
        obs.unobserve(el);
      });
    }, ioOptions);

    document.querySelectorAll(".animate-section, .animate, [data-anim]").forEach(node => io.observe(node));
  })();

  // ==============================
  // Focus styles for buttons
  // ==============================
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("focus", () => btn.classList.add("focus"));
    btn.addEventListener("blur", () => btn.classList.remove("focus"));
  });

  // ==============================
  // Mobile menu toggle (hamburger dropdown)
  // ==============================
  (function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    if (!menuToggle || !navList) return;

    // open/close menu
    menuToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // close when clicking a nav link
    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // close dropdown if user clicks outside
    document.addEventListener("click", (e) => {
      if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  })();
</script>
