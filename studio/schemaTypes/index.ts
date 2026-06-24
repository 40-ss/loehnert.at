import profile from './profile'
import aboutPage from './aboutPage'
import methodologyPage from './methodologyPage'
import contactPage from './contactPage'

export const schemaTypes = [profile, aboutPage, methodologyPage, contactPage]

export const singletonTypes = new Set([
  'profile',
  'aboutPage',
  'methodologyPage',
  'contactPage',
])
