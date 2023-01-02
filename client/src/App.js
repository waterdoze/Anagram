import './css/App.css';
import Anagram from './components/Anagram';

function App() {
    const sampleLetters = 'tester'

  return (
    <div className="App">
        <Anagram letterString={sampleLetters} />
    </div>
  );
}

export default App;
