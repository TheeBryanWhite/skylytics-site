import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageBody from '../components/page-body/page-body'
import SubpageHero from '../components/hero-subpage/subpage-hero'
import Leadership from '../components/page-body-child-leadership/leadership'

const IndexPage = ({data}) => {
  return (
    <Layout page="leadership">
      <SEO title="Leadership - skylytics" description="Site description" />
      <SubpageHero imgData={data.file.childImageSharp.fluid} pageTitle="Executive Leaderhip Team" />
      <PageBody>
        <Leadership bodyData="" />
      </PageBody>
    </Layout>
  )
}

export default IndexPage
