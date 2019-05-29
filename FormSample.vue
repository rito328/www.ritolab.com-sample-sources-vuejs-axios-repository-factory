<template>
    <div>
        <p v-show="isCompleted">アップロードが完了しました</p>
        <p v-show="isError">{{ message }}</p>
        <form @submit.prevent="send">
            <file-input @check-ready="isReady" :params="{ name: 'file', limit: 100, unit: 'kb', allow: 'csv', required: true }"></file-input>
            <file-input-image @check-ready="isReady" :params="{ name: 'image', limit: 100, unit: 'kb', allow: 'png,jpg,gif', preview: true, required: true }"></file-input-image>
            <button :disabled="sharedState.send.disabled" type="submit">send</button>
        </form>
    </div>
</template>

<script>
    import store from './store'

    import FileInput from './FormParts/FileInput.vue'
    import FileInputImage from './FormParts/FileInputImage.vue'

    import { RepositoryFactory } from "./Repositories/RepositoryFactory";
    const UserRepository = RepositoryFactory.get('user')

    export default {
        name: "FormSample",
        components: {
            FileInput,
            FileInputImage
        },

        data () {
            return {
                sharedState: store.state
            }
        },
        computed: {
            isCompleted () {
                return this.sharedState.send.completed
            },
            isError () {
                return this.sharedState.send.error
            },
            message () {
                return this.sharedState.send.message
            }
        },

        methods: {
            isReady () {
                let status = []
                const keys = Object.keys(this.sharedState)
                for (let i = 0; i < keys.length; i++) {
                    let param = this.sharedState[keys[i]]
                    status.push(param.required === true && param.data === false)
                }
                this.sharedState.send.disabled = !status.every(function(bool){
                    return bool === false
                })
            },
            async send () {
               if (!this.sharedState.send.disabled) {
                   store.setResetSendFlags()
                   const response = await UserRepository.register(this._getFormData())
                   if (response.data.success) {
                       this._sendSuccess(response)
                   } else {
                       this._sendError(response.data.message)
                   }
               }
            },
            _sendSuccess (response) {
                store.destroyParamAction()
                store.setSendDisabled(true)
                store.setSendCompleted(true)
                store.resetFileInputs()

                setTimeout(() => {
                    store.setSendCompleted(false)
                }, 2000)

                console.log(response) // eslint-disable-line no-console
            },
            _sendError (error) {
                store.setSendError(true)
                store.setMessage(error)
            },
            _getFormData () {
                let formData = new FormData()
                formData.append("file", this.sharedState.file.data)
                formData.append("image", this.sharedState.fileImage.data)
                return formData;
            }
        }
    }
</script>

<style>
    label {
        font-size: 12px;
        padding: 2px 3px;
    }
    label:hover {
        cursor: pointer;
    }
    label input {
        display: none;
    }
    #file_name {
        font-size: 14px;
        margin-left: 20px;
    }
    .reset_file_ico {
        padding: 0 4px;
        font-size: 12px;
        border: 1px solid #c6c6c6;
        border-radius: 10px;
    }
    .reset_file_ico:hover {
        cursor: pointer;
        border-color: #5f6674;
    }
    #error {
        color: #d70035;
    }
    .drop_area {
        width: 200px;
        padding: 10px;
        text-align: center;
        border: 1px dashed #c6c6c6;
        background-color: #f9f9f9;
    }
    .drag_on {
        border: 2px dashed #bcbcbc;
        background-color: #fafdff;
    }
</style>