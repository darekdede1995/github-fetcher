export interface RepositoryInterface {
    id: number;
    name: string;
    description: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    stargazers_count: number;
    open_issues_count: number;
    forks: number;
    default_branch: string;
    language: string;
    owner: {
        login: string;
    }
}
