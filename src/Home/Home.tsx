import React from 'react';
import { Graph } from '../Graph';
import { RepoContextProvider } from '../Context/useRepo';

export const Home: React.FC = () => (
    <RepoContextProvider>
        <Graph />
        <div>
            Repo list
        </div>
    </RepoContextProvider>
)