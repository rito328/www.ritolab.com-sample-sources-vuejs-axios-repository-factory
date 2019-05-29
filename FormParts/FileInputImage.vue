<template>
    <div>
        <div class="drop_area" :class="classesDragArea" @dragover.prevent="onArea" @drop.prevent="dropFile" @dragleave.prevent="offArea" @dragend.prevent="offArea">
            <label>ファイルを選択
                <input @change="changeFile" ref="file" type="file" v-if="!sharedState.reset">
            </label>
        </div>
        <p><span id="file_name" v-show="sharedState.fileImage.data.name">{{ sharedState.fileImage.data.name }} <span class="reset_file_ico" @click="resetFile">×</span></span></p>
        <p id="error" v-if="privateState.error">{{ privateState.error }}</p>
        <p v-else-if="isPreview"><img :src="privateState.imageData" alt=""></p>
    </div>
</template>

<script>
    import { FileInputable } from './Mixins/FileInputable'
    import { ImageCreatable } from './Mixins/ImageCreatable'

    export default {
        name: "FileInputImage",
        props: ['params'],
        mixins:[ FileInputable, ImageCreatable ],

        data () {
            return {
                privateState: {
                    preview: true
                },
            }
        },

        mounted () {
            const preview = this.params.preview;
            this.privateState.preview = (typeof preview === 'boolean') ? preview : true
        },

        updated () {
            const file = this.sharedState.fileImage.data

            if (typeof file.size === 'undefined') {
                this.privateState.imageData = ''
                return
            }

            if (this.isImage(file.type)) {
                this.createImage(file)
            }
        },

        computed: {
            isPreview () {
                return this.privateState.imageData !== '' && this.privateState.preview
            }
        },
    }
</script>