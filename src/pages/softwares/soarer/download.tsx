import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout, { Container } from 'components/Layout'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
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
    <Metadata title={article.attributes.title} />
    <Header />
    <Navbar />
    <Content sidebar={article.attributes.sidebar !== false}>
      <Container>
        <Article article={article} excerpted={false} components={{
          'soarer-download': SoarerDownload,
        }} />
      </Container>
    </Content>
    <Footer />
  </Layout>
)

export default SoarerDownloadPage
