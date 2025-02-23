import React, { useState } from 'react';
import axios from 'axios';

const CancerDetection = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            setMessage('');
            const response = await axios.post('http://localhost:5000/api/predict/cancer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data?.prediction);
        } catch (error) {
            setMessage('Error uploading image. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="border flex flex-col items-center justify-center h-[calc(100vh-128px)] bg-gray-100 w-full max-w-[600px] rounded">
            <h1 className="text-3xl font-bold mb-5 text-blue-800">Lung and colon Cancer Detection</h1>
            <form onSubmit={handleSubmit} className="my-3 flex flex-col items-center">
                <input type="file" onChange={handleFileChange} className="mb-3 p-5 border rounded-lg border-gray-500" />
                <button type="submit" disabled={loading} className="px-4 py-2 my-3 w-full bg-blue-500 text-white rounded">Submit</button>
            </form>
            {message && <p className="mt-5 text-lg text-red-500">{message} detected</p>}
        </div>
    );
};

export default CancerDetection;