document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".menu-toggle");

  function closeFillInstant(btn) {
    btn.classList.add("no-fill-transition");
    btn.classList.remove("is-active");
    requestAnimationFrame(() => btn.classList.remove("no-fill-transition"));
  }

  function closePanel(btn) {
    const id = btn.getAttribute("aria-controls");
    const panel = document.getElementById(id);
    if (!panel) return;

    btn.setAttribute("aria-expanded", "false");
    closeFillInstant(btn);          
    panel.classList.remove("is-open"); 
  }

  function openPanel(btn) {
    const id = btn.getAttribute("aria-controls");
    const panel = document.getElementById(id);
    if (!panel) return;

    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("is-active");  
    panel.classList.add("is-open"); 
  }

  function closeAll(exceptBtn = null) {
    toggles.forEach((btn) => {
      if (exceptBtn && btn === exceptBtn) return;
      closePanel(btn);
    });
  }

  // 초기 상태 닫기
  toggles.forEach((btn) => {
    const id = btn.getAttribute("aria-controls");
    const panel = document.getElementById(id);

    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-active", "no-fill-transition");
    if (panel) panel.classList.remove("is-open");
  });

  // 클릭(아코디언)
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closePanel(btn);
        return;
      }
      closeAll(btn);
      openPanel(btn);
    });
  });
});
