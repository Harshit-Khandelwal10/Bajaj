import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error('Invalid input: JSON must have a "data" key.');

      const result = await fetch('/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });

      const data = await result.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input.');
      setResponse(null);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((opt) => opt !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{JSON.stringify(response.numbers)}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{JSON.stringify(response.alphabets)}</p>
          </div>
        )}
        {selectedOptions.includes('Highest Lowercase Alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{JSON.stringify(response.highest_lowercase_alphabet)}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here...'
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <label>
            <input
              type='checkbox'
              value='Numbers'
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type='checkbox'
              value='Alphabets'
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type='checkbox'
              value='Highest Lowercase Alphabet'
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
