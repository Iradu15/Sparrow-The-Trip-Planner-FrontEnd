import './App.css';
import PinPointStatic from './map/PinPointStatic';
import PipPointDynamic from './map/PinPointDynamic';

function App() {
  return (
    <div>
      <PinPointStatic attraction_name="Valea Budului"></PinPointStatic>
      <PipPointDynamic></PipPointDynamic>
    </div>
  );
}

export default App;
