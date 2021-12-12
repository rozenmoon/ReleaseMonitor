import { Octokit } from 'octokit';
import { GITHUB_API_KEY, ORGANIZATION } from '../constant';
import { pick } from 'lodash';
import { RepoData } from '../types';

const octokit = new Octokit({ auth: GITHUB_API_KEY });

export const getGithubRepositoryList = async () => {
    try {
        const response = await octokit.request('GET /orgs/{org}/repos', {
            org: ORGANIZATION ? ORGANIZATION: '',
            type: "all",
            per_page: 100,
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

type getCommitProps = {
    repoId: number;
    repo: string;
    branch: string;
}

export const getCommits = async ({ repoId, repo, branch }: getCommitProps) => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: ORGANIZATION ? ORGANIZATION: '',
            repo: repo,
            sha: branch,
            per_page: 100
        });
        var commitDataList = response.data.map((commitData: any) => {
            const newCommitData = pick(commitData, ['url',
                'sha',
                'commit.url',
                'commit.author.name',
                'commit.author.email',
                'commit.author.date',
                'commit.message',
                'date',
                'repoId',
                'repoName'
            ]);
            newCommitData.date = new Date(commitData.commit.author.date);
            newCommitData.repoId = repoId;
            newCommitData.repoName = repo;
            return newCommitData;
        }
        );
        return commitDataList;
    }
    catch (e) {
        return e;
    }

}