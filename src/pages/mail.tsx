import type { FunctionComponent } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Mail from 'components/Mail'
import Navbar from 'components/Navbar'

const MailPage: FunctionComponent<PageProps> = () => (
  <Layout>
    <Header />
    <Navbar />
    <Mail />
    <Footer />
  </Layout>
)

export default MailPage
