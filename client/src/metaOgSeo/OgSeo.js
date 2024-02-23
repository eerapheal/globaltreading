import { useEffect, useState } from 'react'
import { MdTurnSlightLeft } from 'react-icons/md'

const OgSeo = ({
title,
description,
keywords = [],
ogTitle,
ogDescription,
ogImage,
ogUrl
}) => {
    useEffect(() => {
document.title = title
setMetaTag('name', 'description',description )
setMetaTag('name', 'keywords',keywords )
setMetaTag('property', 'og:Title', ogTitle || title)
setMetaTag('property', 'og:description', ogDescription || description)
setMetaTag('property', 'og:Image', ogImage)
setMetaTag('property', 'og:url', ogUrl || window.location.href)

return () => {
    // your cleanup
}
    },[
        title,
description,
keywords = [],
ogTitle,
ogDescription,
ogImage,
ogUrl
    ]);

const setMetaTag = (attr, key, content) => {
    if (content) {
        let element = document.querySelector(`meta[${attr}="${key}"]`)
        if(!element) {
            element = document.createElement('meta')
            element.setAttribute(attr, key)
            document.head.appendChild(element)
        };
        element.setAttribute('content', content)
    }
};
};

export default OgSeo