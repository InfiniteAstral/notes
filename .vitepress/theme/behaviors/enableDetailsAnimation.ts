export function enableDetailsAnimation() {
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const summary = target.closest("summary");

    if (!summary) return;

    const details = summary.parentElement as HTMLDetailsElement;

    if (
      !details ||
      !details.classList.contains("custom-block") ||
      !details.classList.contains("details")
    ) {
      return;
    }

    if (details.dataset.isAnimating === "true") {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    details.dataset.isAnimating = "true";

    const computedStyle = window.getComputedStyle(details);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;

    const summaryHeight = summary.offsetHeight;

    const collapsedHeight =
      summaryHeight + paddingTop + paddingBottom + borderTop + borderBottom;

    if (details.open) {
      // 收起动画

      const startHeight = details.offsetHeight;
      details.style.height = `${startHeight}px`;

      details.offsetHeight;

      details.classList.add("animating");

      requestAnimationFrame(() => {
        details.style.height = `${collapsedHeight}px`;
      });

      const onEnd = () => {
        details.removeEventListener("transitionend", onEnd);
        details.classList.remove("animating");
        details.open = false;
        details.style.height = "";
        delete details.dataset.isAnimating;
      };
      details.addEventListener("transitionend", onEnd);
    } else {
      // 展开动画

      const startHeight = details.offsetHeight;

      details.style.height = `${startHeight}px`;
      details.open = true;

      details.style.height = "";
      const fullHeight = details.offsetHeight;

      details.style.height = `${startHeight}px`;

      details.offsetHeight;

      details.classList.add("animating");

      requestAnimationFrame(() => {
        details.style.height = `${fullHeight}px`;
      });

      const onEnd = () => {
        details.removeEventListener("transitionend", onEnd);
        details.classList.remove("animating");
        details.style.height = "";
        delete details.dataset.isAnimating;
      };
      details.addEventListener("transitionend", onEnd);
    }
  });
}
