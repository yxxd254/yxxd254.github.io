document.addEventListener("DOMContentLoaded", () => {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  if (!revealElements.length) {
    return;
  }

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
