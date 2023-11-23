import React from 'react'
import Banner from '../Banner/Banner'
import TagSection from '../TagSection/TagSection'
import PostSection from '../Posts/Posts'

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <TagSection></TagSection>
            <PostSection></PostSection>
        </div>
    )
}

export default Home