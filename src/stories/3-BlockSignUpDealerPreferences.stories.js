import BlockSignUpDealerPreferences from '../components/blocks/BlockSignUpDealerPreferences'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Sign Up Dealer Preferences',
}

// Default State
export const StoryBlockSignUpDealerPreferences = () => ({
    components: {
        StoryWrapper,
        BlockSignUpDealerPreferences,
    },

    data: function() {
        return {
            title: 'Sign Up Dealer Preferences',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockSignUpDealerPreferences :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockSignUpDealerPreferences.story = {
    name: 'Default State',
}
