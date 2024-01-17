import BlockSignUp from '../components/blocks/BlockSignUp'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Sign Up',
}

// Default State
export const StoryBlockSignUp = () => ({
    components: {
        StoryWrapper,
       BlockSignUp,
    },

    data: function() {
        return {
            title: 'Block Sign Up',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockSignUp :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockSignUp.story = {
    name: 'Default State',
}
