import BlockCreateDealPropertyType from '../components/blocks/BlockCreateDealPropertyType'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Type',
}

// Default State
export const StoryBlockCreateDealPropertyType = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyType,
    },

    data: function() {
        return {
            title: 'Create Deal Property Type',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyType :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyType.story = {
    name: 'Default State',
}
