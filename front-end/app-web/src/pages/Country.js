import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


export default function Country() {
    const {id} = useParams();

    const [country, setCountry] = useState({});

    const navigate = useNavigate();
    const deleteCountry = async () => {
        await fetch(`http://localhost:4000/delete-country/`+ id, {
            method: "DELETE",
        }).then(async (data) => {
            const response = await data.json();
            if (response.success) {
                navigate("/");
            }
        });
        
    }

    useEffect(()=> {
        const getCountry = async () => {
            const response = await fetch(`http://localhost:4000/get-country/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Only parse the response as JSON if there's content
            if (response.status !== 204) {
                const data = await response.json();
                setCountry(data);
            }
        }
        getCountry();
    }, [id]);
    return (
        <div className="flex flex-col pt-8 gap-6">
            <img src={`http://localhost:4000${country.image}`} className="w-full h-48 object-cover rounded-xl" alt='no pic added'/>            
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">{country.name}</h1>
                <div className="flex gap-2">
                    <button onClick={deleteCountry} className="bg-red-500 py-2 px-4 text-white rounded-xl">Delete</button>
                    <Link to={'/update-country/'+ country.id} className="bg-blue-500 py-2 px-4 text-white rounded-xl">Edit</Link>

                </div>  
            </div>
         
            <p>{country.description}</p>
        </div>
    )
}