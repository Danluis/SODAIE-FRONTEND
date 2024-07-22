import RoutesApp from '../routes/routes';
import { AudioPlayer } from '../components/MediaPlayer/AudioPlayer';
const App = () => {
  return (
    <div>
      <AudioPlayer />
      <RoutesApp/>
    </div>
  );
};

export default App;
