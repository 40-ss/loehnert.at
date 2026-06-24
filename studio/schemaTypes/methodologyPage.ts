import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'methodologyPage',
  title: 'Methodik',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Methodik',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Akkordeon-Einträge',
      description: 'Die einzelnen aufklappbaren Abschnitte auf der Methodik-Seite.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'accordionItem',
          title: 'Eintrag',
          fields: [
            defineField({
              name: 'heading',
              title: 'Frage / Überschrift',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Antwort / Inhalt',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'heading'},
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
