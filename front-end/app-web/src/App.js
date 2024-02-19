import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import AddCountry from './pages/AddCountry';
import Country from './pages/Country';
import UpdateCountry from './pages/UpdateCountry';


function App() {
  return (
    <main className="px-24 py-8">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-country" element={<AddCountry />} />
        <Route path="/country/:id" element={<Country />} />
        <Route path="/update-country/:id" element={<UpdateCountry />} />
      </Routes>
    </main>
  );
}

export default App;
