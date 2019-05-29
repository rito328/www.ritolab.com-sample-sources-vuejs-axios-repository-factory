export default {
    state: {
        send: {
            disabled: true,
            completed: false,
            error: false,
            message: '',
        },
        file: {
            data: false,
            required: false
        },
        fileImage: {
            data: false,
            required: false
        },
        reset: false
    },
    setSendDisabled (bool) {
        this.state.send.disabled = bool
    },
    setSendCompleted (bool) {
        this.state.send.completed = bool
    },
    setSendError (bool) {
        this.state.send.error = bool
    },
    setMessage (message='') {
        this.state.send.message = message
    },
    setResetSendFlags () {
        this.setSendCompleted(false)
        this.setSendError(false)
        this.setMessage()
    },
    resetFileInputs () {
        this.state.reset = true
        setTimeout(() => {
            this.state.reset = false
        }, 1)
    },
    setRequiredAction (bool, type) {
        switch (type) {
            case 'file':  { this._setFileRequiredAction(bool);      break }
            case 'image': { this._setFileImageRequiredAction(bool); break }
            default: { break }
        }
    },
    setParamAction (file, type) {
        switch (type) {
            case 'file':  { this._setFileAction(file);      break }
            case 'image': { this._setFileImageAction(file); break }
            default: { break }
        }
    },
    removeParamAction (type) {
        switch (type) {
            case 'file':  { this._removeFileAction();      break }
            case 'image': { this._removeFileImageAction(); break }
            default: { break }
        }
    },
    _setFileRequiredAction (bool) {
        this.state.file.required      = bool
    },
    _setFileImageRequiredAction (bool) {
        this.state.fileImage.required = bool
    },
    _setFileAction (file) {
        this.state.file.data      = file
    },
    _setFileImageAction (file) {
        this.state.fileImage.data = file
    },
    _removeFileAction () {
        this.state.file.data      = false
    },
    _removeFileImageAction () {
        this.state.fileImage.data = false
    },
    destroyParamAction () {
        this._removeFileAction()
        this._removeFileImageAction()
    }
}