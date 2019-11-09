import React from 'react'

interface ReCaptchaProps {
  elementID?: string
  verifyCallbackName?: string
  verifyCallback: (recaptchaToken: string) => void
  sitekey: string
  action: string
}

declare const ReCaptcha: React.ComponentType<ReCaptchaProps>
export function loadReCaptcha(siteKey: string): void
