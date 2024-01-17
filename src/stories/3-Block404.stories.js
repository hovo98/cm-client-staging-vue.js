import BlockNotFound from '../components/blocks/BlockNotFound'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: 404',
}

// Default State
export const StoryBlockNotFound = () => ({
    components: {
        StoryWrapper,
        BlockNotFound,
    },

    data: function() {
        return {
            title: '404',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockNotFound :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockNotFound.story = {
    name: 'Default State',
}
