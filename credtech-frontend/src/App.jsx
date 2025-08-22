import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Main App component
const App = () => {
    // State variables for company name and data
    const [searchQuery, setSearchQuery] = useState('Alpha Corp');
    const [companyName, setCompanyName] = useState('Alpha Corp');
    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // This useEffect hook will fetch data whenever the companyName state changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setCompanyData(null); // Clear previous data
            
            // -----------------------------------------------------------
            // 📍  This is the main section to replace.
            // 
            // In a real application, you would make a fetch call to your
            // back-end API here. The back-end would:
            // 1. Ingest data from various sources (SEC, news, GitHub).
            // 2. Run your scoring model.
            // 3. Generate the explainability insights (SHAP values, etc.).
            // 4. Return a JSON object with all the required data.
            //
            // Replace the mock data below with your actual API call:
            // Example: const response = await fetch(`/api/score?company=${companyName}`);
            // Example: const data = await response.json();
            // -----------------------------------------------------------

            setTimeout(() => {
                const mockData = {
                    name: companyName,
                    score: 750,
                    explanation: "The score is primarily influenced by stable revenue growth and a recent increase in open-source contributions to a key industry project. However, it was slightly lowered by a recent, minor legal filing.",
                    featureContributions: [
                        { feature: 'Revenue Growth', contribution: 'Positive' },
                        { feature: 'Open-Source Contributions', contribution: 'Strongly Positive' },
                        { feature: 'Legal Filings', contribution: 'Negative' },
                        { feature: 'Debt-to-Equity Ratio', contribution: 'Neutral' },
                    ],
                    history: [
                        { date: '2025-01-01', score: 720 },
                        { date: '2025-02-01', score: 715 },
                        { date: '2025-03-01', score: 730 },
                        { date: '2025-04-01', score: 725 },
                        { date: '2025-05-01', score: 740 },
                        { date: '2025-06-01', score: 750 },
                    ]
                };
                setCompanyData(mockData);
                setIsLoading(false);
            }, 2000);
        };

        fetchData();
    }, [companyName]); // Rerun the effect whenever companyName changes

    const handleSearchClick = () => {
        setCompanyName(searchQuery);
    };

    const renderDashboard = () => (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto my-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                Explainable Credit Intelligence Dashboard
            </h1>

            {/* Company Search Input */}
            <div className="mb-8 flex justify-center space-x-2">
                <input
                    type="text"
                    className="p-3 border border-gray-300 rounded-xl w-full max-w-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter company name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleSearchClick}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </div>
            
            {/* Main Scorecard */}
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-6xl font-black text-gray-900 mb-2">
                    {companyData.score}
                </div>
                <div className="text-xl font-medium text-gray-600">
                    Credit Score for <span className="text-indigo-600 font-bold">{companyData.name}</span>
                </div>
            </div>

            {/* Explanation Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Why this score?
                </h2>
                <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {companyData.explanation}
                    </p>
                </div>
            </div>

            {/* Feature Contributions Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Feature Contributions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {companyData.featureContributions.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
                            <span className="text-gray-700 font-medium">{item.feature}</span>
                            <span className={`font-semibold ${item.contribution.includes('Positive') ? 'text-green-600' : 'text-red-600'}`}>
                                {item.contribution}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Score History Chart */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Score History
                </h2>
                <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={companyData.history}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[600, 850]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#4f46e5" activeDot={{ r: 8 }} strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
            <div className="container mx-auto px-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="text-xl font-semibold">Loading data...</div>
                    </div>
                ) : (
                    companyData ? renderDashboard() : <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">Company not found.</div>
                )}
            </div>
        </div>
    );
};

export default App;
