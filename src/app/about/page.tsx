// src/app/about/page.tsx
// import Image from 'next/image' // Removed unused import
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Qais Estate',
  description: 'Learn more about Qais Estate and our mission to guide foreigners in the Bali real estate market.',
}

export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              About Qais Estate
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Your Trusted Partner in Navigating Bali Real Estate
            </p>
          </div>

          {/* Main Content Area */}
          <div className="lg:flex lg:gap-x-12">
            {/* Text Content */}
            <div className="lg:flex-auto">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-base leading-7 text-gray-700 mb-6">
                Placeholder text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
                My Story
              </h2>
              <p className="text-base leading-7 text-gray-700 mb-6">
                Placeholder text: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
              </p>
               <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
                Unique Perspective
              </h2>
              <p className="text-base leading-7 text-gray-700 mb-6">
                Placeholder text: Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
              </p>
            </div>

            {/* Placeholder for Photograph */}
            <div className="mt-10 lg:mt-0 lg:w-1/3 lg:flex-shrink-0">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
                {/* Replace with actual Image component when available */}
                {/* <Image src="/path/to/your-photo.jpg" alt="Qais Stanikzai" layout="fill" objectFit="cover" /> */}
                <div className="flex h-full items-center justify-center">
                  <span className="text-gray-500">Author Photo Placeholder</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                 Qais Stanikzai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 