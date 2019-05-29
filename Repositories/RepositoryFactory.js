import userRepository from './userRepository'

const repositories = {
    user: userRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name]
}