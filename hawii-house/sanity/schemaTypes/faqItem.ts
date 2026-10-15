import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Getting Help", value: "Getting Help" },
          { title: "Volunteering & Community", value: "Volunteering & Community" },
          { title: "About Our Services", value: "About Our Services" },
          { title: "Donations & Support", value: "Donations & Support" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order (lowest first)",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});
