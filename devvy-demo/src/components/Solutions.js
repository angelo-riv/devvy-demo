import React, {useState} from 'react';

const Solutions = () => {
  const solution1 = `const solution = (requirements) => { // Clean implementation using modern ES6... }`;
  const solution2 = `interface DashboardProps { requirements: string[]; } // Full TypeScript...`;
  const solution3 = `const useTheme = () => { const [theme, setTheme] = useState('dark')... }`;
  const [showSolutions, setShowSolutions] = useState(true);
  const [solutionTitle, setSolutionTitle] = useState("");
  const [name,setName] = useState("")
  const [selectedSolution,setSelectedSolution] = useState("n/a");
  const [solutionComment, setSolutionComment] = useState("");

  const handleSubmit = () => {
    if (name === ""){
      setName("Anonymous")
    }
    console.log("Title:",solutionTitle)
    console.log("Name:",name)
    console.log("selectedSolution:",selectedSolution)
    console.log("solutionComment:",solutionComment)
    setSolutionTitle("");
    setName("");
    setSelectedSolution("n/a");
    setSolutionComment("n/a");
    setShowSolutions(true);
  }

  const handleShare = () => {
    setShowSolutions(false);
  }

  const handleClose = () => {
    setShowSolutions(true);
  }

  return (
    <div className="editor-container">
      <div className="editor-content">
        <div className="solutions-header">
          <h3>Discussion</h3>
          <p className="text-muted">Community solutions and comments for this problem</p>
        </div>
        {showSolutions && (
        <div className = "show-solutions">
        <div className="solutions-list">
          <div className="solution-item">
            <div className="solution-meta">
              <span className="solution-author">@anonymous</span>
              <span className="solution-lang">JavaScript</span>
              <span className="solution-stats">👍 45 💬 12</span>
            </div>
            <div className="solution-title">Efficient O(n) solution using HashMap approach</div>
            <div className="solution-preview">{solution1}</div>
          </div>
        <div className="solution-item">
          <div className="solution-meta">
            <span className="solution-author">@anonymous</span>
            <span className="solution-lang">TypeScript</span>
            <span className="solution-stats">👍 32 💬 8</span>
          </div>
          <div className="solution-title">Type-safe dashboard with comprehensive error handling</div>
          <div className="solution-preview">{solution2}</div>
        </div>

        <div className="solution-item">
          <div className="solution-meta">
            <span className="solution-author">@anonymous</span>
            <span className="solution-lang">JavaScript</span>
            <span className="solution-stats">👍 28 💬 15</span>
          </div>
          <div className="solution-title">React hooks-based solution with custom theme system</div>
          <div className="solution-preview">{solution3}</div>
        </div>
      
        </div>

        <div className="solutions-actions">
          <button className="btn-outline">Load More Solutions</button>
          <button className="btn-primary" onClick={handleShare}>Share Your Solution</button>
        </div>
        </div>
        )}
        {!showSolutions && (
          <div className = "solutions-create">
           <div className = "solutions-create-title">
              <h4>Solution Title</h4>
              <input required value={solutionTitle} onChange={(e) => setSolutionTitle(e.target.value)}/>
           </div>
           <div className = "solutions-create-name">
              <h4>Name</h4>
              <input value={name} onChange={(e) => setName(e.target.value)}/>
           </div>
           <div className = "solutions-create-choose">
              <h4>Choose Solution</h4>
              <select className = "solution-select" onChange={(e) => setSelectedSolution(e.target.value)} value={selectedSolution}>
                <option value="n/a">Don't Post Solution</option>
                <option value="s1">Solution 1</option>
                <option value="s2">Solution 2</option>
              </select>
           </div>
           <div className = "solutions-create-comment">
              <h4>Add Comment</h4>
              <textarea onChange={(e) => setSolutionComment(e.target.value)} className="comment-textarea" rows="4" placeholder="Write your thoughts here..." />
           </div>
           <div className="solutions-create-bottom">
            <p>Comments will be reviewed before posted</p>
            <div className="solutions-actions">
              <button className="btn-outline" onClick={handleClose}>Cancel Comment</button>
              <button className="btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solutions;
