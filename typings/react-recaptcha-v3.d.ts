import React from 'react'

declare module 'react-recaptcha-v3' {
  interface ReCaptchaProps {
    elementID?: string
    verifyCallbackName?: string
    verifyCallback: (recaptchaToken: string) => any
    sitekey: string
    action: string
  }

  export const ReCaptcha: React.ComponentType<ReCaptchaProps>
  export function loadReCaptcha(siteKey: string)
}
