import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'
import { media } from 'components/Layout'

const FooterCore = styled.footer`
  margin: 15px 0 0;
  padding: 8px 0;
  background: #44607b;
  color: white;
  ${media.greaterThan('normal-pc')`
    width: 100%;
    position: absolute;
    bottom: 0;
  `}
  ${media.lessThan('tablet')`
    margin-top: 0;
  `}
`

const Footer: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <FooterCore className="text-center">{formatMessage(messages.copyright)}</FooterCore>
  )
}

export default Footer
