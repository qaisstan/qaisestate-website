import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

// Simple SVG Instagram Icon (can reuse from Header or use library)
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    {/* SVG Path data from Header/Footer component */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.186.054 1.911.198 2.494.404.738.268 1.302.64 1.868 1.206.566.566.938 1.13 1.206 1.868.206.583.35 1.308.404 2.494.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.186-.198 1.911-.404 2.494a4.806 4.806 0 0 1-1.206 1.868 4.806 4.806 0 0 1-1.868 1.206c-.583.206-1.308.35-2.494.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.186-.054-1.911-.198-2.494-.404a4.806 4.806 0 0 1-1.868-1.206 4.806 4.806 0 0 1-1.206-1.868c-.206-.583-.35-1.308-.404-2.494-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.186.198-1.911.404-2.494.268-.738.64-1.302 1.206-1.868.566-.566 1.13-.938 1.868-1.206.583-.206 1.308-.35 2.494-.404 1.266-.058 1.646-.07 4.85-.07zm0 1.441c-3.142 0-3.507.012-4.736.068-1.129.051-1.745.19-2.196.366a3.37 3.37 0 0 0-1.28 1.28c-.176.451-.315 1.067-.366 2.196-.056 1.229-.068 1.594-.068 4.736s.012 3.507.068 4.736c.051 1.129.19 1.745.366 2.196a3.37 3.37 0 0 0 1.28 1.28c.451.176 1.067.315 2.196.366 1.229.056 1.594.068 4.736.068s3.507-.012 4.736-.068c1.129-.051 1.745-.19 2.196-.366a3.37 3.37 0 0 0 1.28-1.28c.176-.451.315-1.067.366-2.196.056-1.229.068-1.594.068-4.736s-.012-3.507-.068-4.736c-.051-1.129-.19-1.745-.366-2.196a3.37 3.37 0 0 0-1.28-1.28c-.451-.176-1.067-.315-2.196-.366C15.507 3.615 15.142 3.604 12 3.604zm0 4.334c-2.407 0-4.36 1.953-4.36 4.36s1.953 4.36 4.36 4.36 4.36-1.953 4.36-4.36-1.953-4.36-4.36-4.36zm0 7.282c-1.608 0-2.921-1.313-2.921-2.921s1.313-2.921 2.921-2.921 2.921 1.313 2.921 2.921-1.313 2.921-2.921 2.921zm4.36-7.643c-.783 0-1.418.635-1.418 1.418s.635 1.418 1.418 1.418 1.418-.635 1.418-1.418-.635-1.418-1.418-1.418z" />
  </svg>
)

export const metadata: Metadata = {
  title: 'Contact Us | Qais Estate',
  description: 'Get in touch with Qais Estate for inquiries about Bali real estate.',
}

export default function ContactPage() {
  return (
    <div className="isolate bg-white px-6 py-16 sm:py-24 lg:px-8">
      {/* Background Gradient (Optional) */}
      {/* <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
      
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <ContactForm />

        {/* Contact Information */}
        <div className="mt-10 text-center">
          <p className="text-base leading-7 text-gray-600">
            Prefer to email? Reach us at:
          </p>
          <a href="mailto:info@qaisestate.com" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
            info@qaisestate.com {/* Replace with actual email */}
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-6">
           <a
              href="https://www.instagram.com/qais.estate/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Qais Estate Instagram"
            >
              <span className="sr-only">Instagram</span>
              <InstagramIcon />
            </a>
           {/* Add other social icons if needed */}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs leading-5 text-gray-500">
            Disclaimer: The information provided on this website is for general informational purposes only, and does not constitute legal or financial advice. Please consult with a qualified professional before making any decisions regarding real estate investment or legal matters in Bali.
          </p>
        </div>
      </div>
    </div>
  )
} 