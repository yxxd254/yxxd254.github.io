/* ═══════════════════════════════════════════
   Seele / yx — Resonator
   Shell behaviour: clock, bar state, reveals, maintenance
   ═══════════════════════════════════════════ */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── local time (GMT+8) ─────────────────── */
  const clockFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const clocks = Array.from(document.querySelectorAll("[data-clock]"));
  const dates = Array.from(document.querySelectorAll("[data-date]"));
  let clockTimer = null;

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const writeDate = () => {
    const parts = dateFormatter.formatToParts(new Date());
    const get = (type) => {
      const part = parts.find((item) => item.type === type);
      return part ? part.value : "";
    };
    const value =
      get("day") + "-" + get("month") + "-" + get("year") + " · " + get("weekday").toUpperCase();
    dates.forEach((node) => {
      node.textContent = value;
    });
  };

  const writeClock = () => {
    const value = clockFormatter.format(new Date());
    clocks.forEach((node) => {
      node.textContent = value;
    });
    if (dates.length) {
      writeDate();
    }
  };

  const startClock = () => {
    writeClock();
    if (!clockTimer) {
      clockTimer = window.setInterval(writeClock, 1000);
    }
  };

  const stopClock = () => {
    if (clockTimer) {
      window.clearInterval(clockTimer);
      clockTimer = null;
    }
  };

  if (clocks.length) {
    startClock();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopClock();
      } else {
        startClock();
      }
    });
  } else if (dates.length) {
    writeDate();
  }

  /* ── bar state on scroll ────────────────── */
  const setBarState = () => {
    document.body.classList.toggle("scrolled", window.scrollY > 24);
  };

  setBarState();
  window.addEventListener("scroll", setBarState, { passive: true });

  /* ── reveal on scroll ───────────────────── */
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-in"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      revealItems.forEach((item) => {
        item.classList.add("reveal-ready");
        observer.observe(item);
      });
    }
  }

  /* ── ?inactive maintenance strip ────────── */
  if (new URLSearchParams(window.location.search).has("inactive")) {
    const banner = document.createElement("div");
    banner.className = "maintenance";
    banner.setAttribute("role", "status");
    banner.innerHTML =
      '<div class="frame maintenance-inner">' +
      '<span class="tag tag-gold">Maintenance</span>' +
      "<p>Seele is inactive from the internet for now.</p>" +
      "</div>";

    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add("has-maintenance");

    const measure = () => {
      document.documentElement.style.setProperty(
        "--maint-h",
        banner.offsetHeight + "px"
      );
    };

    window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
  }
})();
