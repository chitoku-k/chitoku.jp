import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout, { Container } from 'components/Layout'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
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
    <Metadata title={article.attributes.title} />
    <Header />
    <Navbar />
    <Content sidebar={article.attributes.sidebar !== false}>
      <Container>
        <Article article={article} excerpted={false} components={{
          'psp-error-codes': PspErrorCodes,
        }} />
      </Container>
    </Content>
    <Footer />
  </Layout>
)

export default PspErrorCodesPage
