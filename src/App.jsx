import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Writing from "./pages/Writing";
import Article from "./pages/Article";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import JobSearch from "./pages/JobSearch";
import AgentSkills from "./pages/AgentSkills";
import AiPrompting from "./pages/AiPrompting";
import InnerCircle from "./pages/InnerCircle";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Article />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects/job-search" element={<JobSearch />} />
          <Route path="/projects/agent-skills" element={<AgentSkills />} />
          <Route path="/ai-prompting" element={<AiPrompting />} />
          <Route path="/inner-circle" element={<InnerCircle />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
