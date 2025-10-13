import { defineCollection, z } from "astro:content";
// z -> zad schema

const projects = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    color: z.string(),
    description: z.string(),
    backend: z.string(),
    web: z.string().optional(),
    img: z.string(),
    frontend: z.string(),
    database: z.string(),
    repository_frontend: z.string(),
    repository_backend: z.string(),
  }),
});

export const collections = { projects };
