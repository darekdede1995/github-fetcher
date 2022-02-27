export interface CommitInterface {
    sha: string;
    node_id: string;
    commit: {
        committer: {
            name: string;
            email: string;
            date: string;
        },
        message: string;
        comment_count: number;
    },
    html_url: string;
    committer: {
        login: string;
        avatar_url: string;
    },
}
