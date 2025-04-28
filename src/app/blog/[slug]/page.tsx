import Link from 'next/link'
import Image from 'next/image'
import { sanityClient, urlForImage } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import type { Metadata, ResolvingMetadata } from 'next'

// Interfaces (Consider shared types)
interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface Author {
  name?: string;
  image?: SanityImageReference;
}

interface CategoryInfo {
  title?: string;
  slug?: string;
}

interface Post {
  _id: string;
  title?: string;
  slug?: string; // Keep slug if needed
  mainImage?: SanityImageReference;
  publishedAt?: string;
  author?: Author;
  categories?: CategoryInfo[];
  body?: object[]; // Use object[] instead of any[]
  seoTitle?: string;
  seoDescription?: string;
}

// GROQ Query to fetch a single post by slug
const SINGLE_POST_QUERY = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  author->{
    name,
    image
  },
  "categories": categories[]->{
    title,
    "slug": slug.current
  },
  body,
  seoTitle,
  seoDescription
}`

// Props interface for the page component
interface PostPageProps {
  params: {
    slug: string;
  };
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata(
  { params }: PostPageProps,
  _parent: ResolvingMetadata // Prefix unused parent parameter
): Promise<Metadata> {
  const slug = params.slug

  // Fetch minimal data needed for metadata
  const post: Pick<Post, 'title' | 'seoTitle' | 'seoDescription'> = await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{ title, seoTitle, seoDescription }`,
    { slug }
  )

  // Optionally access and extend parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  // Set title and description based on fetched data, with fallbacks
  const title = post?.seoTitle || post?.title || 'Blog Post'
  const description = post?.seoDescription || `Read the blog post: ${post?.title || 'Untitled'}` // Basic fallback

  return {
    title: `${title} | Qais Estate Blog`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

// --- Blog Post Page Component ---
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params

  // Fetch the full post data
  const post: Post = await sanityClient.fetch(SINGLE_POST_QUERY, { slug })

  // Handle post not found
  if (!post) {
    notFound()
  }

  // Basic Portable Text components mapping (can be customized further)
  const portableTextComponents = {
    types: {
      image: ({ value }: { value: SanityImageReference & { caption?: string } }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-6">
            <Image
              src={urlForImage(value)?.width(800).fit('max').auto('format').url() || ''}
              alt={value.alt || 'Image from blog post'}
              width={800}
              height={600} // Adjust height based on typical aspect ratio or omit for auto
              className="mx-auto rounded-md shadow-md"
              sizes="(max-width: 840px) 100vw, 800px"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      // Add custom components here if defined in Sanity schema (e.g., code blocks)
      // codeBlock: ({ value }) => <CodeBlockComponent code={value.code} language={value.language} />
    },
    marks: {
      link: ({ children, value }: { children: React.ReactNode, value: { href?: string } }) => {
        const rel = !value?.href?.startsWith('/') ? 'noopener noreferrer' : undefined
        const target = !value?.href?.startsWith('/') ? '_blank' : undefined
        return (
          <a href={value?.href} rel={rel} target={target} className="text-blue-600 underline hover:text-blue-800">
            {children}
          </a>
        )
      },
      // Add other mark component overrides (strong, em, etc.) if needed
    },
    block: {
      // Customize block rendering if needed (e.g., h2, blockquote)
      h2: ({ children }: { children: React.ReactNode }) => <h2 className="mt-8 mb-4 text-2xl font-bold">{children}</h2>,
      h3: ({ children }: { children: React.ReactNode }) => <h3 className="mt-6 mb-3 text-xl font-bold">{children}</h3>,
      h4: ({ children }: { children: React.ReactNode }) => <h4 className="mt-5 mb-2 text-lg font-bold">{children}</h4>,
      blockquote: ({ children }: { children: React.ReactNode }) => <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">{children}</blockquote>,
      // Handle other block types like lists (ul, ol)
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => <ul className="my-4 ml-6 list-disc space-y-1">{children}</ul>,
      number: ({ children }: { children: React.ReactNode }) => <ol className="my-4 ml-6 list-decimal space-y-1">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
      number: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    },
  }

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Post Header */}
        <div className="mb-12 border-b border-gray-200 pb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {post.title || 'Untitled Post'}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                Published on {format(parseISO(post.publishedAt), 'MMMM d, yyyy')}
              </time>
            )}
            {post.author?.name && <span>by {post.author.name}</span>}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Main Image */}
        {post.mainImage && (
          <div className="mb-12">
            <Image
              src={urlForImage(post.mainImage)?.width(1000).auto('format').url() || ''}
              alt={post.mainImage.alt || post.title || 'Blog post main image'}
              width={1000}
              height={600} // Adjust aspect ratio as needed
              className="mx-auto rounded-lg shadow-lg"
              priority // Prioritize loading the main image
              sizes="(max-width: 1040px) 100vw, 1000px"
            />
          </div>
        )}

        {/* Post Body */}
        <div className="prose prose-lg lg:prose-xl mx-auto max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-blue-500 prose-blockquote:text-gray-600">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p>This post has no content.</p>
          )}
        </div>

        {/* Optional Sections */}
        <div className="mt-16 border-t border-gray-200 pt-10 text-center">
          {/* Placeholder for Social Share Buttons */}
          <p className="text-sm text-gray-500">Social Share placeholder</p>
          {/* Placeholder for Related Posts */}
          <p className="mt-4 text-sm text-gray-500">Related Posts placeholder</p>
        </div>

         {/* Back to Blog Link */}
         <div className="mt-12 text-center">
             <Link href="/blog" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-800">
               &larr; Back to all posts
             </Link>
          </div>

      </div>
    </article>
  )
}

// Optional: Pre-build all blog post pages at build time
export async function generateStaticParams() {
  // Fetch all post slugs
  const posts: Pick<Post, 'slug'>[] = await sanityClient.fetch(groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Add revalidation if you prefer ISR over SSG
// export const revalidate = 60 