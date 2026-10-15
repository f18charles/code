import { defineField, defineType } from "sanity";

export const album = defineType({
  name: "album",
  title: "Photo Album",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Album Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Date / Event Period",
      type: "date",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Alt text is required for the cover image."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Album Images",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe what is shown in this photograph.",
              validation: (Rule) =>
                Rule.required().error("Every photo requires alt text."),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Album SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "date",
    },
  },
});
