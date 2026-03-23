import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UploadPage from './components/UploadPage';
import InterviewPage from './components/InterviewPage';
import ExportPage from './components/ExportPage';
import ContactPage from './components/ContactPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/ENSF-400-Project">
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
