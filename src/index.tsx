import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import {theme} from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </div>
);

// react-router-dom v5 react-router-dom v5 버전 사용시URL 은 변하는데 렌더링이 안되는 이슈가 있습니다. 이 문제를 겪으시는 분은
// 1. index..tsx 에서 렌더 내부의 React.StrictMode 를 div 로 바꾸거나
// 2. react-router-dom v6
// 을 사용하시면 됩니다.
