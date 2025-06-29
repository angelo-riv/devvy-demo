import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import FileExplorer from '../components/FileExplorer';
import Solutions from '../components/Solutions';
import Submissions from '../components/Submissions';

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('result');
  const [activeSection, setActiveSection] = useState('code');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [problemData, setProblemData] = useState([]);
  const [result,setResult] = useState([]);
  const [explorerData, setExplorerData] = useState({ files: [], folders: [] });
  const [filesContent, setFilesContent] = useState({});
  const question_id = 51; 
  const root_folder = question_id;
  const [currentFile, setCurrentFile] = useState('');
  
  useEffect(() => {
  async function fetchExplorer() {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/problem-code/${root_folder}`, {
      method: 'POST'
    });
    const data = await res.json();  
    setExplorerData(data);
    // Fetch and populate all file contents immediately
    const fileContents = {};
    for (const fileUrl of data.files) {
      const fileName = fileUrl.split('/').pop().split('?')[0];
      const response = await fetch(fileUrl);
      const text = await response.text();
      fileContents[fileName] = text;
    }
    
    setFilesContent(fileContents);

    // Optionally set the first file as the current file
    if (data.files.length > 0) {
      setCurrentFile("README.md");
    }
  }

  fetchExplorer();
}, []);

  const handleFileClick = async (fileUrl) => {
    const fileName = fileUrl.split('/').pop().split('?')[0];

    if (filesContent[fileName]) {
      setCurrentFile(fileName); // Already in state, just set current file
      return;
    }

    const res = await fetch(fileUrl);
    const text = await res.text();

    setFilesContent((prev) => ({
      ...prev,
      [fileName]: text
    }));

    setCurrentFile(fileName);
  };

  useEffect(() => {
    const handleNavClick = (e) => {
      const target = e.target;
      if (target.classList.contains('nav-tab')) {
        const tabText = target.textContent?.toLowerCase();
        if (tabText === 'solutions') {
          setActiveSection('solutions');
        } else if (tabText === 'submissions') {
          setActiveSection('submissions');
        } else if (tabText === 'code') {
          setActiveSection('code');
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  useEffect(() => {
    const getProblemData = async () => {
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getProblemDescription/${question_id}`);
        setProblemData(response.data);
      } catch(error){
        console.error("Error fetching problem data:", error);
      }
    };
    getProblemData();
  }, [question_id]);


//Test
const username = "testUser";

const handleSubmit = async () => {
  const zip = new JSZip();


  // Add the code to the ZIP file as main.py
  for (const [filename, content] of Object.entries(filesContent)) {
    zip.file(filename, content);
  }

  // Generate the zip blob
  const zipBlob = await zip.generateAsync({ type: "blob" });
  // Prepare form data for the backend
  const formData = new FormData();
  formData.append("code", new File([zipBlob], "code.zip")); // name matches FastAPI's `code: UploadFile`
  formData.append("username", username);
  formData.append("question_id", parseInt(question_id, 10));

  // Send to backend
  try{

  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/submit`, {
    method: "POST",
    body: formData,
  });



  const result = await res.json();
    setResult(result);
    setActiveTab("result")
    } catch (error) {
      console.error("Submission Error")
    }
  };

const highlightBacktickWords = (text, className = "code-highlight") => {
    const regex = /`([^`]+)`/g; // matches anything inside backticks
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, word] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }

      parts.push(<span key={start} className={className}>{word}</span>);

      lastIndex = start + fullMatch.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
};

  return (
  <div className="probleminfo-page">

    <div className="probleminfo-body" style={{ display: 'flex'}}>
      {/* Left: Problem Description */}
      <div className="probleminfo-container" style={{ width: '50%', overflowY: 'auto', padding: '1rem' }}>
        <div className="probleminfo-header">
          <h2 className="probleminfo-title">{problemData.question_id}. {problemData.question}</h2>
          <div className="problem-meta">
            <span className={`difficulty-badge ${problemData.diff}`}>{problemData.diff}</span>
            {problemData.tags?.map((tag, index) => (
              <span key={index} className="topic-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="probleminfo-content">
          <p className="probleminfo-description">
            {highlightBacktickWords(problemData.description || '')} Read more in the <span className = "code-highlight">README.md</span> file.
          </p>
        </div>
      </div>

      {/* Right: File Explorer + Code Editor */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flex: 1 }}>
          <FileExplorer currentFile={currentFile} files={explorerData.files} folders={explorerData.folders} onFileClick={handleFileClick} activeSection={activeSection}setActiveSection={setActiveSection}/>
          <div style={{ flex: 1, marginRight: '0.6rem', marginTop: '0.6rem' }}>
            <div className="editor-container">
              <div className="editor-content">
                {activeSection === 'solutions' && <Solutions />}
                {activeSection === 'submissions' && <Submissions />}
                {activeSection === 'code' && (
                  <>
                    <div className="code-area">
                      <div className="code-header">
                        <div className="code-lang-section">
                          <span className="language-label">Language:</span>
                          <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="language-selector"
                          >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="go">Go</option>
                            <option value="rust">Rust</option>
                          </select>
                        </div>
                        <div className = "file-title">
                          Current File: <span>{currentFile}</span>
                        </div>
                      </div>
                      <textarea
                        onChange={(e) =>
                          setFilesContent((prev) => ({
                            ...prev,
                            [currentFile]: e.target.value,
                          }))
                        }
                        value={filesContent[currentFile] || ''}
                        className="code-textarea"
                        />
                    </div>

                    <div className="editor-footer">
                      <div className="editor-tabs">
                        <button className={`editor-tab ${activeTab === 'result' ? 'lactive' : ''}`} onClick={() => setActiveTab('result')}>
                          Test Result
                        </button>
                        <button className={`editor-tab ${activeTab === 'result' ? 'lactive' : ''}`} onClick={() => setCurrentFile('test.js')}>
                          View Test Cases
                        </button>
                      </div>

                      <div className="test-content">
                        {activeTab === 'testcase' && (
                          <div className="testcase-section">
                            <div className="testcase-header">
                              <span>Case 1</span>
                              <span>Case 2</span>
                              <button className="add-case">+</button>
                            </div>
                          </div>
                        )}
                        {activeTab === 'result' && (
                          <div className="result-section">
                            {!result.hasError && (
                              <>
                              <div className="result-status failed">
                              <span>{result.error}</span>
                            </div>
                            <div className="result-details">
                              {result.total_cases ? (<p>Test Cases Passed: {result.passed_cases} of {result.total_cases}</p>) : (<p>Test Cases Passed:</p>)}
                            </div>
                            </>
                            )}
                            {result.hasError && (
                              <>
                              <div className="result-status success">
                              <span>{result.error ?? "All test cases Passed!"}</span>
                            </div>
                            <div className="result-details">
                              {result.total_cases ? (<p>Test Cases Passed: {result.passed_cases} of {result.total_cases}</p>) : (<p>Test Cases Passed:</p>)}
                              <p>Runtime: 45ms</p>
                              <p>Memory: 2.1MB</p>
                            </div>
                            </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="editor-actions">
                        <button className="btn-primary" onClick = {()=> handleSubmit()}>Submit</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default CodeEditor;
