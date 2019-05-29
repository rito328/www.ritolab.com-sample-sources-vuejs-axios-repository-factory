import { FileEvaluable } from './FileEvaluable'
import store from '../../store'

export const FileInputable = {
    mixins: [ FileEvaluable ],

    data () {
        return {
            privateState: {
                name: '',
                error: '',
                inArea: false
            },
            sharedState: store.state
        }
    },

    mounted () {
        this.privateState.name = this.params.name
        const isRequired = typeof this.params.required === 'boolean' ? this.params.required : false
        store.setRequiredAction(isRequired, this.privateState.name)
    },

    computed: {
        isError () {
            return !!this.privateState.error !== ''
        },
        classesDragArea () {
            return {
                'drag_on': this.privateState.inArea
            }
        }
    },

    methods: {
        dropFile(e) {
            this.changeFile(e)
            this.offArea()
        },
        changeFile (e) {
            const files = e.target.files || e.dataTransfer.files

            if (this.validation(files[0])) {
                store.setParamAction(files[0], this.privateState.name)
            } else {
                store.removeParamAction(this.privateState.name)
            }
            this.$emit('check-ready')
        },
        resetFile () {
            const input = this.$refs.file;
            input.type = 'text'
            input.type = 'file'
            store.removeParamAction(this.privateState.name)
            this.privateState.error = ''
            this.$emit('check-ready')
        },
        validation (file) {
            if (!this.isAllowFileType(file.type)) {
                this.privateState.error = this.getErrorMessageType()
                return false
            }

            if (!this.isAllowFileSize(file.size)) {
                this.privateState.error = this.getErrorMessageSize()
                return false
            }

            this.privateState.error = ''
            return true
        },
        onArea  () { this.privateState.inArea = true  },
        offArea () { this.privateState.inArea = false },
    }
}