import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yourdomain.com", // Essential for sitemap & SEO
  integrations: [
    react(),
    sitemap(), // Enables automatic sitemap generation
  ],
  vite: {
    define: {
      // Expose only safe environment variables
      "import.meta.env.PUBLIC_API_BASE": JSON.stringify(
        process.env.PUBLIC_API_BASE
      ),
      // Add these EmailJS environment variables
      "import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY": JSON.stringify(
        process.env.PUBLIC_EMAILJS_PUBLIC_KEY
      ),
      "import.meta.env.PUBLIC_EMAILJS_SERVICE_ID": JSON.stringify(
        process.env.PUBLIC_EMAILJS_SERVICE_ID
      ),
      "import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID": JSON.stringify(
        process.env.PUBLIC_EMAILJS_TEMPLATE_ID
      ),
    },
    server: {
      fs: {
        strict: true, // Prevents file system access outside root
      },
    },
  },
});
