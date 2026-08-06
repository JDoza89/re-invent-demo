'use client'

import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { EmailSignupContent } from '../content'

export type EmailSignupProps = {
  blok: EmailSignupContent
}

// Bare-minimum waitlist capture: validates and shows a success state, but
// does not send the email anywhere. Wire up a real endpoint/ESP before
// using this in production.
function EmailSignup(props: EmailSignupProps) {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 bg-neutral-100 items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-xl w-full flex flex-col items-center gap-4 text-center">
        {props.blok.heading ? (
          <h2 className="text-2xl md:text-3xl leading-tight tracking-[-0.3px] font-extrabold text-[#1F1F1F] font-inter">
            {props.blok.heading}
          </h2>
        ) : null}
        {props.blok.description ? (
          <p className="text-base leading-6 text-[#44474A] font-inter">
            {props.blok.description}
          </p>
        ) : null}
        {submitted ? (
          <p className="text-base font-semibold text-stone-900 font-inter">
            {props.blok.successMessage}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 w-full"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-lg border border-stone-300 text-sm font-inter"
            />
            <button
              type="submit"
              className="self-center px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold font-inter transition-border duration-300 ease-in-out"
            >
              {props.blok.buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EmailSignup
