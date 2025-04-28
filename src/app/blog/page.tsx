import Link from 'next/link'
import Image from 'next/image'
import { sanityClient, urlForImage } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import { format, parseISO } from 'date-fns' // For formatting dates

// Re-use interfaces or define locally if needed
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
  categories?: { title?: string, slug?: string }[];
}

interface Category {
  _id: string;
  title?: string;
  slug: string;
}

// GROQ Queries
const ALL_POSTS_QUERY = groq`
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt,
  "categories": categories[]->{ title, "slug": slug.current }
}`

const ALL_CATEGORIES_QUERY = groq`
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`

// The Blog Index Page Component (Async Server Component)
export default async function BlogIndexPage() {
  // Fetch all posts and categories
  const posts: Post[] = await sanityClient.fetch(ALL_POSTS_QUERY)
  const categories: Category[] = await sanityClient.fetch(ALL_CATEGORIES_QUERY)

  // TODO: Implement client-side filtering/search component later
  // For now, we pass all posts and categories down

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Blog</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Insights on Bali real estate, lifestyle, and more.
          </p>
        </div>

        {/* Filters Section - Placeholder for Search and Categories */}
        <div className="mx-auto mt-10 max-w-4xl border-t border-gray-200 pt-10">
          {/* Search Input Placeholder */}
          <div className="mb-8">
            <label htmlFor="search" className="sr-only">Search Posts</label>
            <input
              type="search"
              name="search"
              id="search"
              disabled // Disable until client component logic is added
              placeholder="Search articles..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Category Links */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Link
              href="/blog" // Link to show all posts
              className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-200 transition hover:bg-blue-200"
            >
              All Posts
            </Link>
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug}`}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-200"
              >
                {category.title || 'Untitled'}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Post List/Grid */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts?.map((post) => (
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
                {post.categories?.map((cat, index) => (
                  <Link
                    key={index} // Using index as key here is okay as categories for a post unlikely to reorder
                    href={`/blog/category/${cat.slug}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {cat.title}
                  </Link>
                ))}
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
              {/* Author info can be added here if fetched */}
            </article>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center border-t border-gray-200 pt-10">
          <nav aria-label="Pagination" className="flex items-center gap-x-4">
            <button disabled className="text-sm font-semibold text-gray-400">Previous</button>
            {/* Example page numbers - logic needed */}
            <span className="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white">1</span>
            <span className="px-3 py-1 text-sm font-semibold text-gray-700">2</span>
            {/* ... */}
            <button disabled className="text-sm font-semibold text-gray-400">Next</button>
          </nav>
        </div>
      </div>
    </div>
  )
}

// Add revalidation logic if needed
// export const revalidate = 60 // Revalidate every 60 seconds 