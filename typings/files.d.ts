declare module 'translations/*.yml' {
  const components: Record<string, string>
  export = components
}

declare module 'contents/taxonomies/categories/*.yml' {
  const category: {
    id: string
    name: string
    description: string
    path: string
    thumbnail: string
  }
  export = category
}

declare module '*.scss' {
  const classes: Record<string, string>
  export = classes
}

declare module '*.svg' {
  const svg: React.ComponentType<React.SVGAttributes<unknown>>
  export = svg
}

declare module '*.png' {
  const image: string
  export = image
}
