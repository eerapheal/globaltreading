import React from 'react'
import OgSeo from './OgSeo'

const pageSeo = () => {
    OgSeo({
        title: "my page 1 title",
        description: "my page 1 description",
        keywords: "my page 1 keyword",
        ogTitle: "my page 1 ogTitle",
        ogDescription: "my page 1  ogDescription",
        ogImage: "http://example.com/image.png",
        ogUrl: "http://example.com/page1"
    })
  return (
<div>yes og image </div>
  )
}

export default pageSeo