/**
 * Mixin
 * ファイルデータの評価を行う
 */
export const FileEvaluable = {
    props: ['params'],

    data () {
        return {
            privateState: {
                limit: 0,
                unit: '',
                allow: '',
                allowType: [],
                lists: {
                    'mimeType': {
                        'gif':  'image/gif',
                        'jpg':  'image/jpeg',
                        'png':  'image/png',
                        'text': 'text/plain',
                        'tsv':  'text/tab-separated-values',
                        'csv':  [ 'application/vnd.ms-excel', 'text/csv' ],
                        'pdf':  'application/pdf',
                    },
                    'unit': {
                        'kb': 1000,
                        'mb': 1000000
                    }
                }
            }
        }
    },

    mounted () {
        this.privateState.limit  = parseInt(this.params.limit)
        this.privateState.unit   = this.params.unit
        this.privateState.allow  = this.params.allow.split(",")
        this.privateState.allowType  = this._getAllowMimeType(this.privateState.allow)
    },

    methods: {
        isAllowFileType(type) {
            return this.privateState.allowType.indexOf(type) !== -1
        },
        isAllowFileSize(size) {
            return parseInt(size) < this._getLimitSizeByte()
        },
        isImage(type) {
            return type.indexOf('image') !== -1
        },
        getErrorMessageSize() {
            return this.privateState.limit + this.privateState.unit + '未満のファイルのみアップロード可能です'
        },
        getErrorMessageType() {
            return this.privateState.allow.join('/') + ' ファイルのみアップロード可能です'
        },
        _getAllowMimeType(allow) {
            let mimeTypes = []
            for (let i = 0; i < allow.length; i++) {
                let target = this.privateState.lists.mimeType[allow[i]]
                if (typeof target === 'string') {
                    mimeTypes.push(target)
                } else if (target instanceof Array) {
                    mimeTypes = mimeTypes.concat(target)
                }
            }
            return mimeTypes;
        },
        _getLimitSizeByte() {
            return this.privateState.limit * this.privateState.lists.unit[this.privateState.unit]
        }
    }
}