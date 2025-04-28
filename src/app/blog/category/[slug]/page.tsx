import Link from 'next/link'
import Image from 'next/image'
import { sanityClient, urlForImage } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'

// Re-use interfaces (consider moving to a shared types file later)
interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface Post {
  _id: string;
  title?: string;
  slug: string;
  mainImage?: SanityImageReference;
  excerpt?: string;
  publishedAt?: string;
  categories?: { title?: string, slug?: string }[]; // Keep categories info if needed for display
}

interface Category {
  _id: string;
  title?: string;
  description?: string;
  posts: Post[]; // Include posts associated with the category
}

// GROQ Query to fetch category details and its posts
const CATEGORY_WITH_POSTS_QUERY = groq`
*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  description,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ title, "slug": slug.current } // Fetch categories for display on post cards
  }
}`

// Props interface for the page component
interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// The Category Page Component (Async Server Component)
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  // Fetch the specific category and its posts
  const category: Category = await sanityClient.fetch(CATEGORY_WITH_POSTS_QUERY, { slug })

  // Handle case where category is not found
  if (!category) {
    notFound() // Use Next.js notFound helper
  }

  const posts = category.posts || []

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Category Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Category: {category.title || 'Untitled Category'}
          </h1>
          {category.description && (
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {category.description}
            </p>
          )}
          <div className="mt-6">
             <Link href="/blog" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-800">
               &larr; Back to all posts
             </Link>
          </div>
        </div>

        {/* Blog Post List/Grid - Similar to main blog index */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post._id} className="flex max-w-xl flex-col items-start justify-between rounded-lg p-4 shadow-sm transition hover:shadow-md">
                {/* Post Image */}
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md">
                  {post.mainImage ? (
                    <Image
                      src={urlForImage(post.mainImage)?.width(400).height(250).url() || ''}
                      alt={post.title || 'Blog post image'}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                  )}
                </div>

                <div className="flex items-center gap-x-4 text-xs">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt} className="text-gray-500">
                      {format(parseISO(post.publishedAt), 'MMMM d, yyyy')}
                    </time>
                  )}
                  {/* Optionally display categories if relevant */}
                  {/* {post.categories?.map((cat, index) => (...))} */}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500 lg:col-span-3 text-center">No posts found in this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Optional: Implement generateStaticParams if you want to pre-build these pages
// export async function generateStaticParams() {
//   const categories = await sanityClient.fetch(groq`*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`)
//   return categories.map((category) => ({ slug: category.slug }))
// }

// Add revalidation logic if needed
// export const revalidate = 60 // Revalidate every 60 seconds 