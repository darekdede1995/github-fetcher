const GET_USER_REPOSITORIES_URL = "https://api.github.com/users/:username/repos"
const GET_COMMITS_URL = "https://api.github.com/repos/:username/:repository/commits"
const GET_USER_URL = "https://api.github.com/users/:username"

export const getUserRepositoriesUrl = (username: string) => {
    return GET_USER_REPOSITORIES_URL.replace(":username", username)
}

export const getCommitsUrl = (username: string, repository: string) => {
    return GET_COMMITS_URL.replace(":username", username).replace(":repository", repository)
}

export const getUserUrl = (username: string) => {
    return GET_USER_URL.replace(":username", username)
}
