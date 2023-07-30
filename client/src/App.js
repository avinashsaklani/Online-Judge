import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [code, setCode] = useState('');

  // console.log(code);
  const [output, setOutput] = useState('');
  let ExpectedOutput = "0123456789";



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
      setOutput("Error! Please re-check");
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
        <textarea className="textarea" placeholder='Write your code here...' id="" cols="80" rows="20" value={code} onChange={(e) => { setCode(e.target.value); }}></textarea>
        <button onClick={handleSubmit}>Run</button>
        {output &&
          <span className="verdict">
            <br />
            {ExpectedOutput === output.toString().split("\r\n")[0] ? "Success! All test cases Passed." : "Failed Test Cases!"}
          </span>
        }
        <div className='verdict-container'>
          <div className='output-div'>
            {output &&
              <div className="outputBox">
                <h3> {'Your Output : '}</h3>
                <br />
                <p>{'> '}{output}</p>
              </div>
            }
            {output &&
              <div className="outputBox">
                <h3> {'Expected Output : '}</h3>
                <br />
                <p>{'> '}{ExpectedOutput}</p>
              </div>
            }
          </div>

        </div>
      </div >
    </>
  );
}

export default App;
