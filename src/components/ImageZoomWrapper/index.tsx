import React, { DetailedHTMLProps, FunctionComponent, ImgHTMLAttributes } from 'react'
import ImageZoom from 'react-medium-image-zoom'

const ImageZoomWrapper: FunctionComponent<ImageZoomWrapperProps> = props => (
  <ImageZoom image={props} shouldRespectMaxDimension={true} />
)

type ImageZoomWrapperProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export default ImageZoomWrapper
