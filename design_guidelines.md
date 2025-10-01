# TCO Application Design Guidelines

## Design Approach: Enterprise Design System

**Selected Framework:** Material Design with Carbon Design influences for data-heavy sections
**Justification:** This is a utility-focused enterprise application for shipping terminals requiring efficiency, data clarity, and professional aesthetics. The Maersk Design System foundations will be complemented with proven patterns from Material Design for forms/interactions and Carbon Design for data visualization/tables.

## Core Design Principles

1. **Information Hierarchy First** - Critical TCO data and workflow status must be immediately visible
2. **Operational Efficiency** - Minimize clicks, support keyboard navigation, provide contextual actions
3. **Data Transparency** - Clear calculation traces, version history, and audit trails
4. **Professional Maritime Aesthetic** - Corporate, trustworthy, aligned with shipping industry standards

---

## Color Palette

### Light Mode
- **Primary Brand:** 194 100% 25% (Maersk Blue - deep ocean blue)
- **Primary Hover/Active:** 194 100% 20%
- **Secondary/Accent:** 205 80% 45% (lighter blue for data highlights)
- **Success:** 142 71% 45% (approvals, published status)
- **Warning:** 38 92% 50% (pending clarification)
- **Error:** 4 90% 58% (rejections, validation errors)
- **Neutral Background:** 210 20% 98% (page background)
- **Surface/Cards:** 0 0% 100% (white cards and panels)
- **Borders:** 210 18% 87%
- **Text Primary:** 210 24% 16%
- **Text Secondary:** 210 16% 46%

### Dark Mode
- **Primary Brand:** 194 100% 40%
- **Primary Hover/Active:** 194 100% 35%
- **Secondary/Accent:** 205 70% 55%
- **Success:** 142 60% 50%
- **Warning:** 38 80% 55%
- **Error:** 4 80% 65%
- **Neutral Background:** 210 20% 10%
- **Surface/Cards:** 210 20% 14%
- **Borders:** 210 18% 25%
- **Text Primary:** 210 10% 96%
- **Text Secondary:** 210 10% 70%

---

## Typography

**Font Stack:** 
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Monospace (for TCO values, IDs): 'JetBrains Mono', 'SF Mono', Consolas, monospace

**Type Scale:**
- **Display/Dashboard Heading:** text-3xl md:text-4xl, font-bold (36-48px)
- **Section Headers:** text-2xl, font-semibold (24px)
- **Card/Panel Titles:** text-lg, font-semibold (18px)
- **Body Text:** text-base, font-normal (16px)
- **Supporting Text:** text-sm, font-normal (14px)
- **Captions/Labels:** text-xs, font-medium, uppercase tracking-wide (12px)
- **TCO Values/Metrics:** text-2xl md:text-3xl, font-bold, font-mono (24-36px)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16, 20** consistently
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card margins: mb-6 or gap-6 in grids
- Form field spacing: space-y-4
- Dashboard layout gutters: gap-6

**Container Strategy:**
- Main app wrapper: max-w-7xl mx-auto px-4 md:px-6
- Dashboard grid: grid gap-6 (2-3 column layouts on desktop)
- Forms: max-w-4xl for optimal data entry
- Tables: Full width within container, horizontal scroll on mobile
- Modals: max-w-2xl for workflow dialogs, max-w-6xl for TCO detail views

---

## Component Library

### Navigation & Structure
- **Top Navigation Bar:** Fixed header with logo, global search, user profile, notifications (worklist count badge)
- **Side Navigation:** Collapsible sidebar with icons for Dashboard, TCO Records, Worklist, Master Data, Reports
- **Breadcrumbs:** Always visible with clear hierarchy (Dashboard > TCO Records > Version X)
- **Tab Navigation:** For TCO detail views (Overview, Cost Elements, Calculations, Workflow, Version History)

### Data Display
- **Stat Cards:** Large metric value, label, trend indicator (↑↓), subtle gradient background, shadow-md
- **TCO Summary Card:** Prominent display of final TCO value, version badge, status pill, key metadata in grid
- **Data Tables:** 
  - Header with sortable columns (↕ icons)
  - Row hover state with subtle background
  - Frozen first column for asset IDs
  - Column-level filter dropdowns
  - Pagination with page size selector
  - Action menu (⋮) per row
  - Alternating row backgrounds for readability
  - shadow-lg for table container
- **Charts/Graphs:**
  - Year-wise TCO line chart with gradient fill
  - Cost breakdown stacked bar chart
  - Distribution charts for Monte Carlo results
  - Use consistent brand colors with opacity variations
  - Interactive tooltips on hover
  - Legend with toggle visibility

### Forms & Input
- **Form Sections:** Grouped with clear headings, collapsible accordions for lengthy forms
- **Input Fields:** 
  - Standard height (h-10 to h-12)
  - Consistent border-radius (rounded-md)
  - Focus ring with primary color
  - Helper text below field
  - Required field indicators (*)
  - Validation states with inline error messages
- **Search/Filter Fields:** Debounced search with icon, dropdown filters with chips for active filters
- **Multi-step Wizard:** Progress stepper at top, clear back/next navigation, save draft option
- **Rich Text Areas:** For remarks/comments with formatting toolbar

### Workflow Elements
- **Status Pills:** 
  - Draft: gray background
  - Pending Approval: amber/yellow
  - Approved: green
  - Published/Active: blue
  - Retired: slate/muted
  - Rounded-full, px-3 py-1, text-xs font-semibold
- **Approval Cards:** Approver info, timestamp, action buttons (Approve/Request Clarification), remarks section
- **Worklist Items:** Card-based list with TCO ID, asset type, terminal, SLA countdown timer, priority indicator, action buttons
- **Version Timeline:** Vertical timeline showing version history with status changes, approver actions, dates

### Interactive Elements
- **Primary CTA Buttons:** bg-primary, hover:bg-primary-dark, shadow-md, rounded-md, px-6 py-2.5
- **Secondary Buttons:** border-2 border-primary, text-primary, hover background tint
- **Icon Buttons:** Circular, p-2, hover:bg-gray-100 dark:hover:bg-gray-800
- **Dropdown Menus:** shadow-lg, rounded-md, border, max-h-60 overflow-auto
- **Modals/Dialogs:** Overlay with backdrop-blur-sm, centered card with shadow-2xl, clear header with close button
- **Toast Notifications:** Top-right position, slide-in animation, auto-dismiss with progress bar

### Box Shadow Strategy
- **Cards/Panels:** shadow-md (moderate depth)
- **Elevated elements (modals, dropdowns):** shadow-lg to shadow-2xl
- **Interactive elements on hover:** shadow-lg (lift effect)
- **Tables:** shadow-lg for container prominence
- **Stat cards:** shadow-md with subtle gradient overlay

---

## Responsive Behavior

- **Mobile (<768px):** Single column layout, collapsible navigation, stacked form fields, horizontal scroll tables with frozen columns
- **Tablet (768-1024px):** 2-column dashboard grid, side navigation toggles to overlay
- **Desktop (>1024px):** Full 3-column dashboard layouts, expanded side navigation, optimal table widths

---

## Dashboard Layout

**Key Sections:**
1. **Hero Stats Bar:** 4-column grid showing Total TCO Records, Active Golden Records, Pending Approvals, Avg. TCO Value
2. **Quick Actions:** Prominent "Create New TCO Analysis" button, "Copy Existing Version" link
3. **Worklist Preview:** Top 5 items requiring action with "View All" link, SLA countdown timers
4. **Recent Activity:** Timeline of latest TCO submissions, approvals, publications
5. **TCO Distribution Chart:** Visualization of TCO values across asset types/terminals

**No Hero Image** - Dashboard is data and action-focused, not marketing

---

## Workflow Screens

- **TCO Creation Wizard:** Multi-step with clear progress, auto-save drafts, pre-populated data from Data Lake with "Source: Auto" badges vs "Source: Manual" for user inputs
- **Calculation View:** Side-by-side layout showing input table (left) and computed TCO table/graph (right)
- **Approval Screen:** TCO summary card at top, calculation details in tabs below, approval action panel with remarks textarea at bottom
- **Version Comparison:** Split-screen view comparing two versions with highlighted differences

---

## Accessibility & UX

- Focus indicators on all interactive elements
- ARIA labels for screen readers
- Keyboard shortcuts for common actions (N for new TCO, S for search, etc.)
- Loading states with skeleton screens for data-heavy views
- Empty states with helpful guidance (e.g., "No TCO records yet. Create your first analysis.")
- Confirmation dialogs for destructive actions (though deletion limited per workflow)
- Calculation trace tooltips to show formula derivation

---

## Animations

**Minimal and purposeful only:**
- Page transitions: subtle fade-in (150ms)
- Dropdown/modal appearance: slide-down/scale (200ms)
- Table row expansion: smooth height transition (250ms)
- Toast notifications: slide-in from right (300ms)
- Loading spinners for async operations
- **NO** decorative animations or parallax effects