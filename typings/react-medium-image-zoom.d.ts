import React from 'react'

declare module 'react-medium-image-zoom' {
  interface ImageZoomProps {
    image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    zoomImage?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    zoomMargin?: number
    isZoomed?: boolean
    shouldHandleZoom?: (e: React.SyntheticEvent) => boolean
    shouldReplaceImage?: boolean
    shouldRespectMaxDimension?: boolean
    defaultStyles?: {}
    onZoom?: () => any
    onUnzoom?: () => any
  }

  const ImageZoom: React.ComponentType<ImageZoomProps>
  export = ImageZoom
}
