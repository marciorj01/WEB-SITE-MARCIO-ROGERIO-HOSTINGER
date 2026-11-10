import type { Access, FieldAccess } from 'payload'

export const adminOnly: Access = ({ req }) => req.user?.collection === 'admins'
export const adminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'
export const publishedOnly: Access = ({ req }) =>
  req.user?.collection === 'admins' ? true : { _status: { equals: 'published' } }
