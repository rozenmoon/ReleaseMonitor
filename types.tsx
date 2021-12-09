export interface RepoData {
    id: number;
    description: string;
    default_branch: string;
    full_name: string;
    git_commits_url: string;
    topics: string[];
    pushed_at: Date;
    updated_at: Date;
};

export interface CommitData {
    repoName: string;
    repoId: number;
    url: string;
    sha: string;
    date: Date;
    commit: {
        url: string;
        author: {
            name: string;
            email: string;
            date: string;
        };
        message: string;
    };
};
