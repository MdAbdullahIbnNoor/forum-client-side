import React from 'react'
import Banner from '../Banner/Banner'
import TagSection from '../TagSection/TagSection'
import PostSection from '../Posts/Posts'
import Announcement from '../Announcement/Announcement'

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <TagSection></TagSection>
            <PostSection></PostSection>
            <Announcement></Announcement>
        </div>
    )
}

export default Home