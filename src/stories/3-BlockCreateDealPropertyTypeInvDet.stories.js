import BlockCreateDealPropertyTypeInvestment from '../components/blocks/BlockCreateDealPropertyTypeInvestment'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Type Inv Det',
}

// Default State
export const BlockCreateDealPropertyTypeInvestment3 = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyTypeInvestment,
    },

    data: function() {
        return {
            title: 'Create Deal Property Type Inv Det',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyTypeInvestment :data="data"/>
        </StoryWrapper>
    `,
})

BlockCreateDealPropertyTypeInvestment3.story = {
    name: 'Default State',
}
