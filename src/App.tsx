import './App.css'
import Header from './components/header/Header'
import User from './User'
import { useRoutes } from 'react-router-dom';

const Layout = ({ routes }: any) => {
  return (
    <div className='App'>
      <Header />
      {routes}
    </div>
  );
};

function App() {

  const routes = useRoutes([
    {
      path: '/',
      element: <User />
    },
    {
      path: '/user',
      element: <User />
    }
  ]);

  return <Layout routes={routes} />;
}

export default App
