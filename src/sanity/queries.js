// GROQ queries for each singleton page. The `[0]` collapses the result
// from an array to a single object — there's only ever one document of
// each singleton type.

export const profileQuery = `*[_type == "profile"][0]{
  name,
  title,
  headshot{
    ...,
    "alt": alt
  }
}`

export const aboutQuery = `*[_type == "aboutPage"][0]{
  heading,
  body
}`

export const methodologyQuery = `*[_type == "methodologyPage"][0]{
  heading,
  items[]{
    _key,
    heading,
    content
  }
}`

export const bookQuery = `*[_type == "bookPage"][0]{
  heading,
  body
}`

export const contactQuery = `*[_type == "contactPage"][0]{
  heading,
  intro,
  email,
  whatsappNumber,
  phone,
  phoneHref,
  outro
}`
