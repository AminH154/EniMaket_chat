import React, { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const storeContext = createContext();

const StoreProviderContext = (props) => {
   
    const ContextValue = {
        //function
    };

    return (
        <storeContext.Provider value={ContextValue}>
            {props.children}
        </storeContext.Provider>
    );
};

export default StoreProviderContext;	