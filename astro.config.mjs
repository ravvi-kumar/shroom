// @ts-check
import clerk from "@clerk/astro";
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    integrations:[clerk(), react()],
    adapter: vercel(),
    output: "server",
});