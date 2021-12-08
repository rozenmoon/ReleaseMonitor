import { Octokit } from 'octokit';
import { GITHUB_API_KEY } from '../constant';
import { pick } from 'lodash';

const octokit = new Octokit({ auth: GITHUB_API_KEY });

const defaultParam: any = {
    org: 'kouzoh',
    type: "internal",
    per_page: 100,
}

export interface RepoData {
    id: number;
    description: string;
    default_branch: string;
    full_name: string;
    git_commits_url: string;
    topics: string[];
    pushed_at: Date;
    updated_at: Date;
}

export const getGithubRepositoryList = async () => {
    try {
        const response = await octokit.request('GET /orgs/{org}/repos', {
            ...defaultParam,
        });
        const reposDataList: RepoData[] = response.data.map((repoData: any) => pick(repoData, ['id',
            'description',
            'default_branch',
            'full_name',
            'git_commits_url',
            'topics',
            'pushed_at', 'updated_at']));
        return reposDataList;
    }
    catch (e) {
        return e;
    }

}