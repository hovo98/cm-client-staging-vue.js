import BlockIndividualQuoteTable from '../components/blocks/BlockIndividualQuoteTable'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Individual Quote Table',
}

// Default State
export const StoryBlockIndividualQuoteTable = () => ({
    components: {
        StoryWrapper,
        BlockIndividualQuoteTable,
    },

    data: function() {
        return {
            title: 'Individual Quote Table',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockIndividualQuoteTable :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockIndividualQuoteTable.story = {
    name: 'Default State',
}
