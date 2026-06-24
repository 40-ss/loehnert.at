import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bookPage',
  title: 'Notizen',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Notizen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
