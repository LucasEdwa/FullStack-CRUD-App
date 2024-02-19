import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
    const [countries, setCountries] = useState([]);
    useEffect(() =>{
        const getCountries = async () => {
            await fetch("http://localhost:4000/get-countries")
            .then(async (data) => {
                const response = await data.json();
                setCountries(response);
            }
            );
           
        }
        getCountries();

    }, []);

    return(<div className="grid grid-cols-4 gap-10 pt-8">
          {countries.map((country,index)=>(
              <div className="flex flex-col gap-4" key={index} >
<img src={`http://localhost:4000${country.image}`} className="w-full h-48 object-cover rounded-xl" alt='no pic added'/>                <h3 className="text-xl font-semibold">{country.name}</h3>
                <Link to={"/country/"+ country.id} className="bg-blue-500 text-center hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
                    View Country</Link>
                </div>

            ))};
            
        </div>)

}