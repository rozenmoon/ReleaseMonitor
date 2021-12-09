import React, { useReducer } from 'react';
import { RepoData } from '../../types';

interface RepoContextStateType {
    loading?: boolean;
    repoList?: RepoData[];
    error?: string;
    checkedRepo?: number[];
}

interface RepoContextValueType {
    state: RepoContextStateType
    dispatch: React.Dispatch<React.ReducerAction<React.Reducer<any, any>>>
}

const dafaultValue: RepoContextValueType = {
    state: {
        loading: false,
        checkedRepo: []
    },
    dispatch: () => { }
}

export const RepoContext = React.createContext(dafaultValue);

type ActionType = { type: 'LOADING' }
    | { type: 'LOADSUCCESS', payload: RepoData[] }
    | { type: 'LOADFAILURE', payload: string }
    | { type: 'SELECTREPO', payload: number }
    | { type: 'UNSELECTREPO', payload: number }
    ;

const reducer = (state: RepoContextStateType, action: ActionType): RepoContextStateType => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "LOADSUCCESS":
            return { ...state, loading: false, repoList: action.payload };
        case "LOADFAILURE":
            return { ...state, loading: false, error: action.payload };
        case "SELECTREPO":
            return { ...state, checkedRepo: state.checkedRepo ? state.checkedRepo.concat([action.payload]) : [action.payload] };
        case "UNSELECTREPO":
            const newCheckedRepo = state.checkedRepo ? state.checkedRepo : [];
            const index = newCheckedRepo.indexOf(action.payload);
            if (index > -1) {
                newCheckedRepo.splice(index, 1);
            };
            return { ...state, checkedRepo: newCheckedRepo };
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