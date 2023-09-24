import Layout from './components/Layout/Layout';
import Router from './routes/routes';
import 'moment/locale/pt-br';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-phone-input-2/lib/style.css';
import './App.css';

function App() {
  return (
    <Layout>
      <Router/>
    </Layout>
  );
}

export default App;
