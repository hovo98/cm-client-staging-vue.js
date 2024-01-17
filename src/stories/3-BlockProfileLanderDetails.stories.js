import BlockProfileLanderDetails from '../components/blocks/BlockProfileLanderDetails'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Lander Details',
}

// Default State
export const StoryBlockProfileLanderDetails = () => ({
    components: {
        StoryWrapper,
        BlockProfileLanderDetails,
    },

    data: function() {
        return {
            title: 'Profile Lander Details',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileLanderDetails :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileLanderDetails.story = {
    name: 'Default State',
}
