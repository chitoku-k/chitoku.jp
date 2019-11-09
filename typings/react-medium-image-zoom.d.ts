import React from 'react'

interface ImageZoomProps {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  zoomImage?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  zoomMargin?: number
  isZoomed?: boolean
  shouldHandleZoom?: (e: React.SyntheticEvent) => boolean
  shouldReplaceImage?: boolean
  shouldRespectMaxDimension?: boolean
  defaultStyles?: {}
  onZoom?: () => void
  onUnzoom?: () => void
}

declare const ImageZoom: React.ComponentType<ImageZoomProps>
export default ImageZoom
