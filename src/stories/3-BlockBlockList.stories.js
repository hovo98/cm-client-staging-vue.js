import BlockBlockList from '../components/blocks/BlockBlockList'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Block List',
}

// Default State
export const StoryBlockBlockList = () => ({
    components: {
        StoryWrapper,
        BlockBlockList,
    },

    data: function() {
        return {
            title: 'Block List',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockBlockList :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockBlockList.story = {
    name: 'Default State',
}
