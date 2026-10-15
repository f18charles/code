import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
      description: "Appears in browser tabs and search engine results (recommended: 50-60 characters)",
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Brief summary for search engines and social shares (recommended: 120-160 characters)",
    }),
    defineField({
      name: "image",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required().error("Alternative text is required for accessibility"),
        }),
      ],
    }),
  ],
});
