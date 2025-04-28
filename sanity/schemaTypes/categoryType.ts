import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {required} from '../lib/validation'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
}) 