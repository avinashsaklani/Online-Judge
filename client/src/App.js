import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [code, setCode] = useState('');
  // console.log(code);
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code
    }

    try {
      const { data } = await axios.post('http://localhost:8000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Online Judge</h1>
        <select className="select-box" >
          <option value="cpp">C++</option>
        </select>
        <textarea className="textarea" id="" cols="80" rows="20" value={code} onChange={(e) => { setCode(e.target.value); }}></textarea>
        <button onClick={handleSubmit}>Run</button>
        {output &&
          <div className="outputBox">
            <p>{output}</p>
          </div>
        }
      </div >
    </>
  );
}

export default App;
