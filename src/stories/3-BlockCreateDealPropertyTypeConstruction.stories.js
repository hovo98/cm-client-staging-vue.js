import BlockCreateDealPropertyTypeConstruction from '../components/blocks/BlockCreateDealPropertyTypeConstruction'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Type Construction',
}

// Default State
export const StoryBlockCreateDealPropertyTypeConstruction = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyTypeConstruction,
    },

    data: function() {
        return {
            title: 'Create Deal Property Type Construction',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyTypeConstruction :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyTypeConstruction.story = {
    name: 'Default State',
}
