import React, { useState } from 'react';

const TreeNode = ({ name, children, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = children && typeof children === 'object';

  return (
    <div className="tree-node" style={{ paddingLeft: `${level * 1}rem` }}>
      <div onClick={() => isFolder && setIsOpen(!isOpen)} className="tree-label">
        {isFolder ? (isOpen ? '📂' : '📁') : '📄'} {name}
      </div>
      {isOpen && isFolder && (
        Object.entries(children).map(([childName, childContent]) => (
          <TreeNode key={childName} name={childName} children={childContent} level={level + 1} />
        ))
      )}
    </div>
  );
};

const FileExplorer = ({ files = [], folders = [], currentFile, onFileClick, activeSection, setActiveSection }) => (
  <div className="file-explorer">
    <div className = "nav-content">
      <button className={`nav-tab${activeSection === 'code' ? ' active' : ''}`} onClick={() => setActiveSection('code')}>Code</button>
      <button className={`nav-tab${activeSection === 'solutions' ? ' active' : ''}`} onClick={() => setActiveSection('solutions')}>Discussion</button>
      <button className={`nav-tab${activeSection === 'submissions' ? ' active' : ''}`} onClick={() => setActiveSection('submissions')}>Submissions</button>
    </div>
    <h3 className="explorer-title">File Explorer</h3>
    <ul>
      {folders.map((folder) => (
        <li key={folder} className="folder">
          📁 {folder}
        </li>
      ))}
      {files
        .filter(fileUrl => {
          const fileName = fileUrl.split('/').pop().split('?')[0];
          return !fileName.toLowerCase().endsWith('dockerfile') && !fileName.toLowerCase().endsWith('package.json');
        })
        .map((fileUrl) => {
          const fileName = fileUrl.split('/').pop().split('?')[0];
          const isActive = fileName === currentFile;
          return (
            <li key={fileUrl} className={`file ${isActive ? 'active-file' : ''}`} onClick={() => onFileClick(fileUrl)}>
              📄 {fileName}
            </li>
          );
        })}
    </ul>
  </div>
);

export default FileExplorer;
