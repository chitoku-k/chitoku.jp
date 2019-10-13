import React, { DetailedHTMLProps, FunctionComponent, ImgHTMLAttributes } from 'react'
import ImageZoom from 'react-medium-image-zoom'

const ImageZoomWrapper: FunctionComponent<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = props => (
  <ImageZoom image={props} shouldRespectMaxDimension />
)

export default ImageZoomWrapper
