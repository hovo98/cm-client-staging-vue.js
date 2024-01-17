import BlockProfileCompanySettings from '../components/blocks/BlockProfileCompanySettings'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Company Settings',
}

// Default State
export const StoryBlockProfileCompanySettings = () => ({
    components: {
        StoryWrapper,
        BlockProfileCompanySettings,
    },

    data: function() {
        return {
            title: 'Profile Company Settings',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileCompanySettings :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileCompanySettings.story = {
    name: 'Default State',
}
