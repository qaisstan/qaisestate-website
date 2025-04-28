import { type SchemaTypeDefinition } from 'sanity'

import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  categoryType,
  authorType,
  blockContentType, // Ensure this is the variable name holding the defineType result
]
