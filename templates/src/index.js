import { createRoot } from 'react-dom/client';
import { observer } from 'mobx-react-lite';
import store from './store';
import './styles.css';

const App = observer(({ store }) => {
  return (
    <div className="app">
      <h1>Welcome to Fastp React</h1>
      <div className="counter">
        <button onClick={() => store.decrement()}>-</button>
        <span>{store.count}</span>
        <button onClick={() => store.increment()}>+</button>
      </div>
    </div>
  );
});
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App store={store} />);


export default App;