import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'gebhardloehnert',

  projectId: '1qbr73b2',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Hide singleton types from the global "Create new..." menu — they're
    // accessed only via the structure items defined in ./structure.ts.
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, strip out destructive/duplicate actions —
    // there's only ever one of each.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? ''),
          )
        : input,
  },
})
