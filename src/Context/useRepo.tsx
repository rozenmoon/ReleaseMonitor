import React, { useState, useContext, useReducer } from 'react';
import { getGithubRepositoryList, RepoData } from '../ApiClient';

// export const getRepoList = () => {
//     const { setRepoList } = useContext(RepoContext);
//     const { setLoading } = useContext(RepoContext);
//     setLoading(true);
//     getGithubRepositoryList().then(repoList => { setRepoList(repoList); setLoading(false); });
// }

interface RepoContextStateType {
    loading: boolean;
    repoList?: RepoData[];
    error?: string;
}

interface RepoContextValueType {
    state: RepoContextStateType
    dispatch: React.Dispatch<React.ReducerAction<React.Reducer<any, any>>>
}

const dafaultValue: RepoContextValueType = {
    state: {
        loading: false,
    },
    dispatch: () => { }
}

export const RepoContext = React.createContext(dafaultValue);

type ActionType = { type: 'LOADING' }
    | { type: 'LOADSUCCESS', payload: RepoData[] }
    | { type: 'LOADFAILURE', payload: string };

const reducer = (state: RepoContextStateType, action: ActionType): RepoContextStateType => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "LOADSUCCESS":
            return { loading: false, repoList: action.payload };
        case "LOADFAILURE":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const RepoContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { loading: false });

    return (
        <RepoContext.Provider value={{ state, dispatch }}>
            {children}
        </RepoContext.Provider>
    );
};