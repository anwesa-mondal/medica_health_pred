import React, { useState } from 'react';
import axios from 'axios';

const Cardio = () => {
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = e.target;

        // Create features array in the correct order
        const features = [
            parseFloat(formData.gender.value),
            parseFloat(formData.age.value),
            parseFloat(formData.currentSmoker.value),
            parseFloat(formData.cigarettesPerDay.value),
            parseFloat(formData.BPMeds.value),
            parseFloat(formData.prevalentStroke.value),
            parseFloat(formData.prevalentHypertension.value),
            parseFloat(formData.diabetes.value),
            parseFloat(formData.totalCholesterol.value),
            parseFloat(formData.systolicBP.value),
            parseFloat(formData.diastolicBP.value),
            parseFloat(formData.bmi.value),
            parseFloat(formData.heartRate.value)
        ];

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('http://localhost:5000/api/predict/cardio', {
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
        <div className="flex flex-col items-center justify-center gap-4 p-5 w-full max-w-[600px]">
            <h2 className="text-2xl font-bold mb-5">Cardiovascular diagnosis Data Form</h2>
            <form onSubmit={handleSubmit} className="flex font-semibold flex-col justify-center gap-4 w-full">
                <label className="mb-3">
                    Gender:
                    <div className="ml-2">
                        <label>
                            <input type="radio" name="gender" value="1" className="mr-1" required /> Male
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="gender" value="0" className="mr-1" required /> Female
                        </label>
                    </div>
                </label>
                <label className="mb-3">
                    Age:
                </label>
                    <input type="number" name="age" className="ml-2 p-2 border border-gray-300 rounded" required />
                <label className="mb-3">
                    Current smoker:
                    <div className="mt-3 ml-2">
                        <label>
                            <input type="radio" name="currentSmoker" value="1" className="mr-1" required /> Yes
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="currentSmoker" value="0" className="mr-1" required /> No
                        </label>
                    </div>
                </label>
                <label className="mb-3">
                    Cigarettes per day:
                </label>
                    <input type="number" name="cigarettesPerDay" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    BPMeds:
                </label>
                    <div className="">
                        <label>
                            <input type="radio" name="BPMeds" value="1" className="mr-1" required /> Yes
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="BPMeds" value="0" className="mr-1" required /> No
                        </label>
                    </div>
                <label className="mb-3">
                    Prevalent Stroke:
                    <div className="ml-2">
                        <label>
                            <input type="radio" name="prevalentStroke" value="1" className="mr-1" required /> Yes
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="prevalentStroke" value="0" className="mr-1" required /> No
                        </label>
                    </div>
                </label>
                <label className="mb-3">
                    Prevalent Hypertension:
                    <div className="ml-2">
                        <label>
                            <input type="radio" name="prevalentHypertension" value="1" className="mr-1" required /> Yes
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="prevalentHypertension" value="0" className="mr-1" required /> No
                        </label>
                    </div>
                </label>
                <label className="mb-3">
                    Diabetes:
                    <div className="ml-2">
                        <label>
                            <input type="radio" name="diabetes" value="1" className="mr-1" required /> Yes
                        </label>
                        <label className="ml-2">
                            <input type="radio" name="diabetes" value="0" className="mr-1" required /> No
                        </label>
                    </div>
                </label>
                <label className="mb-3">
                    Total cholesterol:
                </label>
                    <input type="text" name="totalCholesterol" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Systolic blood pressure:
                </label>
                    <input type="text" name="systolicBP" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Diastolic blood pressure:
                </label>
                    <input type="text" name="diastolicBP" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    BMI:
                </label>
                    <input type="text" name="bmi" className="ml-2 p-2 border border-gray-300 rounded" />
                <label className="mb-3">
                    Heart rate:
                </label>
                    <input type="text" name="heartRate" className="ml-2 p-2 border border-gray-300 rounded" />
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

export default Cardio
