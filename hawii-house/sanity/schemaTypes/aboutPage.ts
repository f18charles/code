import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introductory Paragraph",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Story / Detailed Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values",
      title: "Organizational Values",
      type: "array",
      validation: (Rule) => Rule.required().min(2),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Value Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Value Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Full Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", title: "Role / Position", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "photo",
              title: "Portrait Photo (1:1 recommended)",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  validation: (Rule) => Rule.required().error("Alt text is required for team portraits."),
                }),
              ],
            }),
            defineField({ name: "bio", title: "Short Bio", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Page SEO",
      type: "seo",
    }),
  ],
});
