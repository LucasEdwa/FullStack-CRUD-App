import { useState } from "react";

export default function AddCountry() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    });
    const [success, setSuccess] = useState(""); 
    const [error, setError] = useState("");
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
    const submitCountry = async () => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('image', formData.image);
    
        await fetch("http://localhost:4000/add-country", {
            method: "POST",
            body: data,
        })
        .then (async(response) => {
            const res = await response.json();
            if(res.success) {
                setSuccess(res.success);
            }
            if(!res.success) {
                setError(res.error);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className=" flex flex-col gap-4 pt-8">
            <h2 className="text-xl">Add new country</h2>
            {success ? 
                <p className="bg-green-500 p-3 rounded-xl">
                    {success}</p>:null
                    }
            {error ? 
                <p className="bg-red-500 p-3 rounded-xl">
                    {error}</p>:null }
            <input name="name" value={formData.name} onChange={handleFormChange} type="text" placeholder="Country name" className="border-2 border-gray-300 rounded-xl" />
            <input name="description" value={formData.description} onChange={handleFormChange} type="text" placeholder="Description" className="border-2 border-gray-300 rounded-xl" />
            <input name="image" onChange={handleFormChange} type="file" placeholder="ImageUrl" className="border-2 border-gray-300 rounded-xl" />            <button onClick={submitCountry} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl">Add</button>
        </div>
    );
}