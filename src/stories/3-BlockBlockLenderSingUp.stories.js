import BlockBlockLenderSingUp from '../components/blocks/BlockBlockLenderSingUp'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Block Lender Sing Up',
}

// Default State
export const StoryBlockBlockLenderSingUp = () => ({
    components: {
        StoryWrapper,
        BlockBlockLenderSingUp,
    },

    data: function() {
        return {
            title: 'Block Lender Sing Up',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockBlockLenderSingUp :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockBlockLenderSingUp.story = {
    name: 'Default State',
}
