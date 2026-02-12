document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const maintenanceParam = params.get("maintenance");
  const maintenanceKey = "maintenanceMode";

  if (maintenanceParam === "on") {
    localStorage.setItem(maintenanceKey, "true");
  } else if (maintenanceParam === "off") {
    localStorage.setItem(maintenanceKey, "false");
  }

  const isMaintenance = localStorage.getItem(maintenanceKey) === "true";
  if (isMaintenance) {
    document.body.classList.add("maintenance");
    const banner = document.createElement("div");
    banner.className = "maintenance-banner";
    banner.setAttribute("role", "status");
    banner.innerHTML = `
      <div class="container maintenance-content">
        <span class="maintenance-pill">Maintenance</span>
        <p class="maintenance-text">Seele is inactive from the internet for now.</p>
      </div>
    `;
    const header = document.querySelector("header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(banner, header.nextSibling);
    } else {
      document.body.prepend(banner);
    }
  }

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  if (revealElements.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              activeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      revealElements.forEach((element) => observer.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }
  }

  const timeNode = document.getElementById("local-time");
  if (timeNode) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updateTime = () => {
      timeNode.textContent = formatter.format(new Date());
    };

    updateTime();
    setInterval(updateTime, 1000);
  }
});
