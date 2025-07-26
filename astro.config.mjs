// @ts-check
import clerk from "@clerk/astro";
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
    integrations:[clerk(), react(), db()],
    adapter: vercel(),
    output: "server",
    server:{
        allowedHosts:["buck-refined-garfish.ngrok-free.app"]
    }
});