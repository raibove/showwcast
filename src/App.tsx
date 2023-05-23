import './App.css'
import Header from './components/header/Header'
import User from './User'
import { useRoutes } from 'react-router-dom';
import Company from './Company';

const Layout = ({ routes }: any) => {
  return (
    <div className='App'>
      <Header />
      {routes}
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div>
      <h2>Error: Page Not Found</h2>
      <p>Lost into Darkness, see how others take the spotlight.</p>
    </div>
  );
};


function App() {

  const routes = useRoutes([
    {
      path: '/',
      element: <Company />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '/company',
      element: <Company />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);

  return <Layout routes={routes} />;
}

export default App
