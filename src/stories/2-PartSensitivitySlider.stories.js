import PartSensitivitySlider from '../components/parts/PartSensitivitySlider'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Sensitivity Slider',
}

// Default State
export const StoryPartSensitivitySlider = () => ({
    components: {
        StoryWrapper,
        PartSensitivitySlider,
    },

    data: function() {
        return {
            title: 'Sensitivity Slider',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartSensitivitySlider :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartSensitivitySlider.story = {
    name: 'Default State',
}
