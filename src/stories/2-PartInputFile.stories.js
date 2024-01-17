import PartInputFile from '../components/parts/PartInputFile'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Input File',
}

// Default State
export const StoryPartInputFile = () => ({
    components: {
        StoryWrapper,
        PartInputFile,
    },

    data: function() {
        return {
            title: 'Input File',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartInputFile :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartInputFile.story = {
    name: 'Default State',
}
