import PartLocationForm from '../components/parts/PartLocationForm'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Location Form',
}

// Default State
export const StoryPartLocationForm = () => ({
    components: {
        StoryWrapper,
        PartLocationForm,
    },

    data: function() {
        return {
            title: 'Location Form',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartLocationForm :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartLocationForm.story = {
    name: 'Default State',
}
