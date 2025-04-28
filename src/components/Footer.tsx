import Link from 'next/link'

// Simple SVG Instagram Icon (can reuse from Header or use library)
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.186.054 1.911.198 2.494.404.738.268 1.302.64 1.868 1.206.566.566.938 1.13 1.206 1.868.206.583.35 1.308.404 2.494.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.186-.198 1.911-.404 2.494a4.806 4.806 0 0 1-1.206 1.868 4.806 4.806 0 0 1-1.868 1.206c-.583.206-1.308.35-2.494.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.186-.054-1.911-.198-2.494-.404a4.806 4.806 0 0 1-1.868-1.206 4.806 4.806 0 0 1-1.206-1.868c-.206-.583-.35-1.308-.404-2.494-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.186.198-1.911.404-2.494.268-.738.64-1.302 1.206-1.868.566-.566 1.13-.938 1.868-1.206.583-.206 1.308-.35 2.494-.404 1.266-.058 1.646-.07 4.85-.07zm0 1.441c-3.142 0-3.507.012-4.736.068-1.129.051-1.745.19-2.196.366a3.37 3.37 0 0 0-1.28 1.28c-.176.451-.315 1.067-.366 2.196-.056 1.229-.068 1.594-.068 4.736s.012 3.507.068 4.736c.051 1.129.19 1.745.366 2.196a3.37 3.37 0 0 0 1.28 1.28c.451.176 1.067.315 2.196.366 1.229.056 1.594.068 4.736.068s3.507-.012 4.736-.068c1.129-.051 1.745-.19 2.196-.366a3.37 3.37 0 0 0 1.28-1.28c.176-.451.315-1.067.366-2.196.056-1.229.068-1.594.068-4.736s-.012-3.507-.068-4.736c-.051-1.129-.19-1.745-.366-2.196a3.37 3.37 0 0 0-1.28-1.28c-.451-.176-1.067-.315-2.196-.366C15.507 3.615 15.142 3.604 12 3.604zm0 4.334c-2.407 0-4.36 1.953-4.36 4.36s1.953 4.36 4.36 4.36 4.36-1.953 4.36-4.36-1.953-4.36-4.36-4.36zm0 7.282c-1.608 0-2.921-1.313-2.921-2.921s1.313-2.921 2.921-2.921 2.921 1.313 2.921 2.921-1.313 2.921-2.921 2.921zm4.36-7.643c-.783 0-1.418.635-1.418 1.418s.635 1.418 1.418 1.418 1.418-.635 1.418-1.418-.635-1.418-1.418-1.418z" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {currentYear} qaisestate.com. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/qais.estate/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Qais Estate Instagram"
            >
              <InstagramIcon />
            </a>
            {/* Add other social icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  )
} 