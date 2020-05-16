import React, { FunctionComponent } from 'react'
import { Table } from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'

import { PspErrorItemQuery } from 'graphql-types'
import messages from './messages'

const ErrorCode = styled.td`
  width: 150px;
  font-family: Consolas, Monaco, monospace;
`

const query = graphql`
  query PspErrorItem {
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

const PspErrorCodes: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  const {
    errors: {
      group,
    },
  } = useStaticQuery<PspErrorCodesQueryResult>(query)

  group.sort(({ items: [ a ] }, { items: [ b ] }) => a.error.code - b.error.code)

  return (
    <div>
      {group.map(({ items, title }) => (
        <React.Fragment key={title}>
          <h2>{title}</h2>
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th>{formatMessage(messages.error_code)}</th>
                <th>{formatMessage(messages.description)}</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ error }) => (
                <tr key={error.code}>
                  <ErrorCode>{`0x${error.code.toString(16).padStart(8, '0')}`}</ErrorCode>
                  <td>{error.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      ))}
    </div>
  )
}

type PspErrorCodesQueryResult = PspErrorItemQuery

export default PspErrorCodes
