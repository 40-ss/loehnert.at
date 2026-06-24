import profile from './profile'
import aboutPage from './aboutPage'
import methodologyPage from './methodologyPage'
import contactPage from './contactPage'
import bookPage from './bookPage'

export const schemaTypes = [profile, aboutPage, methodologyPage, contactPage, bookPage]

export const singletonTypes = new Set([
  'profile',
  'aboutPage',
  'methodologyPage',
  'contactPage',
  'bookPage',
])
