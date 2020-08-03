import React, { Fragment, FunctionComponent } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GatsbyLinkProps } from 'gatsby'
import styled from 'styled-components'

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

const IconWrapper = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  ${media.sm.down()} {
    float: left;
    width: 44px;
    height: 44px;
  }
`

const IconCurtain = styled.div`
  position: absolute;
  top: 28px;
  left: 28px;
  width: 120px;
  height: 120px;
  transform: rotate(45deg);
  background-color: var(--home-color);
  ${media.sm.down()} {
    top: 8px;
    left: 8px;
    width: 29px;
    height: 29px;
  }
`

const HomeMenuItem = styled(Col)`
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  text-align: center;
  ${media.sm.down()} {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--table-border);
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

const HomeMenuItemWrapper: FunctionComponent<HomeMenuItemLinkProps> = ({
  item,
  ...props
}) => (
  <Link {...props} />
)

const HomeMenuItemLink = styled(HomeMenuItemWrapper)<HomeMenuItemLinkProps>`
  display: inline-block;
  &:hover {
    text-decoration: none;
    svg {
      fill: var(--home-${({ item }) => item}-hover);
    }
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: fill 0.3s;
    width: 175px;
    height: 175px;
    margin: 0 auto;
    fill: var(--home-${({ item }) => item});
    ${media.sm.down()} {
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
  color: var(--headings-color);
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
                  <HomeMenuItemLink to={to} item={id} title={name}>
                    <IconWrapper>
                      <IconCurtain />
                      <Icon viewBox="0 0 175 175" />
                    </IconWrapper>
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
  [key: string]: React.ComponentType<React.SVGAttributes<Element>>
}

interface HomeMenuItemLinkProps extends GatsbyLinkProps<unknown> {
  item: string
}

export default Home
