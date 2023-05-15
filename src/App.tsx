import './App.css'
import Header from './components/header/Header'
import User from './User'
function App() {

  return (
    <div className='App'>
      <Header />
      <div className='main-content'>
        <User />
      </div>
    </div>
  )
}

export default App
