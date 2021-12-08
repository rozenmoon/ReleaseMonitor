import React, { useEffect, useContext } from 'react';
import { RepoContext } from '../Context/useRepo';
import { getGithubRepositoryList } from '../ApiClient'

export const Graph: React.FC = () => {
    const { state, dispatch } = useContext(RepoContext);

    useEffect(() => {
        dispatch({ type: "LOADING" });
        getGithubRepositoryList().then(
            (results) => { dispatch({ type: "LOADSUCCESS", payload: results }); },
            (error) => dispatch({ type: "LOADFAILURE", payload: error }),
        )
        return () => { }
    }, []);

    return <div>{state.loading ? '..loading' : `repo list is as follows: ${state.repoList}`}</div>
}

