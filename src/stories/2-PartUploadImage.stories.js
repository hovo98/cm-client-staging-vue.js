import PartUploadImage from '../components/parts/PartUploadImage'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Upload Image',
}

// Default State
export const StoryPartUploadImage = () => ({
    components: {
        StoryWrapper,
        PartUploadImage,
    },

    data: function() {
        return {
            title: 'Upload Image',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartUploadImage :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartUploadImage.story = {
    name: 'Default State',
}
