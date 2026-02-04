
import './App.css'
import Header from './header'
import Helpline from './helpline'
import Cards from './cards'
import CardsInfo from './CardsInfo'

function App() {
  
  return (
    <>
      <Header/>
      <h1 id="victim-list">Advocate List</h1>
      <div id="selection-page">
        <CardsInfo/>
      </div>
      <Helpline/>
    </>
  )
}

export default App
