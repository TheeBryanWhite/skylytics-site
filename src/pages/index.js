import React from 'react'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => {

  return (
    <Layout>
      <SEO title="Home" description="Site description" />
      <h1>Sup?</h1>
      <p>This is your new project. Get to work!</p>
    </Layout>
  )
}

export default IndexPage
