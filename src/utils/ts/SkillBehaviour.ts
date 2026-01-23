function setupSkillBehavior(elementId: string) {
    const skillElement = document.getElementById(elementId);
    if (!skillElement) return;

    const defaultView = skillElement.querySelector(".skill-default") as HTMLElement;
    const activeView = skillElement.querySelector(".skill-active") as HTMLElement;

    if (defaultView && activeView) {
        skillElement.addEventListener("click", () => {
            const isDefaultVisible = !defaultView.classList.contains("hidden");

            if (isDefaultVisible) {
                // Transition from Default to Active
                // 1. Fade out default
                defaultView.classList.add("opacity-0");

                // 2. Wait for fade out, then swap
                setTimeout(() => {
                    defaultView.classList.add("hidden");
                    defaultView.classList.remove("flex");

                    activeView.classList.remove("hidden");
                    activeView.classList.add("flex");
                    // Ensure it starts invisible for fade in
                    activeView.classList.add("opacity-0");

                    // 3. Fade in active (slight delay to ensure DOM render)
                    requestAnimationFrame(() => {
                        activeView.classList.remove("opacity-0");
                    });
                }, 300); // Match Tailwind duration-300
            } else {
                // Transition from Active to Default
                // 1. Fade out active
                activeView.classList.add("opacity-0");

                // 2. Wait for fade out, then swap
                setTimeout(() => {
                    activeView.classList.add("hidden");
                    activeView.classList.remove("flex");

                    defaultView.classList.remove("hidden");
                    defaultView.classList.add("flex");
                    // Ensure it starts invisible
                    defaultView.classList.add("opacity-0");

                    // 3. Fade in default
                    requestAnimationFrame(() => {
                        defaultView.classList.remove("opacity-0");
                    });
                }, 300);
            }
        });
    }
}

setupSkillBehavior("frontend-skill");
setupSkillBehavior("backend-skill");
setupSkillBehavior("softskill-skill");
