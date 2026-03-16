import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/exportFeedback" element={<ExportPage />} />
        <Route path="/contactUs" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
