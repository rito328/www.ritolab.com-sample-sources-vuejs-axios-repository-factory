/**
 * Mixin
 * アップロードされた画像を生成
 * @type {{data(): *, methods: {createImage(*=): void}}}
 */
export const ImageCreatable = {
    data () {
        return {
            privateState: {
                imageData: ''
            }
        }
    },

    methods: {
        createImage (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.privateState.imageData = e.target.result
            };
            reader.readAsDataURL(file);
        }
    }
}