import BlockIndividualDealBrokerTable from '../components/blocks/BlockIndividualDealBrokerTable'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Individual Deal Broker Table',
}

// Default State
export const StoryBlockIndividualDealBrokerTable = () => ({
    components: {
        StoryWrapper,
        BlockIndividualDealBrokerTable,
    },

    data: function() {
        return {
            title: 'Individual Deal Broker Table',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockIndividualDealBrokerTable :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockIndividualDealBrokerTable.story = {
    name: 'Default State',
}
