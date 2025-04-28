'use client'

import { useState, type FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    console.log('Form Data Submitted:', data) // Log data to console as requested

    // Simulate submission delay (remove this in real implementation)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Placeholder: Set success status. Replace with actual API call logic later.
    setStatus('success')

    // Reset form after success (optional)
    // event.currentTarget.reset()
    // setTimeout(() => setStatus('idle'), 3000) // Reset status after a delay

    // Example error handling (uncomment and adapt if using an API endpoint)
    /*
    try {
      const response = await fetch('/api/contact', { // Example API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong')
      }

      setStatus('success')
      event.currentTarget.reset() // Reset form on success
      setTimeout(() => setStatus('idle'), 5000) // Reset status after delay
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to send message.')
      setStatus('error')
    }
    */
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
          Message
        </label>
        <div className="mt-2">
          <textarea
            name="message"
            id="message"
            rows={4}
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
            defaultValue={''}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-2 text-center text-sm text-red-600">Error: {errorMsg}</p>
      )}
      {status === 'success' && (
         <p className="mt-2 text-center text-sm text-green-600">Your message has been sent successfully!</p>
      )}
    </form>
  )
} 