
(() => {
  "use strict";

  const client = window.supabaseClient;
  const pageKey = document.body.dataset.brandingPage;

  const validPages = [
    "home",
    "about",
    "programs",
    "faculty",
    "news",
    "events",
    "contact"
  ];

  if (!validPages.includes(pageKey)) {
    console.error("Missing or invalid data-branding-page attribute.");
    return;
  }

  if (!client) {
    console.error("Supabase is not initialized. Check js/config.js.");
    return;
  }

  function safeUrl(value) {
    if (!value) return "";

    try {
      const url = new URL(value, window.location.href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  async function loadPageBranding() {
    try {
      const { data, error } = await client
        .from("site_branding")
        .select("logo_url,banner_url")
        .eq("page_key", pageKey)
        .maybeSingle();

      if (error) throw error;
      if (!data) return;

      const logoUrl = safeUrl(data.logo_url);

      if (logoUrl) {
        document.querySelectorAll(
          "#siteLogo, #footerSiteLogo, #navLogoImage, #footerLogoImage"
        ).forEach(img => {
          if (img instanceof HTMLImageElement) {
            img.src = logoUrl;
          }
        });
      }

      const bannerUrl = safeUrl(data.banner_url);

      if (bannerUrl) {
        // Image element used by some page layouts.
        document.querySelectorAll(
          "#siteBannerImage, #pageBannerImage"
        ).forEach(img => {
          if (img instanceof HTMLImageElement) {
            img.src = bannerUrl;
            img.hidden = false;
          }
        });

        // Background banner used by News, Events, or other hero sections.
        const hero = document.querySelector(
          "#pageHero, #newsHero, #eventsHero, .inner-hero"
        );

        if (hero) {
          hero.style.backgroundImage =
            `url("${bannerUrl.replace(/["\\]/g, "")}")`;
          hero.style.backgroundSize = "cover";
          hero.style.backgroundPosition = "center";
          hero.style.backgroundRepeat = "no-repeat";
        }

        // Optional banner wrapper used by the Events page.
        const bannerWrap = document.getElementById("siteBannerWrap");

        if (bannerWrap) {
          bannerWrap.hidden = false;
        }
      }
    } catch (error) {
      console.error(
        `Could not load branding for ${pageKey}:`,
        error
      );
    }
  }

  loadPageBranding();
})();