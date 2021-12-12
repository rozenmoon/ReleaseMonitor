import React, { useContext } from 'react';
import { CommitContext } from '../Context/useCommit';
import { CommitData } from '../../types';
import { Card, CardHeader, CardActionArea, CardContent } from '@mui/material';
import styles from './RepoCommit.module.css';
import moment from 'moment';
import { ORGANIZATION } from '../../constant';


const CommitList: React.FC<{ commitDataList: CommitData[] }> = ({ commitDataList }) => {
    const sortedCommitDataList = commitDataList.sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? 1 : -1)
    return <div className={styles.commitList}>{
        sortedCommitDataList.map(commitData => (
            <Card sx={{ margin: '10px' }} key={commitData.sha}>
                <CardActionArea onClick={() => window.open(`https://github.com/${ORGANIZATION}/${commitData.repoName}/commit/${commitData.sha}`)}>
                    <CardHeader title={commitData.commit.author.date.substring(0, 10)} subheader={commitData.commit.author.date.substring(11, 19)} />
                    <CardContent>
                        <div>{commitData.repoName}</div>
                        <div>{commitData.commit.message}</div>
                    </CardContent>
                </CardActionArea>
            </Card>
        ))
    }
    </div>
}

export const RepoCommit: React.FC = () => {
    const { commitState, dispatch } = useContext(CommitContext);
    return (
        <div className={styles.repoCommitContainer}>
            <CardHeader title="Commit List" />
            {commitState.commitList && commitState.commitList.length === 0 ? `Select some repo and Press Fetch Commits` : commitState.commitList && <CommitList commitDataList={commitState.commitList} />}
        </div>
    )
};