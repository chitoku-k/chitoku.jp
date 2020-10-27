declare module 'translations/ja.yml' {
}

declare module '*.scss' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.svg' {
  const svg: React.ComponentType<React.SVGAttributes<unknown>>
  export = svg
}

declare module '*.png' {
  const image: string
  export = image
}
