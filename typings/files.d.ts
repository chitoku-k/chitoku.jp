declare module 'translations/ja.yml' {
}

declare module '*.svg' {
  const svg: React.ComponentType<React.SVGAttributes<{}>>
  export = svg
}

declare module '*.png' {
  const image: string
  export = image
}
