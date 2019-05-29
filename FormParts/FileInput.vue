<template>
    <div>
        <div class="drop_area" :class="classesDragArea" @dragover.prevent="onArea" @drop.prevent="dropFile" @dragleave.prevent="offArea" @dragend.prevent="offArea">
            <label>ファイルを選択
                <input @change="changeFile" ref="file" type="file" v-if="!sharedState.reset">
            </label>
        </div>
        <p><span id="file_name" v-show="sharedState.file.data.name">{{ sharedState.file.data.name }} <span class="reset_file_ico" @click="resetFile">×</span></span></p>
        <p id="error" v-if="privateState.error">{{ privateState.error }}</p>
    </div>
</template>

<script>
    import { FileInputable } from './Mixins/FileInputable'

    export default {
        name: "FileInput",
        mixins: [ FileInputable ],
    }
</script>