/**
 * One-shot seed script for the four singleton documents.
 *
 * Translates the content currently hardcoded in ProfileCard / AboutCard /
 * MethodologyCard / ContactCard into Sanity documents (with rich-text fields
 * as Portable Text) and uploads the local headshot as a Sanity asset.
 *
 * Run with:
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 *
 * Requires in .env.local:
 *   VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, SANITY_API_TOKEN
 *
 * Safe to re-run: uses createOrReplace with explicit document IDs, so each
 * run overwrites the singletons in place. The headshot will be re-uploaded
 * as a new asset on each run; delete old assets in Studio if you re-seed.
 */

import {createClient} from '@sanity/client'
import {readFileSync, createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')

// --- Config -----------------------------------------------------------------

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Missing one of VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, SANITY_API_TOKEN.\n' +
      'Run with: node --env-file=.env.local scripts/seed-sanity.mjs',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-05-18',
  token,
  useCdn: false, // writes must hit the API directly
})

// --- Portable Text helpers --------------------------------------------------

const key = () => Math.random().toString(36).slice(2, 14)

/** Plain paragraph block. */
const p = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: key(), text, marks: []}],
})

/**
 * Paragraph with mixed inline runs. Each run is either a string (plain)
 * or {text, marks: ['strong'|'em']}.
 */
const pMixed = (runs) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: runs.map((r) =>
    typeof r === 'string'
      ? {_type: 'span', _key: key(), text: r, marks: []}
      : {_type: 'span', _key: key(), text: r.text, marks: r.marks ?? []},
  ),
})

/** Bullet-list item with mixed runs. */
const li = (runs) => ({
  ...pMixed(runs),
  listItem: 'bullet',
  level: 1,
})

// --- Content ----------------------------------------------------------------
// All text below is copied verbatim from the existing JSX. Edit there if you
// want different seed content; this script is the bridge, not the source.

const profile = {
  _id: 'profile',
  _type: 'profile',
  name: 'DI Gebhard Löhnert',
  title: 'Psychosozialer Berater i.A.u.S.',
  // headshot is filled in below after asset upload
}

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: 'Wer bin ich?',
  body: [
    p(
      'DI Gebhard Löhnert, Jahrgang 1967, Psychosozialer Berater in Ausbildung und unter Supervision; verheiratet und Vater von zwei erwachsenen Kindern. Vor einigen Jahren ist bei mir der Wunsch immer stärker geworden, neben meinem „Brotberuf" als Informatiker eine Tätigkeit zu finden, bei der ich andere Menschen in herausfordernden Lebensphasen unterstützen kann.',
    ),
    p(
      'So habe ich eine Ausbildung zum Psychosozialen Systemischen Berater begonnen, die ich voraussichtlich 2026 abschließen werde.',
    ),
    p(
      'Ob Sie mit ihrem Stress nicht mehr zurecht kommen, Schwierigkeiten in Ihrer Beziehung oder in Ihrem Beruf haben oder vor einer größeren Entscheidung stehen: Ich freue mich darauf, Sie kennenzulernen und mit Ihnen gemeinsam neue Perspektiven zu finden und zu mehr Klarheit zu kommen!',
    ),
  ],
}

const methodologyPage = {
  _id: 'methodologyPage',
  _type: 'methodologyPage',
  heading: 'Methodik',
  items: [
    {
      _type: 'accordionItem',
      _key: key(),
      heading: 'Was ist Psychosozialer Berater?',
      content: [
        p(
          'Manchmal gerät das Leben aus dem Takt: Ob berufliche Krisen, familiäre Konflikte oder das Gefühl, festzustecken – oft reichen die gewohnten Lösungswege nicht mehr aus. Psychosozialer Berater ist eine professionelle Wegbegleitung. Sie ist lösungsorientiert und darauf ausgerichtet, Ihre Lebensqualität und Handlungsfähigkeit wieder zu verbessern.',
        ),
      ],
    },
    {
      _type: 'accordionItem',
      _key: key(),
      heading: 'Und was bedeutet „Systemische Beratung"?',
      content: [
        p(
          'Ich lege Wert darauf, eine sichere, einfühlsame und kooperative Umgebung zu schaffen, in der sich die Klienten gehört und unterstützt fühlen, wenn sie ihre Gedanken, Emotionen und Verhaltensweisen erforschen.',
        ),
        p(
          'Ich arbeite nach dem systemischen Ansatz. Das bedeutet: Ich betrachte Sie nicht isoliert, sondern als Teil Ihrer sozialen Systeme (Familie, Partnerschaft, Arbeitsumfeld, Freunde …).',
        ),
        p('Es geht um den Blick auf das Ganze, wenn man ein Problem verstehen möchte:'),
        li([
          {text: 'Alles hängt zusammen:', marks: ['strong']},
          ' Stellen Sie sich ein Mobile vor. Bewegt sich ein Teil, geraten auch alle anderen in Bewegung. Oft liegt die Lösung für ein Problem nicht nur in uns selbst, sondern in der Art und Weise, wie wir mit anderen interagieren.',
        ]),
        li([
          {text: 'Experte für Ihr Leben:', marks: ['strong']},
          ' In der systemischen Beratung sehe ich mich als Experte für den Prozess – Sie hingegen bleiben der Experte für Ihr Leben. Gemeinsam finden wir heraus, welche Ressourcen in Ihnen schlummern.',
        ]),
      ],
    },
    {
      _type: 'accordionItem',
      _key: key(),
      heading: 'Was kann ich von Beratung erwarten?',
      content: [
        p(
          'In unseren Gesprächen nutzen wir verschiedene Methoden, um neue Perspektiven einzunehmen, neue Sichten auf Ihre Situation zu erhalten und mögliche neue Handlungsräume zu finden.',
        ),
        p(
          'Ich verstehe meine Beratungsarbeit als Begleitung auf Augenhöhe. Sie bringen ihr Wissen über ihr Leben mit, ich bringe Werkzeuge, Struktur und einen offenen Blick für neue Perspektiven ein. Im Mittelpunkt stehen Sie selbst – mit ihren Stärken, Erfahrungen und ihrem ganz individuellen Weg.',
        ),
      ],
    },
    {
      _type: 'accordionItem',
      _key: key(),
      heading: 'Was kann ich von Beratung nicht erwarten?',
      content: [
        p(
          'Psychosozialer Berater liefert (genau wie Psychotherapie) kein „Rezept" für eine Lösung Ihres Problems – sie hilft mit, gemeinsam neue Perspektiven und neue Lösungsmöglichkeiten zu finden, im Gespräch und mithilfe verschiedener Methoden.',
        ),
        p(
          'Lösungs-Garantie gibt es keine! Aber Sie können sicher sein, dass ich mich Ihnen und Ihrem Anliegen ernsthaft und professionell widme!',
        ),
      ],
    },
    {
      _type: 'accordionItem',
      _key: key(),
      heading: 'Was ist der Unterschied zwischen Psychosozialer Beratung und Therapie?',
      content: [
        p(
          'Die Psychosozialer Berater richtet sich an psychisch gesunde Menschen in schwierigen Lebenslagen oder Veränderungsprozessen. Sie ist keine Psychotherapie und ersetzt keine medizinische Behandlung. Mein Fokus liegt auf dem "Hier und Jetzt" sowie der Gestaltung Ihrer Zukunft.',
        ),
      ],
    },
  ],
}

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  heading: 'Kontakt aufnehmen',
  intro: [
    p('Wenn Sie Kontakt aufnehmen möchten, senden Sie mir bitte hier eine Nachricht:'),
  ],
  email: 'gebhard@loehnert.com',
  whatsappNumber: '068120877866',
  phone: '0681 20 877 866',
  phoneHref: '+43681208778666',
  outro: [
    p('Die erste Sitzung ist (immer) kostenlos.'),
    p(
      'Ich lege Wert darauf, eine sichere, einfühlsame und kooperative Umgebung zu schaffen, in der sich die Klienten gehört und unterstützt fühlen, wenn sie ihre Gedanken, Emotionen und Verhaltensweisen erforschen.',
    ),
  ],
}

// --- Run --------------------------------------------------------------------

async function uploadHeadshot() {
  const path = resolve(repoRoot, 'src/assets/images/gebhard.jpg')
  // Confirm the file exists with a sync read of zero bytes — cheaper than try/catch on the stream.
  readFileSync(path, {flag: 'r'}).slice(0, 0)
  process.stdout.write('Uploading headshot...\n')
  const asset = await client.assets.upload('image', createReadStream(path), {
    filename: 'gebhard.jpg',
  })
  process.stdout.write(`  -> asset ${asset._id}\n`)
  return asset
}

async function main() {
  process.stdout.write(`Seeding ${projectId}/${dataset}\n`)

  const headshotAsset = await uploadHeadshot()
  profile.headshot = {
    _type: 'image',
    asset: {_type: 'reference', _ref: headshotAsset._id},
    alt: 'Portrait of Gebhard Löhnert, professional counselor and coach',
  }

  const docs = [profile, aboutPage, methodologyPage, contactPage]

  for (const doc of docs) {
    process.stdout.write(`Publishing ${doc._id}...`)
    await client.createOrReplace(doc)
    process.stdout.write(' ✓\n')
  }

  process.stdout.write('\nDone. View at https://www.sanity.io/manage/project/' + projectId + '\n')
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message)
  if (err.statusCode) console.error(`  HTTP ${err.statusCode}`)
  if (err.responseBody) console.error('  Response:', err.responseBody)
  process.exit(1)
})
