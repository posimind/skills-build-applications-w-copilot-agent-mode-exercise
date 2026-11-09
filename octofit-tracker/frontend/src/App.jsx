import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'

const sections = [
  { path: '/activities', label: '활동' },
  { path: '/teams', label: '팀' },
  { path: '/leaderboard', label: '리더보드' },
  { path: '/workouts', label: '운동 추천' },
]

function Home() {
  return (
    <section className="py-5 border-top">
      <p className="small fw-semibold text-uppercase text-success mb-2">
        Move together
      </p>
      <h1 className="display-5 fw-semibold mb-3">
        움직임을 기록하고,
        <br />
        함께 성장하세요.
      </h1>
      <p className="text-secondary mb-4">
        OctoFit Tracker에서 활동과 팀의 진행 상황을 확인하세요.
      </p>
      <a className="btn btn-dark btn-sm" href="/api/health">
        API 상태 확인
      </a>
    </section>
  )
}

function SectionPage({ title }) {
  return (
    <section className="py-5 border-top">
      <p className="small fw-semibold text-uppercase text-success mb-2">
        OctoFit Tracker
      </p>
      <h1 className="display-5 fw-semibold mb-3">{title}</h1>
      <p className="text-secondary">이 화면은 다음 기능을 연결할 준비가 되어 있습니다.</p>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100">
        <header className="bg-white border-bottom">
          <div className="container d-flex align-items-center gap-3 py-3">
            <img src={logo} width="48" height="48" alt="OctoFit" />
            <div>
              <p className="fw-semibold mb-0">OctoFit Tracker</p>
              <p className="small text-secondary mb-0">활동 · 팀 · 목표</p>
            </div>
            <span className="badge text-bg-light border ms-auto">API :8000</span>
          </div>
        </header>
        <main className="container">
          <nav aria-label="주요 메뉴" className="nav gap-3 border-bottom">
            <NavLink className="app-nav-link" end to="/">
              개요
            </NavLink>
            {sections.map((section) => (
              <NavLink
                className="app-nav-link"
                key={section.path}
                to={section.path}
              >
                {section.label}
              </NavLink>
            ))}
          </nav>
          <Routes>
            <Route element={<Home />} path="/" />
            {sections.map((section) => (
              <Route
                element={<SectionPage title={section.label} />}
                key={section.path}
                path={section.path}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
