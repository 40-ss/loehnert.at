import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'Über (Wer bin ich?)',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Wer bin ich?',
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
