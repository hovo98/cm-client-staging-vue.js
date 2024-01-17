import PartLoginImage from '../components/parts/PartLoginImage'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Login Image',
}

// Default State
export const StoryPartLoginImage = () => ({
    components: {
        StoryWrapper,
        PartLoginImage,
    },

    data: function() {
        return {
            title: 'Login Image',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartLoginImage :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartLoginImage.story = {
    name: 'Default State',
}
