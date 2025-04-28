import Link from 'next/link'
import Image from 'next/image'
import { sanityClient, urlForImage } from '@/lib/sanity.client' // Assuming your client setup
import { groq } from 'next-sanity'

// GROQ Queries
const LATEST_POSTS_QUERY = groq`
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt
}`

const CATEGORIES_QUERY = groq`
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description
}`

// Define interfaces for fetched data (optional but good practice)
interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  // Include other fields returned by your query if needed, e.g., alt text if queried
  alt?: string;
}

interface Post {
  _id: string;
  title?: string;
  slug: string;
  mainImage?: SanityImageReference; // Use the defined interface
  excerpt?: string;
  publishedAt?: string;
}

interface Category {
  _id: string;
  title?: string;
  slug: string;
  description?: string;
}

// The Home Page Component (Async)
export default async function Home() {
  // Fetch data from Sanity
  const posts: Post[] = await sanityClient.fetch(LATEST_POSTS_QUERY)
  const categories: Category[] = await sanityClient.fetch(CATEGORIES_QUERY)

  // No video placeholder needed for static background
  // const placeholderVideoUrl = "/videos/bali-placeholder.mp4";

  return (
    <div className="flex flex-col">
      {/* Hero Section - Using static dark background as placeholder */}
      <section className="relative flex h-[60vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-gray-900 text-white shadow-lg md:h-[80vh]"> {/* Changed bg to dark gray */}
        {/* Background Video Tag Removed */}
        {/* Overlay Div Removed (color applied directly to section) */}

        {/* Content */}
        <div className="z-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-md md:text-6xl">
            Unlock Your Bali Dream
          </h1>
          <p className="mb-8 text-lg text-gray-200 drop-shadow-sm md:text-xl">
            Insights into Bali Real Estate & Lifestyle for Foreigners
          </p>
          <Link
            href="/blog"
            className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Explore the Blog
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl">
                <div className="relative h-48 w-full overflow-hidden">
                  {post.mainImage && (
                    <Image
                      src={urlForImage(post.mainImage)?.width(600).height(400).url() || ''}
                      alt={post.title || 'Blog post image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {post.title || 'Untitled Post'}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {post.excerpt || 'No excerpt available.'}
                  </p>
                  <span className="text-sm font-medium text-blue-600 group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Explore by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug}`} // Links to specific category page (to be created)
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {category.title || 'Untitled Category'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            About Qais Estate
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Navigating the Bali real estate market can be complex. Qais Estate provides clear, actionable insights and lifestyle tips for foreigners looking to invest, live, or simply enjoy the Island of the Gods.
          </p>
          <Link
            href="/about"
            className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  )
}

// Add revalidation logic if needed for production
// export const revalidate = 60 // Revalidate data every 60 seconds
