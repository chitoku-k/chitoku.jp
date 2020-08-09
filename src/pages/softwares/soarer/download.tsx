import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Article, { ArticleItem } from 'components/Article'
import SoarerDownload from 'components/SoarerDownload'

export const pageQuery = graphql`
  query download {
    notice: file(relativePath: { eq: "posts/softwares/soarer/download.md" }) {
      article: childMarkdownRemark {
        ...Article
        htmlAst
      }
    }
  }
`

interface SoarerDownloadPageProps extends PageProps {
  data: {
    notice: {
      article: ArticleItem
    }
  }
}

const SoarerDownloadPage: FunctionComponent<SoarerDownloadPageProps> = ({
  data: {
    notice: {
      article,
    },
  },
}) => (
  <Layout>
    <Metadata title={article.attributes.title} thumbnail="/thumbnails/soarer.png" />
    <Header />
    <Navbar />
    <Container sidebar={article.attributes.sidebar !== false}>
      <Article article={article} components={{
        'soarer-download': SoarerDownload,
      }} />
    </Container>
    <Footer />
  </Layout>
)

export default SoarerDownloadPage
