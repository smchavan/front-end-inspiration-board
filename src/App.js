import logo from './logo.svg';
import './App.css';
import Card from './components/cards/Card'
import NewCard from './components/cards/NewCard'
import CardList from './components/cards/CardList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
        
        
        <Card/>
        <NewCard/>
        
      </header>
    </div>
  );
}

export default App;
