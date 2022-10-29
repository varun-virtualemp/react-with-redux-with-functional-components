import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Loader } from './components';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<Loader blocking={true} />}>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)