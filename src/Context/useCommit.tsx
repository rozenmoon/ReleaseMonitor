import React, { useReducer } from 'react';
import { CommitData } from '../../types';


interface CommitContextStateType {
    loading?: boolean;
    commitList?: CommitData[];
    error?: string[];
    checkedRepo?: number[];
}

interface CommitContextValueType {
    commitState: CommitContextStateType
    dispatch: React.Dispatch<React.ReducerAction<React.Reducer<any, any>>>
}

const dafaultValue: CommitContextValueType = {
    commitState: {
        loading: false,
        commitList: [],
        checkedRepo: []
    },
    dispatch: () => { }
}

export const CommitContext = React.createContext(dafaultValue);

type ActionType = { type: 'LOADING' }
    | { type: 'LOADCOMMITSUCCESS', payload: CommitData[] }
    | { type: 'LOADCOMMITFAILURE', payload: string }
    | { type: 'LOADDONE' }
    | { type: 'SELECTREPO', payload: number }
    | { type: 'UNSELECTREPO', payload: number }
    ;

const reducer = (commitState: CommitContextStateType, action: ActionType): CommitContextStateType => {
    switch (action.type) {
        case "LOADING":
            return { ...commitState, loading: true, commitList: [] };
        case "LOADCOMMITSUCCESS":
            return { ...commitState, loading: false, commitList: commitState.commitList ? commitState.commitList.concat(action.payload) : action.payload };
        case "LOADCOMMITFAILURE":
            return { ...commitState, loading: false, error: commitState.error ? commitState.error.concat([action.payload]) : [action.payload] };
        case "LOADDONE":
            return { ...commitState, loading: false };
        case "SELECTREPO":
            return { ...commitState, checkedRepo: commitState.checkedRepo ? commitState.checkedRepo.concat([action.payload]) : [action.payload] };
        case "UNSELECTREPO":
            const newCheckedRepo = commitState.checkedRepo ? commitState.checkedRepo : [];
            const index = newCheckedRepo.indexOf(action.payload);
            if (index > -1) {
                newCheckedRepo.splice(index, 1);
            };
            return { ...commitState, checkedRepo: newCheckedRepo };
        default:
            return commitState;
    }
}

export const CommitContextProvider: React.FC = ({ children }) => {
    const [commitState, dispatch] = useReducer(reducer, {
        loading: false, commitList: [],
        checkedRepo: []
    });

    return (
        <CommitContext.Provider value={{ commitState, dispatch }}>
            {children}
        </CommitContext.Provider>
    );
};