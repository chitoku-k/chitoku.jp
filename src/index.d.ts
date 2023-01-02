interface PageProps {
  data: unknown
  location: Location
  path: string
  uri: string
}

interface Window {
  grecaptcha: unknown
}

interface Context {
  sidebar?: boolean | null
}
