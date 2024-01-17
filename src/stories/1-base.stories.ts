import StoryWrapper from '@/stories/config/StoryWrapper.vue'
import StoryBaseEntryContent from '@/stories/base/StoryBaseEntryContent.vue'
// import StoryBaseFonts from 'stories/base/StoryBaseFonts';
// import StoryBaseButtons from 'stories/base/StoryBaseButtons';
// import StoryBaseIcons from 'stories/base/StoryBaseIcons';
// import StoryBaseColors from 'stories/base/StoryBaseColors';

export default {
    title: 'Base',
}

// export const Colors = () => ({
//     components: {
//         StoryWrapper,
//         StoryBaseColors
//     },
//
//     template: `
//         <StoryWrapper title="Colors" :container="true" noLabels>
//             <StoryBaseColors/>
//         </StoryWrapper>
//     `
// });
//
// export const Icons = () => ({
//     components: {
//         StoryWrapper,
//         StoryBaseIcons
//     },
//
//     template: `
//         <StoryWrapper title="Icons" :container="true" noLabels>
//             <StoryBaseIcons/>
//         </StoryWrapper>
//     `
// });

export const Typography = () => ({
    components: {
        StoryWrapper,
        // StoryBaseFonts,
        StoryBaseEntryContent,
    },
    template: `
        <StoryWrapper title="Entry Content" :container="true" noLabels>
<!--            <StoryBaseFonts/>-->
            <StoryBaseEntryContent/>
        </StoryWrapper>
    `,
})

// export const Buttons = () => ({
//     components: {
//         StoryWrapper,
//         StoryBaseButtons
//     },
//
//     template: `
//         <StoryWrapper title="Buttons" :container="true" noLabels>
//             <StoryBaseButtons/>
//         </StoryWrapper>
//     `
// });
