import PartCreateFormProgressBar from '../components/parts/PartCreateFormProgressBar'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Create Form Progress Bar',
}

// Default State
export const StoryPartCreateFormProgressBar = () => ({
    components: {
        StoryWrapper,
        PartCreateFormProgressBar,
    },

    data: function() {
        return {
            title: 'Create Form Progress Bar',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartCreateFormProgressBar :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartCreateFormProgressBar.story = {
    name: 'Default State',
}
