import React, { useState } from 'react';
import axios from 'axios';

const Diabetes = () => {
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = e.target;

        // Create features array in the correct order
        const features = [
            1,
            parseFloat(formData.age.value),
            parseFloat(formData.urea.value),
            parseFloat(formData.cr.value),
            parseFloat(formData.haemoglobin.value),
            parseFloat(formData.cholesterol.value),
            parseFloat(formData.triglyceride.value),
            parseFloat(formData.hdl.value),
            parseFloat(formData.ldl.value),
            parseFloat(formData.vldl.value),
            parseFloat(formData.bmi.value)
        ];

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('http://localhost:5000/api/predict/diabetes', {
                features: features
            });

            setPrediction(response.data.prediction);
            console.log(response);
        } catch (err) {
            setError('Error getting prediction. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center flex-col items-start w-full max-w-[600px] p-5">
            <h2 className="text-4xl text-blue-800 font-bold mb-5">Diabetes Diagnosis</h2>
            <form onSubmit={handleSubmit} className="flex font-semibold text-md flex-col gap-4 w-full">
                <label className="mb-3">
                    Age:
                </label>
                    <input type="number" name="age" className="p-2 border border-gray-300 rounded" required />
                <label className="mb-3">
                    Urea (mg/dL):
                </label>
                    <input type="text" name="urea" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Creatinine ratio (umol/L):
                </label>
                    <input type="number" name="cr" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Haemoglobin (mmol/L):
                </label>
                    <input type="text" name="haemoglobin" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Cholesterol (mmol/L):
                </label>
                    <input type="text" name="cholesterol" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Triglyceride (mmol/L):
                </label>
                    <input type="text" name="triglyceride" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    High density lipoprotein (mmol/L):
                </label>
                    <input type="text" name="hdl" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Low density lipoprotein (mmol/L):
                </label>
                    <input type="text" name="ldl" className="p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Very low density lipoprotein (mmol/L):
                </label>
                    <input type="text" name="vldl" className=" p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    BMI:
                </label>
                    <input type="text" name="bmi" className="p-2 border border-gray-300 rounded" />
                <button type="submit" className="p-2 bg-green-500 text-white rounded mt-3 hover:bg-green-600">
                    Diagnose
                </button>
            </form>
            {loading && <div className="mt-4 p-2 bg-yellow-100 text-yellow-700 rounded">Loading...</div>}
            
            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {prediction !== null && (
                <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
                    Prediction Result: {prediction}
                </div>
            )}
        </div>
    )
}

export default Diabetes
