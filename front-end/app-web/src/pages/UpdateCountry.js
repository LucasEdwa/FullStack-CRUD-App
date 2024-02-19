import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function UpdateCountry() {
    const {id} = useParams();
    const [country, setCountry] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    
    });

    const updateCountry = async () => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('image', formData.image);
    
        await fetch("http://localhost:4000/update-country/" + id, {
            method: "PATCH",
            body: data
        }).then(async (data) => {
            const response = await data.json();
            if (response.success) {
                navigate("/country/" + id);
            }
         
        });
    }
    const handleFormChange = (e) => {
        if (e.target.name === 'image') {
            setFormData((prevFormData)=> ({
                ...prevFormData, 
                [e.target.name]: e.target.files[0]
            }));
        } else {
            setFormData((prevFormData)=> ({
                ...prevFormData, 
                [e.target.name]: e.target.value
            }));
        }
    };
    useEffect(() => {
        const getCountry = async () => {
            const response = await fetch("http://localhost:4000/get-country/" + id)
           .then((data) => data.json());
            setCountry(response);
        }
        getCountry();
    }, []);

    return (
        <div className=" flex flex-col gap-4 pt-8">
            <h2 className="text-xl">Re-write country :{country.name}</h2>
            <input name="name" value={country.name} onChange={handleFormChange} type="text" placeholder="Country name" className="border-2 border-gray-300 rounded-xl" />
            <input name="description" value={country.description} onChange={handleFormChange} type="text" placeholder="Description" className="border-2 border-gray-300 rounded-xl" />
            <input name="image" onChange={handleFormChange} type="file" placeholder="Image" className="border-2 border-gray-300 rounded-xl" />
            <button onClick={updateCountry} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl">
                Update Country</button>
        </div>
    )   

}
