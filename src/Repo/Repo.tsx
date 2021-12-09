import React, { useEffect, useContext } from 'react';
import { RepoContext } from '../Context/useRepo';
import { CommitContext } from '../Context/useCommit';
import { getGithubRepositoryList } from '../ApiClient'
import { RepoData } from '../../types'
import styles from './Repo.module.css';
import { getCommits } from '../ApiClient';
import { Button, FormGroup, Checkbox, FormControlLabel, Card, CardHeader, CardContent, CircularProgress } from '@mui/material';

type RepoRowProps = {
    repoData: RepoData;
}

const RepoRow: React.FC<RepoRowProps> = ({ repoData }) => {
    const { state, dispatch } = useContext(RepoContext);
    return (
        <div className={styles.repoRow}>
            <FormControlLabel control={<Checkbox checked={state.checkedRepo && state.checkedRepo.includes(repoData.id)} onChange={(event) => {
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                if (value) { dispatch({ type: "SELECTREPO", payload: repoData.id }) }
                else {
                    dispatch({ type: "UNSELECTREPO", payload: repoData.id })
                }
            }} />} label={repoData.full_name.substring(8)} />
        </div>
    );
}

type RepoListProps = {
    repoDataList?: RepoData[];
    loading: boolean;
}

export const RepoList: React.FC<RepoListProps> = ({ repoDataList, loading }) => {
    const { state } = useContext(RepoContext);
    const { commitState, dispatch } = useContext(CommitContext);
    const fetchCommitForSelectedRepo = () => {
        dispatch({ type: "LOADING" });
        state.checkedRepo && state.checkedRepo.forEach(repoId => {
            const repo = state.repoList && state.repoList.find(repo => repo.id === repoId);
            if (repo) {
                getCommits({ repoId: repoId, repo: repo.full_name.substring(8), branch: repo.default_branch }).then(
                    (results) => { dispatch({ type: "LOADCOMMITSUCCESS", payload: results }); console.log(commitState); },
                    (error) => dispatch({ type: "LOADCOMMITFAILURE", payload: error }),
                );
            }
        });
        dispatch({ type: "LOADDONE" });
    }
    return (
        <Card sx={{ padding: '5px', width: '25%', height: '387px' }} >
            <CardHeader sx={{ textAlign: 'center', padding: '5px' }} title="Repo List" />
            <CardContent sx={{ padding: '5px' }}>
                {loading ? <div className={styles.repoLoader}><CircularProgress sx={{ display: 'block', margin: '0 auto' }} /> </div> : <>
                    <FormGroup sx={{ flexDirection: 'row' }} className={styles.repoList}>
                        {repoDataList && repoDataList.map(repoData => <RepoRow key={repoData.id} repoData={repoData} />)}
                    </FormGroup>
                </>}
            </CardContent>
            <Button sx={{ display: 'block', margin: '0 auto' }} className={styles.button} onClick={fetchCommitForSelectedRepo}>{commitState.loading ? `...loading` : `Fetch commits`}</Button>
        </Card >
    );
}

export const RepoListContainer: React.FC = () => {
    const { state, dispatch } = useContext(RepoContext);

    useEffect(() => {
        dispatch({ type: "LOADING" });
        getGithubRepositoryList().then(
            (results) => { dispatch({ type: "LOADSUCCESS", payload: results }); },
            (error) => dispatch({ type: "LOADFAILURE", payload: error }),
        )
        return () => { }
    }, []);

    return <RepoList loading={state.loading as boolean} repoDataList={state.repoList} />
}