import {defineType, defineArrayMember, defineField} from 'sanity'
import {ImageIcon, LinkIcon, CodeBlockIcon} from '@sanity/icons'

/**
 * This is the schema definition for the rich text fields used in
 * the main document types.
 */
export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you set what text blocks can be marked up as. Defaults
      // correspond with HTML tags, but you can set any title or value
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators represent inline styles
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        // Annotations are links
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                }).error('URL must start with http, https, mailto, or tel')
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: Rule => Rule.required().error('Alt text is required for images.'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
      // Add preview configuration for images in block content
      preview: {
        select: {
          imageUrl: 'asset.url',
          alt: 'alt',
          caption: 'caption'
        },
        prepare({ imageUrl, alt, caption }) {
          return {
            title: alt || caption || '(No alt text or caption)',
          }
        }
      }
    }),
    // Optional: Add a code block type if needed
    // defineArrayMember({
    //   name: 'codeBlock',
    //   title: 'Code Block',
    //   type: 'code', // Assumes you have installed @sanity/code-input
    //   icon: CodeBlockIcon,
    //   options: {
    //     languageAlternatives: [
    //       {title: 'JavaScript', value: 'javascript'},
    //       {title: 'TypeScript', value: 'typescript'},
    //       {title: 'HTML', value: 'html'},
    //       {title: 'CSS', value: 'css'},
    //       {title: 'Shell', value: 'sh'},
    //       {title: 'GROQ', value: 'groq'},
    //     ],
    //     withFilename: true,
    //   }
    // }),
  ],
}) 