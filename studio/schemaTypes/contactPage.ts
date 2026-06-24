import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
      initialValue: 'Kontakt aufnehmen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Einleitungstext',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Bitte eine gültige E-Mail-Adresse eingeben'),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp-Nummer',
      description:
        'Nur Ziffern, ohne + oder Leerzeichen. Wird für den wa.me-Link verwendet, z.B. "068120877866".',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer (Anzeige)',
      description: 'Im lesbaren Format, z.B. "0681 20 877 866".',
      type: 'string',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Telefonnummer (für tel:-Link)',
      description: 'Internationale Form ohne Leerzeichen, z.B. "+43681208778666".',
      type: 'string',
    }),
    defineField({
      name: 'outro',
      title: 'Abschlusstext',
      description: 'Wird unter den Kontaktwegen angezeigt.',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'email'},
  },
})
