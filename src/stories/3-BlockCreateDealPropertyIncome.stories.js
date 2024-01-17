import BlockCreateDealPropertyIncome from '../components/blocks/BlockCreateDealPropertyIncome'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Income',
}

// Default State
export const StoryBlockCreateDealPropertyIncome = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyIncome,
    },

    data: function() {
        return {
            title: 'Create Deal Property Income',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyIncome :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyIncome.story = {
    name: 'Default State',
}
