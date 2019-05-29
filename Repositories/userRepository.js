import Repository from './Repository'

const resource = 'store.php'

export default {
    register (payload) {
        Repository.defaults.headers.post['Content-Type'] = 'multipart/form-data'

        return Repository.post(`${resource}`, payload)
    }
}