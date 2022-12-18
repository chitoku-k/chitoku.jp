import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Container from 'components/Container'
import Article from 'components/Article'
import type { Breadcrumb } from 'components/Metadata'
import Metadata from 'components/Metadata'
import { register } from 'components/ArticleBody'
import Link from 'components/Link'
import PspErrorCodes from 'src/components/PspErrorCodes'
import PspSdkFunction from 'components/PspSdkFunction'
import PspSdkMacro from 'components/PspSdkMacro'
import SoarerDownload from 'components/SoarerDownload'
import SoarerHistory from 'components/SoarerHistory'
import TwitterTweet from 'components/TwitterTweet'

export const pageQuery = graphql`
  query article($id: String!, $prev: String, $next: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    article: markdownRemark(id: { eq: $id }) {
      ...Article
      htmlAst
    }
    prev: markdownRemark(id: { eq: $prev }) {
      ...Article
    }
    next: markdownRemark(id: { eq: $next }) {
      ...Article
    }
  }
  fragment Article on MarkdownRemark {
    path
    excerpted
    attributes: frontmatter {
      title
      created
      sidebar
      navigation {
        name
        to
      }
      category {
        ...Category
      }
      tags {
        ...Tag
      }
      functions {
        ...Function
      }
      macros {
        ...Macro
      }
    }
  }
  fragment Category on CategoriesYaml {
    name
    path
    thumbnail
  }
  fragment Tag on TagsYaml {
    name
    slug
  }
  fragment Function on FunctionsYaml {
    name
    return
    description
    parameters {
      name
      type
      parameters {
        name
        type
      }
      description
    }
  }
  fragment Macro on MacrosYaml {
    name
    description
    parameters {
      name
      type
      description
    }
  }
`

const ArticlePage: FunctionComponent<ArticlePageProps> = ({
  data: {
    site,
    article,
    prev,
    next,
  },
}) => {
  if (!site || !article) {
    throw new Error('Invalid data')
  }

  const {
    siteMetadata: {
      siteUrl,
      title,
    },
  } = site
  const {
    attributes,
  } = article

  const breadcrumb: Breadcrumb[] = attributes.category ? [
    {
      id: siteUrl,
      name: title,
    },
    {
      id: siteUrl + attributes.category.path,
      name: attributes.category.name,
    },
    {
      id: siteUrl + article.path,
      name: article.attributes.title,
    },
  ] : [
    {
      id: siteUrl,
      name: title,
    },
    {
      id: siteUrl + article.path,
      name: article.attributes.title,
    },
  ]

  return (
    <Layout>
      <Metadata title={attributes.title} breadcrumb={breadcrumb} created={attributes.created} thumbnail={attributes.category?.thumbnail}>
        <Header />
        <Navbar />
        <Container sidebar={article.attributes.sidebar !== false}>
          <Article article={article} prev={prev} next={next} />
        </Container>
        <Footer />
      </Metadata>
    </Layout>
  )
}

interface ArticlePageProps {
  data: Queries.articleQuery
}

register('a', Link)
register('psp-error-codes', PspErrorCodes)
register('pspsdk-function', PspSdkFunction)
register('pspsdk-macro', PspSdkMacro)
register('soarer-download', SoarerDownload)
register('soarer-history', SoarerHistory)
register('twitter-tweet', TwitterTweet)

export default ArticlePage
