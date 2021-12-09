import React from 'react';
import { RepoListContainer } from '../Repo';
import { RepoCommit } from '../RepoCommit';
import { RepoContextProvider } from '../Context/useRepo';
import { CommitContextProvider } from '../Context/useCommit';
import styles from './Home.module.css';

export const Home: React.FC = () => (
    <div className={styles.home}>
        <RepoContextProvider>
            <CommitContextProvider>
                <RepoListContainer />
                <RepoCommit />
            </CommitContextProvider>
        </RepoContextProvider>
    </div>
)