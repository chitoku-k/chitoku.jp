import React, { FunctionComponent } from 'react'
import ImageZoom from 'react-medium-image-zoom'

const ImageZoomWrapper: FunctionComponent<ImageZoomWrapperProps> = ({
  image,
}) => (
  <ImageZoom image={JSON.parse(image)} shouldRespectMaxDimension={true} />
)

interface ImageZoomWrapperProps {
  image: string
  zoomImage?: string
}

export default ImageZoomWrapper
