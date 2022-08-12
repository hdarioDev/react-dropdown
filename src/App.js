import SearchProvider from './context/SearchContext'
import DropDown from './components/DropDown';
function App() {

  return (
    <div className="App">
      <section className="App-container">
        <SearchProvider>
          <DropDown />
        </SearchProvider>
      </section>
    </div>
  );
}

export default App;
