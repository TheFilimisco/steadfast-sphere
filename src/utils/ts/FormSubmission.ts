const form = document.getElementById("contact-form") as HTMLFormElement;
const statusElement = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (statusElement) statusElement.innerHTML = "Sending...";

        try {
            const response = await fetch(
                "https://formspree.io/f/xqalkavk",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (response.ok) {
                if (statusElement)
                    statusElement.innerHTML = "Thanks for your submission!";
                form.reset();
            } else {
                const resData = await response.json();
                if (Object.hasOwn(resData, "errors")) {
                    if (statusElement)
                        statusElement.innerHTML = resData["errors"]
                            .map((error: any) => error["message"])
                            .join(", ");
                } else {
                    if (statusElement)
                        statusElement.innerHTML =
                            "Oops! There was a problem submitting your form";
                }
            }
        } catch (error) {
            if (statusElement)
                statusElement.innerHTML =
                    "Oops! There was a problem submitting your form";
        }
    });
}