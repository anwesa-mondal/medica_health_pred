import React from 'react';

const Home = () => {
    const medicalData = {
        lastMeasured: {
            bloodPressure: '120/80 mmHg',
            heartRate: '72 bpm',
            bloodSugar: '90 mg/dL',
        },
        predictionHistory: [
            { date: '2023-10-01', prediction: 'Healthy' },
            { date: '2023-09-25', prediction: 'At Risk' },
            { date: '2023-09-18', prediction: 'Healthy' },
        ],
    };

    return (
        <div className="container mx-auto p-4 h-screen w-screen" style={{
            "background": "url('/homebg.jpg') no-repeat center center fixed",
            "backgroundSize": "cover"
        }}>
            <div className="bg-gray-100 w-48 mx-auto p-4 rounded-lg flex flex-col items-center mb-8">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p>Age: 30</p>
                <p>Gender: Male</p>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Last Measured Medical Data</h2>
                    <p>Blood Pressure: {medicalData.lastMeasured.bloodPressure}</p>
                    <p>Heart Rate: {medicalData.lastMeasured.heartRate}</p>
                    <p>Blood Sugar: {medicalData.lastMeasured.bloodSugar}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Medical Prediction History</h2>
                    <ul className="list-disc pl-5">
                        {medicalData.predictionHistory.map((entry, index) => (
                            <li key={index}>
                                {entry.date}: {entry.prediction}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
