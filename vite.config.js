import { defineConfig } from 'vite';

// Relative asset paths, so the built site works both at the root of a domain and in a
// sub-folder such as https://<user>.github.io/<repository>/ on GitHub Pages.
export default defineConfig({
  base: './',
});
