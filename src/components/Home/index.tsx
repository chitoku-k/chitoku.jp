import type { FunctionComponent } from 'react'

import type { HomeItemQuery } from 'graphql-types'

import Container from 'components/Container'
import ArticleCard from 'components/ArticleCard'
import ArticleContainer from 'components/ArticleContainer'
import Metadata from 'components/Metadata'

const Home: FunctionComponent<HomeProps> = ({
  pages,
}) => {
  const { items } = pages
  return (
    <Container>
      <Metadata title={null} />
      {items.map(({ article }) => (
        <ArticleContainer key={article.path}>
          <ArticleCard article={article} />
        </ArticleContainer>
      ))}
    </Container>
  )
}

type HomeProps = HomeItemQuery

export default Home
