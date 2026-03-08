import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen text-senior-xl font-bold text-gray-700">
                Elderly Check-In System
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
