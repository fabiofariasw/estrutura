import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import { Routes } from './routes/routes';
import { PageProvider } from './contexts/pageContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <PageProvider>
          <Routes />
        </PageProvider>
      </BrowserRouter>
      <GlobalStyle />
    </>
  )
}

export default App;
