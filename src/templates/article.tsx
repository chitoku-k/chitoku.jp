import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { BreadcrumbList, Integer, Thing } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

import { ArticleQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Container from 'components/Container'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Article from 'components/Article'

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

  return (
    <Layout>
      <Metadata title={article.attributes.title} thumbnail={article.attributes.category?.thumbnail} />
      <JsonLd<BreadcrumbList> item={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: article.attributes.category ? [
          {
            '@type': 'ListItem',
            position: 1 as Integer,
            item: {
              '@type': 'Thing',
              id: siteUrl,
              name: title,
            } as Thing,
          },
          {
            '@type': 'ListItem',
            position: 2 as Integer,
            item: {
              '@type': 'Thing',
              id: siteUrl + article.attributes.category.path,
              name: article.attributes.category.name,
            } as Thing,
          },
          {
            '@type': 'ListItem',
            position: 3 as Integer,
            item: {
              '@type': 'Thing',
              id: siteUrl + article.path,
              name: article.attributes.title,
            } as Thing,
          },
        ] : [
          {
            '@type': 'ListItem',
            position: 1 as Integer,
            item: {
              '@type': 'Thing',
              id: siteUrl,
              name: title,
            } as Thing,
          },
          {
            '@type': 'ListItem',
            position: 2 as Integer,
            item: {
              '@type': 'Thing',
              id: siteUrl + article.path,
              name: article.attributes.title,
            } as Thing,
          },
        ],
      }} />
      <Header />
      <Navbar />
      <Content sidebar={article.attributes.sidebar !== false}>
        <Container>
          <Article article={article} prev={prev} next={next} />
        </Container>
      </Content>
      <Footer />
    </Layout>
  )
}

interface ArticlePageProps {
  data: ArticleQuery
}

export default ArticlePage
