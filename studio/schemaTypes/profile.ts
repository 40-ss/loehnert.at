import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profil',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Vollständiger Name inkl. Titel, z.B. "DI Gebhard Löhnert"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Berufsbezeichnung',
      type: 'string',
      description: 'z.B. "Psychosozialer Berater i.A.u.S."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Portraitfoto',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativtext',
          type: 'string',
          description: 'Beschreibung des Bildes für Screenreader und SEO',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'headshot'},
  },
})
