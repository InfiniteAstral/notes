type BoxSpacing = {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

function readBoxSpacing(element: HTMLElement): BoxSpacing {
  const style = window.getComputedStyle(element);

  return {
    paddingTop: parseFloat(style.paddingTop) || 0,
    paddingRight: parseFloat(style.paddingRight) || 0,
    paddingBottom: parseFloat(style.paddingBottom) || 0,
    paddingLeft: parseFloat(style.paddingLeft) || 0,
  };
}

function applyBoxSpacing(element: HTMLElement, spacing: BoxSpacing) {
  element.style.paddingTop = `${spacing.paddingTop}px`;
  element.style.paddingRight = `${spacing.paddingRight}px`;
  element.style.paddingBottom = `${spacing.paddingBottom}px`;
  element.style.paddingLeft = `${spacing.paddingLeft}px`;
}

function clearAnimatedStyles(element: HTMLElement) {
  element.style.height = "";
  element.style.paddingTop = "";
  element.style.paddingRight = "";
  element.style.paddingBottom = "";
  element.style.paddingLeft = "";
}

function finishAnimation(details: HTMLDetailsElement, shouldClose: boolean) {
  details.classList.remove("animating");

  if (shouldClose) {
    details.open = false;
  }

  clearAnimatedStyles(details);
  delete details.dataset.isAnimating;
}

function animateDetails(
  details: HTMLDetailsElement,
  fromHeight: number,
  toHeight: number,
  fromSpacing: BoxSpacing,
  toSpacing: BoxSpacing,
  shouldCloseOnFinish: boolean,
) {
  details.dataset.isAnimating = "true";
  details.classList.add("animating");
  details.style.height = `${fromHeight}px`;
  applyBoxSpacing(details, fromSpacing);

  void details.offsetHeight;

  requestAnimationFrame(() => {
    details.style.height = `${toHeight}px`;
    applyBoxSpacing(details, toSpacing);
  });

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== details || event.propertyName !== "height") {
      return;
    }

    details.removeEventListener("transitionend", onEnd);
    finishAnimation(details, shouldCloseOnFinish);
  };

  details.addEventListener("transitionend", onEnd);
}

function expandDetails(details: HTMLDetailsElement) {
  const collapsedSpacing = readBoxSpacing(details);
  const collapsedHeight = details.offsetHeight;

  details.style.height = `${collapsedHeight}px`;
  applyBoxSpacing(details, collapsedSpacing);
  details.open = true;

  clearAnimatedStyles(details);

  const expandedSpacing = readBoxSpacing(details);
  const expandedHeight = details.offsetHeight;

  animateDetails(
    details,
    collapsedHeight,
    expandedHeight,
    collapsedSpacing,
    expandedSpacing,
    false,
  );
}

function collapseDetails(details: HTMLDetailsElement) {
  const expandedSpacing = readBoxSpacing(details);
  const expandedHeight = details.offsetHeight;

  details.style.height = `${expandedHeight}px`;
  applyBoxSpacing(details, expandedSpacing);
  details.open = false;

  clearAnimatedStyles(details);

  const collapsedSpacing = readBoxSpacing(details);
  const collapsedHeight = details.offsetHeight;

  details.open = true;

  animateDetails(
    details,
    expandedHeight,
    collapsedHeight,
    expandedSpacing,
    collapsedSpacing,
    true,
  );
}

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

    if (details.open) {
      collapseDetails(details);
      return;
    }

    expandDetails(details);
  });
}
