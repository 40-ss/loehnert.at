import type {StructureResolver} from 'sanity/structure'

/**
 * Custom Studio structure that renders the four content types as singletons —
 * one document per type, opened directly instead of via a list of documents.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Profil (Startseite)')
        .id('profile')
        .child(S.document().schemaType('profile').documentId('profile')),
      S.listItem()
        .title('Über (Wer bin ich?)')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Methodik')
        .id('methodologyPage')
        .child(
          S.document().schemaType('methodologyPage').documentId('methodologyPage'),
        ),
      S.listItem()
        .title('Kontakt')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.listItem()
        .title('Notizen')
        .id('bookPage')
        .child(S.document().schemaType('bookPage').documentId('bookPage')),
    ])
