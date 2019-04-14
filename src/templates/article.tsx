import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { BreadcrumbList } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Article, { ArticleItem } from 'components/Article'

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
    }
  }
  fragment Tag on TagsYaml {
    name
    slug
  }
  fragment Category on CategoriesYaml {
    name
    path
    thumbnail
  }
`

interface ArticlePageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
        title: string
      }
    }
    article: ArticleItem
    prev: ArticleItem | null
    next: ArticleItem | null
  }
}

const ArticlePage: FunctionComponent<ArticlePageProps> = ({
  data: {
    site: {
      siteMetadata: {
        siteUrl,
        title,
      },
    },
    article,
    prev,
    next,
  },
}) => (
  <Layout>
    <Metadata title={article.attributes.title} thumbnail={article.attributes.category && article.attributes.category.thumbnail} />
    <JsonLd<BreadcrumbList> item={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': article.attributes.category ? [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'Thing',
            'id': siteUrl,
            'name': title,
          },
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'Thing',
            'id': siteUrl + article.attributes.category.path,
            'name': article.attributes.category.name,
          },
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'item': {
            '@type': 'Thing',
            'id': siteUrl + article.path,
            'name': article.attributes.title,
          },
        },
      ] : [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'Thing',
            'id': siteUrl,
            'name': title,
          },
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'Thing',
            'id': siteUrl + article.path,
            'name': article.attributes.title,
          },
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

export default ArticlePage
