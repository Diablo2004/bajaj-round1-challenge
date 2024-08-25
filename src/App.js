import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS for styling

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleJsonSubmit = async () => {
    try {
      // Validate JSON
      const parsedInput = JSON.parse(jsonInput);

      // Ensure input has the 'data' field
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error(
          "Invalid JSON format. Missing or invalid 'data' field."
        );
      }

      // Call the API
      const response = await axios.post(
        "http://localhost:5000/bfhl",
        parsedInput
      );

      // Set API response
      setApiResponse(response.data);
      setError("");
    } catch (err) {
      console.error("Error submitting JSON:", err);
      setError("Invalid JSON or API error");
      setApiResponse(null);
    }
  };

  const handleSelectChange = (e) => {
    const options = [...e.target.selectedOptions].map((option) => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;

    // Filter data based on selected options
    const filteredData = {
      alphabets: selectedOptions.includes("Alphabets")
        ? apiResponse.alphabets || []
        : null,
      numbers: selectedOptions.includes("Numbers")
        ? apiResponse.numbers || []
        : null,
      highest_lowercase_alphabet: selectedOptions.includes(
        "Highest lowercase alphabet"
      )
        ? apiResponse.highest_lowercase_alphabet || []
        : null,
    };

    return (
      <div className='response-display'>
        {selectedOptions.includes("Alphabets") && (
          <div className='response-section'>
            <h3>Alphabets</h3>
            <p>
              {filteredData.alphabets?.length > 0
                ? filteredData.alphabets.join(", ")
                : "No alphabets available"}
            </p>
          </div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div className='response-section'>
            <h3>Numbers</h3>
            <p>
              {filteredData.numbers?.length > 0
                ? filteredData.numbers.join(", ")
                : "No numbers available"}
            </p>
          </div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div className='response-section'>
            <h3>Highest Lowercase Alphabet</h3>
            <p>
              {filteredData.highest_lowercase_alphabet?.length > 0
                ? filteredData.highest_lowercase_alphabet.join(", ")
                : "No lowercase alphabets available"}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='App'>
      <h1>Bajaj Finserv Health Challenge</h1>
      <div className='input-container'>
        <input
          type='text'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here (e.g., {"data": ["A", "C", "z"]})'
          className='input-field'
        />
        <button onClick={handleJsonSubmit} className='submit-button'>
          Submit
        </button>
        {error && <p className='error-message'>{error}</p>}
      </div>
      {apiResponse && (
        <div className='dropdown-container'>
          <select
            multiple
            onChange={handleSelectChange}
            className='multi-select'
          >
            <option value='Alphabets'>Alphabets</option>
            <option value='Numbers'>Numbers</option>
            <option value='Highest lowercase alphabet'>
              Highest lowercase alphabet
            </option>
          </select>
        </div>
      )}
      <div className='response-container'>{renderResponse()}</div>
    </div>
  );
}

export default App;
