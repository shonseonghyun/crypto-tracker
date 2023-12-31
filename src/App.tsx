import Router from './Router';
import { GlobalStyle } from './style/GlobalStyle';
import {ReactQueryDevtools} from 'react-query/devtools';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true }/>
    </>
  );
}

export default App;