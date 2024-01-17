import BlockResetPassword from '../components/blocks/BlockResetPassword'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Reset Password',
}

// Default State
export const StoryBlockResetPassword = () => ({
    components: {
        StoryWrapper,
        BlockResetPassword,
    },

    data: function() {
        return {
            title: 'Reset Password',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockResetPassword :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockResetPassword.story = {
    name: 'Default State',
}
