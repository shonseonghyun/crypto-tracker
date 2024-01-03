import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './style/GlobalStyle';
import {ReactQueryDevtools} from 'react-query/devtools';
import {darkTheme,lightTheme} from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {
  // const [isDark,setIsDark] = useState(false);
  // const changeMode= ()=>{
  //   setIsDark(!isDark);
  // }

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}> 
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true }/>
      </ThemeProvider>
    </>
  );
}

export default App;