import React, { Fragment, FunctionComponent } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from '@emotion/styled'

import { HomeItemQuery } from 'graphql-types'
import { media } from 'components/Layout'
import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
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

const HomeMenuItem = styled(Col)`
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  ${media.sm.down()} {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #efefef;
    text-align: left;
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      padding-bottom: 0;
      border: none;
      margin-bottom: 6px;
    }
  }
`

const HomeMenuItemLink = styled(Link)`
  color: #333;
  display: inline-block;
  &:hover {
    text-decoration: none;
  }
  svg {
    transition: fill 0.3s;
    width: 175px;
    height: 175px;
    margin: 0 auto;
    &.pspprogramming {
      fill: #39bc75;
      &:hover {
        fill: #21a160;
      }
    }
    &.soarer {
      fill: #48a9e2;
      &:hover {
        fill: #308ecd;
      }
    }
    &.recotw {
      fill: #6e587e;
      &:hover {
        fill: #563d69;
      }
    }
    &.windows {
      fill: #e73c3c;
      &:hover {
        fill: #cf2424;
      }
    }
    &.psp-smartphone {
      fill: #e67e22;
      &:hover {
        fill: #ce660a;
      }
    }
    &.programming {
      fill: #f1c40f;
      &:hover {
        fill: #d9ac00;
      }
    }
    ${media.sm.down()} {
      float: left;
      width: 44px;
      height: 44px;
    }
  }
  ${media.sm.down()} {
    margin: 0;
  }
`

const HomeMenuItemTitle = styled.h2`
  margin: 18px 0 14px;
  padding: 0;
  background: none;
  color: #333;
  border: none;
  font-size: 140%;
  ${media.sm.down()} {
    float: left;
    margin: 10px 8px;
  }
`

const HomeMeneuItemDescription = styled.p`
  margin-bottom: 0;
  padding: 0 12px;
  line-height: 1.4;
  font-size: 14px;
  text-align: left;
  ${media.sm.down()} {
    padding: 6px 0 0;
    clear: both;
  }
`

const Home: FunctionComponent<HomeProps> = ({ home }) => {
  if (!home) {
    throw new Error('Invalid data')
  }

  const { items } = home

  return (
    <Container>
      <Metadata title={null} />
      <ArticleContainer>
        <Row>
          {items.map(({
            id,
            component,
            name,
            to,
            description,
          }) => {
            const Icon = icons[component]
            return (
              <Fragment key={name}>
                <HomeMenuItem xs={6} md={4}>
                  <HomeMenuItemLink to={to} title={name}>
                    <Icon className={id} viewBox="0 0 175 175" />
                    <HomeMenuItemTitle>{name}</HomeMenuItemTitle>
                  </HomeMenuItemLink>
                  <HomeMeneuItemDescription>{description}</HomeMeneuItemDescription>
                </HomeMenuItem>
              </Fragment>
            )
          })}
        </Row>
      </ArticleContainer>
    </Container>
  )
}

type HomeProps = HomeItemQuery

interface HomeIcon {
  [key: string]: React.ComponentType<React.SVGAttributes<{}>>
}

export default Home
