import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { LeftSidebar } from './LeftSidebar'

export function Layout() {
  return (
    <div className="min-h-screen bg-bg transition-colors">
      {/*
       * Desktop (lg+): fixed left sidebar — 280px wide, full height, never scrolls.
       * The main content area uses lg:ml-[280px] to sit beside it.
       *
       * Mobile (<lg): top Navbar + full-width content, sidebar hidden.
       */}

      {/* Fixed left sidebar — desktop only */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-border bg-bg lg:flex lg:flex-col overflow-hidden">
        <LeftSidebar />
      </aside>

      {/* Mobile top navbar — hidden on desktop */}
      <div className="lg:hidden">
        <Navbar />
      </div>

      {/* Main content — offset by sidebar width on desktop */}
      <div className="min-h-screen lg:ml-[280px]">
        <main className="mx-auto max-w-3xl px-6 sm:px-8 py-14">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
