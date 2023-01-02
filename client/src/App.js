import './css/App.css';
import Anagram from './components/Anagram';

function App() {
    const sampleLetters = 'planre'

  return (
    <div className="App">
        <Anagram letterString={sampleLetters} />
    </div>
  );
}

export default App;
