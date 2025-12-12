const API_URL =
  "https://itunes.apple.com/lookup?id=1778270363&entity=software";

async function loadApps() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!data.results || data.results.length === 0) return;

        // All apps (first item is the main app, rest may be additional apps)
        const apps = data.results.filter(item => item.kind === "software");

        const container = document.getElementById("apps-container");

        apps.forEach(app => {
            const card = document.createElement("div");
            card.className = "app-card";

            card.innerHTML = `
                <img src="${app.artworkUrl512}" class="app-icon" alt="${app.trackName}" />
                <div class="app-name">${app.trackName}</div>
                <div class="app-description">${app.description.split(".")[0]}.</div>

                <div class="screenshots">
                    ${app.screenshotUrls
                        .slice(0, 3)
                        .map(url => `<img src="${url}" />`)
                        .join("")}
                </div>

                <a class="app-store-btn" href="${app.trackViewUrl}" target="_blank">
                    View on the App Store
                </a>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading apps:", err);
    }
}

loadApps();
