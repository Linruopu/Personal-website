import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { Notes } from './pages/Notes'
import { NoteDetail } from './pages/NoteDetail'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { About } from './pages/About'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}
