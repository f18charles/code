import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required().error("Alt text is required for the hero image."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Call to Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Button Label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "href", title: "Link Target", type: "string", validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Call to Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Button Label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "href", title: "Link Target", type: "string", validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionSummary",
      title: "Mission Summary Statement",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights (3-4 Cards)",
      type: "array",
      validation: (Rule) => Rule.min(3).max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              options: {
                list: [
                  { title: "Home", value: "Home" },
                  { title: "Kitchen / Utensils", value: "Utensils" },
                  { title: "Care / Heart Handshake", value: "HeartHandshake" },
                  { title: "Wellbeing / Sparkles", value: "Sparkles" },
                  { title: "Shield / Protection", value: "Shield" },
                  { title: "Community / Users", value: "Users" },
                ],
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featuredAlbum",
      title: "Featured Album Strip",
      type: "reference",
      to: [{ type: "album" }],
    }),
    defineField({
      name: "seo",
      title: "Page SEO",
      type: "seo",
    }),
  ],
});
