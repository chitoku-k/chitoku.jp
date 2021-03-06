import type { FunctionComponent } from 'react'
import { Fragment } from 'react'
import { Table } from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'
import type { PspErrorItemQuery } from 'graphql-types'

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
        <Fragment key={title}>
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
                  <td className={styles.errorCode}>{`0x${error.code.toString(16).padStart(8, '0')}`}</td>
                  <td>{error.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      ))}
    </div>
  )
}

type PspErrorCodesQueryResult = PspErrorItemQuery

export default PspErrorCodes
