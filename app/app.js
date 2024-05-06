import React, {Suspense, useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';

const App = (props) => {

    return (<div style={{color: "000", fontSize: 18}}>
        App....
    </div>)
};



console.log("app.js");
const reactAppElement = document.getElementById('react_app');
const root = createRoot(reactAppElement);
root.render(<App />);