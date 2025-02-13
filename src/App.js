// Para fazer o build do projeto é necessário rodar o comando "npm run build" na pasta raiz do projeto
// Depois instalamos a biblioteca netlify com o comando "npm install netlify-cli -g"
// E por fim rodamos o comando "netlify deploy" e seguimos as instruções para fazer o deploy do projeto
// Para fazer o deploy em produção rodamos o comando "netlify deploy --prod"

import RoutesApp from "./routes"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

function App() {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide} />
      <RoutesApp />
    </div>
  );
}

export default App;
