import React from 'react'
import { Col } from 'react-bootstrap'
import { connectStateResults } from 'react-instantsearch-dom'

import styles from './styles.module.scss'

import SearchResult from 'components/SearchResult'

const Container = connectStateResults(function Container({
  searchState,
  children,
}) {
  return (
    <Col className={styles.container}>
      {searchState.query ? <SearchResult /> : children}
    </Col>
  )
})

export default Container
