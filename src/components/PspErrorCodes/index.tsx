import React, { FunctionComponent } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'

const ErrorCode = styled.td`
  width: 150px;
  font-family: Consolas, Monaco, monospace;
`

const query = graphql`
  query {
    errors: allErrorsYaml(sort: { fields: [ code ], order: ASC }) {
      group(field: category) {
        title: fieldValue
        items: edges {
          error: node {
            code
            category
            message
          }
        }
      }
    }
  }
`

const PspErrorCodes = injectIntl<PspErrorCodesProps>(function PspErrorCodes({
  errors: {
    group,
  },
  intl: {
    formatMessage,
  },
}) {
  group.sort(({ items: [ a ] }, { items: [ b ] }) => a.error.code - b.error.code)

  return (
    <div>
      {group.map(({ items, title }, index) => (
        <React.Fragment key={title}>
          <h2>{title}</h2>
          <Bootstrap.Table striped condensed hover>
            <thead>
              <tr>
                <th>{formatMessage(messages.errorCode)}</th>
                <th>{formatMessage(messages.description)}</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ error }) => (
                <tr key={error.code}>
                  <ErrorCode>{'0x' + error.code.toString(16).padStart(8, '0')}</ErrorCode>
                  <td>{error.message}</td>
                </tr>
              ))}
            </tbody>
          </Bootstrap.Table>
        </React.Fragment>
      ))}
    </div>
  )
})

interface PspErrorCodesProps {
  errors: {
    group: {
      title: string
      items: {
        error: PspErrorItem
      }[]
    }[]
  }
}

interface PspErrorItem {
  code: number
  category: string
  message: string
}

const QueryablePspErrorCodes: FunctionComponent = () => (
  <StaticQuery query={query}>
    {({ errors }: PspErrorCodesProps) => (
      <PspErrorCodes errors={errors} />
    )}
  </StaticQuery>
)

export default QueryablePspErrorCodes
