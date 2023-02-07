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
      </header>  
      <body> 
        <Card/>
        <NewCard/>
      </body> 
      <footer>
        <p4>Made by Anna, Larissa, Melody, Supriya </p4>
      </footer>
    </div>
  );
}

export default App;
