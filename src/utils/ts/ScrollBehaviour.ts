const sections = document.querySelectorAll(
  ".section",
) as NodeListOf<HTMLElement>;
const dots = document.querySelectorAll(
  ".nav-dot",
) as NodeListOf<HTMLElement>;

// State
let currentStep = 0;
const totalSections = sections.length;
let isAnimating = false;

function updateView() {
  // Update Sections
  sections.forEach((section, index) => {
    if (index < currentStep) {
      section.style.opacity = "0";
      section.style.pointerEvents = "none";
    } else {
      section.style.opacity = "1";
      section.style.pointerEvents = "auto";
    }
  });

  // Update Dots
  dots.forEach((dot, index) => {
    if (index === currentStep) {
      dot.style.backgroundColor = "white";
      dot.style.opacity = "1";
      dot.style.transform = "scale(1.2)";
    } else {
      dot.style.backgroundColor = "#ddd";
      dot.style.opacity = "0.5";
      dot.style.transform = "scale(1)";
    }
  });

  // Trigger Animations for Active Section
  sections.forEach((section, index) => {
    // Select all potential animated elements
    const animatedElements = section.querySelectorAll(
      ".animate-slide-in-fall, .animate-slide-in-left, .animate-slide-in-right, .animate-fade-extend, [data-animation]",
    );

    if (index === currentStep) {
      // First, ensure they are hidden/reset immediately
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        // Check if we already stored the animation class
        let animationClass = element.dataset.animation;

        if (!animationClass) {
          // If not stored, find which class it has and store it
          if (element.classList.contains("animate-slide-in-fall")) {
            animationClass = "animate-slide-in-fall";
          } else if (element.classList.contains("animate-slide-in-left")) {
            animationClass = "animate-slide-in-left";
          } else if (element.classList.contains("animate-slide-in-right")) {
            animationClass = "animate-slide-in-right";
          } else if (element.classList.contains("animate-fade-extend")) {
            animationClass = "animate-fade-extend";
          }
          if (animationClass) {
            element.dataset.animation = animationClass;
          }
        }

        // Remove the class to reset/hide
        if (animationClass) {
          element.classList.remove(animationClass);
        }
        element.style.opacity = "0"; // Ensure invisible
      });

      // After 1 second (transition time), add classes back
      setTimeout(() => {
        animatedElements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.opacity = ""; // Allow animation to control opacity
          const animationClass = element.dataset.animation;
          if (animationClass) {
            void element.offsetWidth; // Force reflow
            element.classList.add(animationClass);
          }
        });
      }, 300); // 300ms delay matches section transition
    } else {
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        // Ensure we capture class before checking out
        let animationClass = element.dataset.animation;
        if (!animationClass) {
          if (element.classList.contains("animate-slide-in-fall"))
            animationClass = "animate-slide-in-fall";
          else if (element.classList.contains("animate-slide-in-left"))
            animationClass = "animate-slide-in-left";
          else if (element.classList.contains("animate-slide-in-right"))
            animationClass = "animate-slide-in-right";
          else if (element.classList.contains("animate-fade-extend"))
            animationClass = "animate-fade-extend";

          if (animationClass) element.dataset.animation = animationClass;
        }

        if (animationClass) element.classList.remove(animationClass);
        element.style.opacity = "0";
      });
    }
  });
}

// Initialize
updateView();

function handleScroll(direction: string) {
  if (isAnimating) return;

  if (direction === "down") {
    if (currentStep < totalSections - 1) {
      isAnimating = true;
      currentStep++;
      updateView();
      setTimeout(() => (isAnimating = false), 1000);
    }
  } else if (direction === "up") {
    if (currentStep > 0) {
      isAnimating = true;
      currentStep--;
      updateView();
      setTimeout(() => (isAnimating = false), 1000);
    }
  }
}

// Wheel Event
window.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) < 10) return;
    const direction = e.deltaY > 0 ? "down" : "up";
    handleScroll(direction);
  },
  { passive: true },
);

// Keyboard Event
window.addEventListener("keydown", (e) => {
  if (["ArrowDown", "PageDown", " "].includes(e.key)) {
    handleScroll("down");
  } else if (["ArrowUp", "PageUp"].includes(e.key)) {
    handleScroll("up");
  }
});

// Dot Click Handlers
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    if (isAnimating) return;
    const target = parseInt(dot.getAttribute("data-target") || "0");
    if (target !== currentStep) {
      isAnimating = true;
      currentStep = target;
      updateView();
      setTimeout(() => (isAnimating = false), 1000);
    }
  });
});
