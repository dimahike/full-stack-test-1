import { BrowserRouter, Link, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/" component={HomePage} />
        </main>
        <footer>footer</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
