
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesPage from './RoutesPage';


function App() {
  return (
    <div className="px-[5%]">
      <ToastContainer/>
     <RoutesPage/>
    </div>
  );
}

export default App;
