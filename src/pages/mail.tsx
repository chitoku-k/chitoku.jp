import React, { FunctionComponent } from 'react'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Mail from 'components/Mail'

const MailPage: FunctionComponent<PageProps> = () => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <Mail />
    </Content>
    <Footer />
  </Layout>
)

export default MailPage
