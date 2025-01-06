import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Componenets/Store';
import WeatherApp from './Componenets/WeatherApp';

function App() {
  return (
    <div >
      <Provider store={Store}>
          <WeatherApp/>
      </Provider>
     
    </div>
  );
}

export default App;
