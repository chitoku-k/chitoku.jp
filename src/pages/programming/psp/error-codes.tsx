import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Article, { ArticleItem } from 'components/Article'
import PspErrorCodes from 'components/PspErrorCodes'

export const pageQuery = graphql`
  query errorcodes {
    notice: file(relativePath: { eq: "posts/programming/psp/error-codes.md" }) {
      article: childMarkdownRemark {
        ...Article
        htmlAst
      }
    }
  }
`

interface PspErrorCodesPageProps extends PageProps {
  data: {
    notice: {
      article: ArticleItem
    }
  }
}

const PspErrorCodesPage: FunctionComponent<PspErrorCodesPageProps> = ({
  data: {
    notice: {
      article,
    },
  },
}) => (
  <Layout>
    <Metadata title={article.attributes.title} thumbnail="/thumbnails/pspprogramming.png" />
    <Header />
    <Navbar />
    <Container sidebar={article.attributes.sidebar !== false}>
      <Article article={article} components={{
        'psp-error-codes': PspErrorCodes,
      }} />
    </Container>
    <Footer />
  </Layout>
)

export default PspErrorCodesPage
