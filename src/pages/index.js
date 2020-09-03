import React from 'react'

import Layout from '../components/layout/layout'
import Hero from '../components/hero/hero'
import ElevatorPitch from '../components/elevator-pitch/elevatorpitch'
import CaseStories from '../components/case-stories/case-stories'
import Toolkit from '../components/toolkit/toolkit'
import Leadership from '../components/leadership/leadership'
import Contact from '../components/contact/contact'
import SEO from '../components/seo'

const IndexPage = ({data}) => {

  return (
    <Layout>
      <SEO title="Home" description="Site description" />
      <Hero />
      <ElevatorPitch />
      <CaseStories />
      <Toolkit />
      <Leadership />
      <Contact />
    </Layout>
  )
}

export default IndexPage
