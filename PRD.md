# Product Requirements Document (PRD)
# LinkedIn Portfolio Generator

**Version:** 1.0  
**Date:** July 26, 2025  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Product Overview
LinkedIn Portfolio Generator is a web application that automatically creates professional portfolio websites by extracting data from LinkedIn profiles. Users can select from multiple template and customize their portfolios with additional content beyond what's available on LinkedIn.

### 1.2 Mission Statement
To democratize professional portfolio creation by leveraging existing LinkedIn data and providing beautiful, customizable templates that help professionals showcase their skills and experience effectively.

### 1.3 Success Metrics
- **User Acquisition:** 1,000+ registered users in first 6 months
- **Conversion Rate:** 70% completion rate from signup to published portfolio
- **User Engagement:** 80% of users publish at least one portfolio
- **Template Usage:** Even distribution across template frameworks

---

## 2. Product Goals & Objectives

### 2.1 Primary Goals
1. **Streamline Portfolio Creation:** Reduce portfolio creation time from hours to minutes
2. **Multi-Framework Support:** Support React, Vue, Svelte, and Vanilla JS templates (because of astro-js)
3. **LinkedIn Integration:** Seamlessly extract and parse LinkedIn profile data
4. **Template Customization:** Allow users to modify and extend their portfolios

### 2.2 Success Criteria
- Users can create a complete portfolio in under 15 minutes
- 95% of LinkedIn profiles are successfully parsed
- All templates render correctly across devices
- Users can easily customize content and styling

---

## 3. Target Audience

### 3.1 Primary Users
- **Software Developers:** Looking for modern, technical portfolios
- **Designers:** Seeking creative portfolio presentations
- **Marketing Professionals:** Need professional online presence
- **Recent Graduates:** Building their first professional portfolio

### 3.2 User Personas

#### Persona 1: "Tech-Savvy Developer"
- **Demographics:** 25-35 years old, 2-8 years experience
- **Pain Points:** Limited design skills, time constraints
- **Goals:** Modern, responsive portfolio with project showcases
- **Tech Comfort:** High

#### Persona 2: "Creative Professional"
- **Demographics:** 24-40 years old, design/marketing background
- **Pain Points:** Complex portfolio builders, limited customization
- **Goals:** Visually striking portfolio that reflects personal brand
- **Tech Comfort:** Medium

#### Persona 3: "Career Changer"
- **Demographics:** 28-45 years old, transitioning careers
- **Pain Points:** Highlighting transferable skills, professional presentation
- **Goals:** Clean, professional portfolio that tells their story
- **Tech Comfort:** Low to Medium

---

## 4. User Journey & Flow

### 4.1 User Registration & Onboarding Flow
```
Landing Page → Sign Up (Clerk) → Onboarding → Dashboard → Portfolio Creation
```

#### 4.1.1 Landing Page
- **Purpose:** Convert visitors to registered users
- **Key Elements:**
  - Hero section with value proposition
  - Template previews/gallery
  - Feature highlights
  - Social proof/testimonials
  - Clear CTA to sign up

#### 4.1.2 Authentication (Clerk)
- **Sign Up Options:**
  - Email/Password
  - Google OAuth
  - GitHub OAuth (for developers)
- **Sign In:** Same options as sign up
- **Account Management:** Handled by Clerk

#### 4.1.3 Onboarding Process
**Step 1: Welcome & Profile Setup**
- Welcome message and app overview
- Basic profile information collection
- Profile picture upload (optional)

**Step 2: LinkedIn URL Collection**
- Input field for LinkedIn profile URL
- URL validation and format checking
- Preview of extractable data
- Option to skip (manual entry later)

**Step 3: LinkedIn Data Import**
- Background processing of LinkedIn extraction
- Progress indicator
- Data preview and confirmation
- Edit/correction interface

**Step 4: Template Selection**
- Template gallery with previews
- Filter by framework (React, Vue, Svelte, Vanilla)
- Filter by style (Minimal, Creative, Professional, etc.)
- Template feature comparison

**Step 5: Portfolio Creation**
- Auto-populate with LinkedIn data
- Section management (show/hide, reorder)
- Basic content editing
- Preview functionality

### 4.2 Core User Flows

#### 4.2.1 Portfolio Creation Flow
```
Template Selection → Data Import → Content Editing → Preview → Publish
```

#### 4.2.2 Portfolio Management Flow
```
Dashboard → Select Portfolio → Edit/Preview/Settings → Save/Publish
```

#### 4.2.3 Template Switching Flow
```
Portfolio Editor → Template Gallery → Select New Template → Confirm Switch → Apply
```

---

## 5. Feature Requirements

### 5.1 Core Features (MVP)

#### 5.1.1 Authentication & User Management
- **Clerk Integration:** Complete auth flow
- **User Profiles:** Basic user information storage
- **Session Management:** Secure session handling

#### 5.1.2 LinkedIn Integration
- **URL Collection:** Onboarding form for LinkedIn URL
- **Data Extraction:** API integration for profile parsing
- **Data Processing:** Clean and normalize extracted data
- **Error Handling:** Failed extraction recovery

#### 5.1.3 Template System
- **Multi-Framework Support:** React, Vue, Svelte, Vanilla JS
- **Template Isolation:** Prevent style conflicts
- **Template Gallery:** Preview and selection interface
- **Template Switching:** Change templates for existing portfolios

#### 5.1.4 Portfolio Builder
- **Section Management:** Add, remove, reorder sections
- **Content Editing:** Rich text editing for descriptions
- **Image Management:** Upload and manage portfolio images
- **Preview Mode:** Real-time portfolio preview

#### 5.1.5 Portfolio Publishing
- **Unique URLs:** Generate shareable portfolio URLs
- **Static Generation:** Build static sites for performance
- **Mobile Responsive:** All portfolios work on mobile devices

### 5.2 Advanced Features (Post-MVP)

#### 5.2.1 Custom Domains
- **Domain Connection:** Allow users to connect custom domains
- **SSL Certificates:** Automatic HTTPS setup
- **DNS Management:** Simplified domain configuration

#### 5.2.2 SEO Optimization
- **Meta Tags:** Automatic SEO meta tag generation
- **Schema Markup:** Structured data for search engines
- **Sitemap Generation:** Automatic sitemap creation

#### 5.2.3 Analytics & Insights
- **Portfolio Views:** Track portfolio visit statistics
- **Visitor Analytics:** Basic visitor demographics
- **Performance Metrics:** Portfolio loading speeds

#### 5.2.4 Advanced Customization
- **Custom CSS:** Allow advanced users to add custom styles
- **Template Forking:** Create custom templates from existing ones
- **Component Library:** Reusable components for portfolio building

---

## 6. Technical Specifications

### 6.1 Technology Stack
- **Frontend:** Astro with multi-framework support
- **Authentication:** Clerk
- **Database:** Turso (SQLite) with Drizzle ORM
- **Hosting:** TBD (Vercel/Netlify recommended)
- **File Storage:** TBD (Cloudinary/AWS S3)

### 6.2 Database Schema (Drizzle ORM)

#### 6.2.1 Core Tables
```sql
-- Users (managed by Clerk, extended data only)
users_extended:
  - clerk_user_id (primary key)
  - linkedin_url
  - profile_completed
  - created_at
  - updated_at

-- Portfolios
portfolios:
  - id (primary key)
  - user_id (foreign key to Clerk user)
  - title
  - slug (unique)
  - template_id
  - content (JSON)
  - is_published
  - custom_domain
  - seo_title
  - seo_description
  - created_at
  - updated_at

-- Templates
templates:
  - id (primary key)
  - name
  - description
  - framework
  - category
  - thumbnail_url
  - config (JSON)
  - files (JSON)
  - is_premium
  - is_active
  - created_at
  - updated_at

-- LinkedIn Data
linkedin_data:
  - id (primary key)
  - user_id (foreign key to Clerk user)
  - raw_data (JSON)
  - processed_data (JSON)
  - last_updated
  - extraction_status
```

### 6.3 API Endpoints

#### 6.3.1 Authentication (Clerk Webhooks)
- `POST /api/webhooks/clerk` - Handle user creation/updates

#### 6.3.2 Onboarding
- `POST /api/onboarding/linkedin` - Submit LinkedIn URL
- `GET /api/onboarding/status` - Get onboarding progress

#### 6.3.3 LinkedIn Integration
- `POST /api/linkedin/extract` - Extract LinkedIn profile data
- `GET /api/linkedin/data/:userId` - Get processed LinkedIn data

#### 6.3.4 Portfolios
- `GET /api/portfolios` - List user portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/:id` - Get portfolio details
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio
- `POST /api/portfolios/:id/publish` - Publish portfolio

#### 6.3.5 Templates
- `GET /api/templates` - List available templates
- `GET /api/templates/:id` - Get template details

### 6.4 Content Structure

#### 6.4.1 Portfolio Sections
1. **Hero/Header** - Name, title, contact, social links
2. **About** - Professional summary and highlights
3. **Experience** - Work history with descriptions
4. **Education** - Academic background
5. **Skills** - Technical and soft skills
6. **Projects** - Personal/professional projects
7. **Certifications** - Professional certifications
8. **Publications** - Articles, papers, speaking
9. **Awards** - Recognition and achievements
10. **Testimonials** - Recommendations and quotes
11. **Contact** - Contact form and information

---

## 7. User Interface Requirements

### 7.1 Design Principles
- **Clean & Modern:** Contemporary design aesthetics
- **Mobile-First:** Responsive design for all screen sizes
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Fast loading times and smooth interactions

### 7.2 Key Pages & Components

#### 7.2.1 Landing Page
- Hero section with compelling value proposition
- Template gallery/carousel
- Feature highlights with icons
- Social proof (testimonials, user count)
- Pricing information (if applicable)
- Footer with links and contact information

#### 7.2.2 Onboarding Flow
- **Step Indicator:** Progress through onboarding steps
- **LinkedIn URL Input:** Validation and formatting
- **Data Preview:** Show extracted LinkedIn data
- **Template Selection:** Gallery with filters and search

#### 7.2.3 Dashboard
- Portfolio overview cards
- Quick actions (create, edit, view)
- Usage statistics
- Account settings access

#### 7.2.4 Portfolio Editor
- **Sidebar:** Section management and settings
- **Main Editor:** Content editing interface
- **Preview Pane:** Real-time preview (optional)
- **Toolbar:** Save, publish, preview actions

### 7.3 Template Isolation Requirements
- Each template must be CSS-scoped to prevent conflicts
- Templates should reset base styles within their container
- JavaScript should be properly namespaced
- Templates must be responsive and accessible

---

## 8. Non-Functional Requirements

### 8.1 Performance
- **Page Load Time:** < 3 seconds for landing page
- **Portfolio Generation:** < 30 seconds for LinkedIn extraction
- **Template Switching:** < 5 seconds for template changes
- **Mobile Performance:** 90+ Lighthouse mobile score

### 8.2 Security
- **Authentication:** Secure authentication via Clerk
- **Data Protection:** Encrypt sensitive user data
- **Input Validation:** Validate all user inputs
- **XSS Prevention:** Sanitize user-generated content

### 8.3 Scalability
- **Database:** Support for 10,000+ users initially
- **Storage:** Efficient file storage and CDN usage
- **Caching:** Implement appropriate caching strategies
- **Rate Limiting:** Prevent API abuse

### 8.4 Reliability
- **Uptime:** 99.5% uptime target
- **Error Handling:** Graceful error handling and recovery
- **Data Backup:** Regular automated backups
- **Monitoring:** Application performance monitoring

---

## 9. Constraints & Assumptions

### 9.1 Technical Constraints
- Must use Astro, Clerk, Turso, and Drizzle as specified
- LinkedIn data extraction API has rate limits
- Template isolation must work across frameworks
- Mobile-first responsive design required

### 9.2 Business Constraints
- Limited initial budget for third-party services
- Solo developer team initially
- 3-month MVP timeline
- Free tier must be sustainable

### 9.3 Assumptions
- Users have public LinkedIn profiles
- LinkedIn profile extraction API remains stable
- Users want multi-framework template options
- Basic customization needs are sufficient for MVP

---

## 10. Success Metrics & KPIs

### 10.1 User Acquisition Metrics
- **Signups:** Monthly new user registrations
- **Conversion Rate:** Landing page visitor to signup conversion
- **Traffic Sources:** Organic search, referrals, direct traffic

### 10.2 User Engagement Metrics
- **Onboarding Completion:** % of users completing full onboarding
- **Portfolio Creation:** % of users creating at least one portfolio
- **Portfolio Publishing:** % of created portfolios that are published
- **Template Usage:** Distribution of template framework usage

### 10.3 Technical Performance Metrics
- **LinkedIn Extraction Success Rate:** % of successful extractions
- **Page Load Times:** Average load times across pages
- **Error Rates:** Application error frequency
- **Uptime:** Service availability metrics

### 10.4 Business Metrics
- **Monthly Active Users:** Users actively using the platform
- **Portfolio Views:** Total views of published portfolios
- **User Retention:** 30-day and 90-day retention rates
- **Support Tickets:** Volume and resolution time

---

## 11. Risk Assessment

### 11.1 Technical Risks
- **LinkedIn API Changes:** Risk of extraction API breaking
- **Template Conflicts:** CSS/JS conflicts between frameworks
- **Performance Issues:** Slow template rendering or switching
- **Security Vulnerabilities:** XSS or data exposure risks

### 11.2 Business Risks
- **User Adoption:** Low user interest or engagement
- **Competition:** Similar products entering market
- **LinkedIn Policy Changes:** Changes affecting profile access
- **Scaling Costs:** Infrastructure costs growing faster than revenue

### 11.3 Mitigation Strategies
- **API Monitoring:** Monitor LinkedIn API for changes
- **Template Testing:** Comprehensive testing across frameworks
- **Performance Monitoring:** Continuous performance tracking
- **Security Audits:** Regular security assessments
- **User Feedback:** Early user testing and feedback collection

---

## 12. Timeline & Milestones

### Phase 1: Foundation (Weeks 1-2)
- [X] Project setup with Astro, Clerk, Turso, Drizzle
- [X] Basic authentication flow
- [X] Database schema implementation
- [ ] Landing page design and development

### Phase 2: Onboarding & LinkedIn Integration (Weeks 3-4)
- [ ] Onboarding flow implementation
- [ ] LinkedIn URL collection and validation
- [ ] LinkedIn API integration
- [ ] Data extraction and processing

### Phase 3: Template System (Weeks 5-7)
- [ ] Template architecture design
- [ ] Template isolation implementation
- [ ] 3-4 basic templates (React, Vue, Vanilla)
- [ ] Template selection interface

### Phase 4: Portfolio Builder (Weeks 8-10)
- [ ] Portfolio creation flow
- [ ] Content editing interface
- [ ] Section management
- [ ] Preview and publishing system

### Phase 5: Testing & Launch (Weeks 11-12)
- [ ] Comprehensive testing (unit, integration, E2E)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Beta user testing
- [ ] Production deployment

---

## 13. Appendices

### 13.1 Glossary
- **Template Isolation:** Preventing CSS and JavaScript conflicts between templates
- **Static Generation:** Building static HTML files for published portfolios
- **Portfolio Slug:** URL-friendly identifier for portfolios
- **LinkedIn Extraction:** Parsing LinkedIn profile data via API

### 13.2 References
- Astro Documentation: https://docs.astro.build/
- Clerk Documentation: https://clerk.com/docs
- Turso Documentation: https://docs.turso.tech/
- Drizzle ORM Documentation: https://orm.drizzle.team/

### 13.3 Contact Information
- **Product Owner:** [Your Name]
- **Development Team:** [Your Name]
- **Stakeholders:** [If applicable]