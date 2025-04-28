import { type Rule } from 'sanity'

// Helper function to make a field required
export const required = () => (Rule: any) => Rule.required() 