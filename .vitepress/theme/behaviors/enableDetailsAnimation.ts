type BoxSpacing = {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

type DetailsMetrics = {
  height: number;
  spacing: BoxSpacing;
};

type AnimationState = {
  onEnd: (event: TransitionEvent) => void;
  rafId: number | null;
  shouldCloseOnFinish: boolean;
};

const animationStates = new WeakMap<
  HTMLDetailsElement,
  AnimationState
>();

function readBoxSpacing(element: HTMLElement): BoxSpacing {
  const style = window.getComputedStyle(element);

  return {
    paddingTop: parseFloat(style.paddingTop) || 0,
    paddingRight: parseFloat(style.paddingRight) || 0,
    paddingBottom: parseFloat(style.paddingBottom) || 0,
    paddingLeft: parseFloat(style.paddingLeft) || 0,
  };
}

function applyBoxSpacing(
  element: HTMLElement,
  spacing: BoxSpacing,
) {
  element.style.paddingTop = `${spacing.paddingTop}px`;
  element.style.paddingRight = `${spacing.paddingRight}px`;
  element.style.paddingBottom = `${spacing.paddingBottom}px`;
  element.style.paddingLeft = `${spacing.paddingLeft}px`;
}

function readCurrentMetrics(
  details: HTMLDetailsElement,
): DetailsMetrics {
  const style = window.getComputedStyle(details);

  return {
    height:
      parseFloat(style.height) || details.offsetHeight,
    spacing: {
      paddingTop: parseFloat(style.paddingTop) || 0,
      paddingRight: parseFloat(style.paddingRight) || 0,
      paddingBottom: parseFloat(style.paddingBottom) || 0,
      paddingLeft: parseFloat(style.paddingLeft) || 0,
    },
  };
}

function clearAnimatedStyles(element: HTMLElement) {
  element.style.height = "";
  element.style.paddingTop = "";
  element.style.paddingRight = "";
  element.style.paddingBottom = "";
  element.style.paddingLeft = "";
}

function alignViewportToDetailsStart(details: HTMLDetailsElement) {
  const summary = details.querySelector<HTMLElement>(":scope > summary");

  if (!summary) {
    return;
  }

  const detailsRect = details.getBoundingClientRect();
  const summaryRect = summary.getBoundingClientRect();

  if (detailsRect.top >= summaryRect.top - 1) {
    return;
  }

  const targetScrollY =
    window.scrollY + detailsRect.top - summaryRect.top;
  const clampedTargetScrollY = Math.max(0, targetScrollY);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: clampedTargetScrollY,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

function clearAnimationState(details: HTMLDetailsElement) {
  const animationState = animationStates.get(details);

  if (animationState) {
    if (animationState.rafId !== null) {
      cancelAnimationFrame(animationState.rafId);
    }

    details.removeEventListener(
      "transitionend",
      animationState.onEnd,
    );
    animationStates.delete(details);
  }

  delete details.dataset.isAnimating;
  delete details.dataset.animationDirection;
}

function finishAnimation(
  details: HTMLDetailsElement,
  shouldClose: boolean,
) {
  clearAnimationState(details);
  details.classList.remove("animating");

  if (shouldClose) {
    details.open = false;
  }

  clearAnimatedStyles(details);
}

function interruptAnimation(
  details: HTMLDetailsElement,
): AnimationState | null {
  const animationState = animationStates.get(details);

  if (!animationState) {
    return null;
  }

  const currentMetrics = readCurrentMetrics(details);

  clearAnimationState(details);
  details.classList.remove("animating");
  details.style.height = `${currentMetrics.height}px`;
  applyBoxSpacing(details, currentMetrics.spacing);

  return animationState;
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
  details.dataset.animationDirection = shouldCloseOnFinish
    ? "collapse"
    : "expand";
  details.classList.add("animating");
  details.style.height = `${fromHeight}px`;
  applyBoxSpacing(details, fromSpacing);

  void details.offsetHeight;

  const onEnd = (event: TransitionEvent) => {
    if (
      event.target !== details ||
      event.propertyName !== "height"
    ) {
      return;
    }

    finishAnimation(details, shouldCloseOnFinish);
  };

  const rafId = requestAnimationFrame(() => {
    details.style.height = `${toHeight}px`;
    applyBoxSpacing(details, toSpacing);
  });

  animationStates.set(details, {
    onEnd,
    rafId,
    shouldCloseOnFinish,
  });
  details.addEventListener("transitionend", onEnd);
}

function expandDetails(
  details: HTMLDetailsElement,
  startMetrics?: DetailsMetrics,
) {
  const collapsedSpacing =
    startMetrics?.spacing ?? readBoxSpacing(details);
  const collapsedHeight =
    startMetrics?.height ?? details.offsetHeight;

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

function collapseDetails(
  details: HTMLDetailsElement,
  startMetrics?: DetailsMetrics,
) {
  alignViewportToDetailsStart(details);

  const expandedSpacing =
    startMetrics?.spacing ?? readBoxSpacing(details);
  const expandedHeight =
    startMetrics?.height ?? details.offsetHeight;

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

    const details =
      summary.parentElement as HTMLDetailsElement;

    if (
      !details ||
      !details.classList.contains("custom-block") ||
      !details.classList.contains("details")
    ) {
      return;
    }

    e.preventDefault();

    if (details.dataset.isAnimating === "true") {
      const currentMetrics = readCurrentMetrics(details);
      const animationState = interruptAnimation(details);

      if (!animationState) {
        return;
      }

      if (animationState.shouldCloseOnFinish) {
        expandDetails(details, currentMetrics);
      } else {
        collapseDetails(details, currentMetrics);
      }

      return;
    }

    if (details.open) {
      collapseDetails(details);
      return;
    }

    expandDetails(details);
  });
}
