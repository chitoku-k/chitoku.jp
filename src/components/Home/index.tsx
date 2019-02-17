import React, { FunctionComponent, Fragment } from 'react'
import * as Bootstrap from 'react-bootstrap'

import { Container, ArticleContainer } from 'components/Layout'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import PspProgrammingIcon from '../../assets/pspprogramming.svg'
import SoarerIcon from '../../assets/soarer.svg'
import RecoTwIcon from '../../assets/recotw.svg'
import WindowsIcon from '../../assets/windows.svg'
import GadgetsIcon from '../../assets/psp-smartphone.svg'
import ProgrammingIcon from '../../assets/programming.svg'

const icons: HomeIcon = {
  PspProgrammingIcon,
  SoarerIcon,
  RecoTwIcon,
  WindowsIcon,
  GadgetsIcon,
  ProgrammingIcon,
}

const Home: FunctionComponent<HomeProps> = ({
  home: {
    items,
  },
}) => (
  <Container>
    <Metadata title={null} />
    <ArticleContainer className="home">
      {items.map(({
        id,
        component,
        name,
        to,
        description,
      }, index) => {
        const Icon = icons[component]
        return (
          <Fragment key={name}>
            <Bootstrap.Col className="home-menu-link" xs={6} md={4}>
              <Link to={to} id={id} className="home-menu-link-image" title={name}>
                <Icon viewBox="0 0 175 175" />
                <h2>{name}</h2>
              </Link>
              <p>{description}</p>
            </Bootstrap.Col>
            {(index + 1) % 2 === 0 ? (
              <Bootstrap.Clearfix visibleSmBlock visibleXsBlock />
            ) : null}
            {(index + 1) % 3 === 0 ? (
              <Bootstrap.Clearfix visibleMdBlock visibleLgBlock />
            ) : null}
          </Fragment>
        )
      })}
    </ArticleContainer>
  </Container>
)

interface HomeProps {
  home: {
    items: HomeLinkItem[]
  }
}

interface HomeIcon {
  [key: string]: React.ComponentType<React.SVGAttributes<{}>>
}

export interface HomeLinkItem {
  id: string
  component: string
  name: string
  to: string
  description: string
}

export default Home
