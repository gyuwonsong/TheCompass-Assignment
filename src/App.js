import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import "./index.css";

/*
1. App 컴포넌트

- 전체 애플리케이션을 감싸고, 라우팅을 관리
*/

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
            </Routes>
        </Router>
    );
}

export default App;