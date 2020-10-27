import type { FunctionComponent } from 'react'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Mail from 'components/Mail'

const MailPage: FunctionComponent<PageProps> = () => (
  <Layout>
    <Header />
    <Navbar />
    <Mail />
    <Footer />
  </Layout>
)

export default MailPage
