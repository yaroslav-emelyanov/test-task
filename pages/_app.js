import 'bootstrap/dist/css/bootstrap.min.css';
import StoreState from '../store/storeState';
import fetcher from '../helpers/fetcher';
import useSWR from 'swr';

const App = ({ Component, pageProps }) => {
    return (
        <StoreState>
            <Component {...pageProps}/>
        </StoreState>
    )
};

export default App;

