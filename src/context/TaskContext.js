import { createContext } from "react";

export const TaskContext = createContext({
    editModeHandler: ()=>{},
    completeHandler : ()=>{},
    deleteHandler : ()=>{},
})

