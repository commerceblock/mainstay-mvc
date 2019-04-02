import { createBrowserHistory } from 'history'

import { routes } from './routes';

const history = createBrowserHistory({
    basename: routes.home,
});

export default history;
