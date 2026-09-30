# MoTA Scholarship & Fellowship Management System — Design System

## 1. Product Context

Design a modern, trustworthy, accessible digital platform for the Ministry of Tribal Affairs (MoTA) to manage scholarship and fellowship schemes for Scheduled Tribe students.

The platform supports two primary user roles:

1. Applicants
   - Discover available scholarship/fellowship schemes
   - Check eligibility
   - Submit applications
   - Upload and verify documents
   - Respond to deficiencies
   - Track application progress
   - Receive notifications and decisions

2. Ministry Administrators
   - Monitor applications
   - Review applicant information
   - Review documents
   - View AI-assisted verification results
   - Identify deficiencies
   - Verify eligibility
   - Manage application workflow
   - Make or record decisions
   - Monitor scheme performance through analytics

The prototype is frontend-only. Use realistic mock data and simulated AI verification states.

The product should communicate:
- Trust
- Transparency
- Accessibility
- Government credibility
- Efficiency
- Security
- Human oversight
- Intelligent automation

Do NOT make the interface look like a generic startup SaaS dashboard.

---

# 2. Overall Visual Direction

Use a modern government digital-service aesthetic.

The interface should feel:

- Professional
- Clean
- Calm
- Trustworthy
- Modern but not flashy
- Information-rich without feeling cluttered
- Accessible to users with different levels of digital literacy

Avoid:
- Excessive gradients
- Excessive glassmorphism
- Neon colors
- Gaming aesthetics
- Overly futuristic AI visuals
- Excessive animations
- Huge decorative illustrations that distract from the workflow
- Generic "AI startup" styling

The design should prioritize clarity and usability over visual novelty.

---

# 3. Design Philosophy

The most important design principle is:

"Make the workflow understandable at a glance."

Users should always understand:

1. Where they are
2. What they are currently doing
3. What they have completed
4. What remains to be done
5. Whether action is required from them
6. What will happen next

Use strong visual hierarchy and clear status indicators.

Important information should never depend only on color.

---

# 4. Layout

Use a responsive layout.

Desktop:
- Maximum content width around 1200–1440px
- Generous but controlled whitespace
- Clear grid structure
- Consistent horizontal alignment
- Persistent navigation where appropriate

Tablet:
- Reduce spacing
- Adapt multi-column layouts
- Preserve hierarchy

Mobile:
- Stack content vertically
- Collapse side navigation into a menu
- Keep primary actions easily accessible
- Avoid horizontal scrolling wherever possible

Use consistent spacing throughout the application.

Preferred spacing scale:
- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px

Avoid arbitrary spacing values.

---

# 5. Color System

Use a restrained government/public-service palette.

Primary:
- Deep navy / dark blue for primary navigation and major headings
- Medium blue for primary interactive elements

Secondary:
- Muted teal/green accents for successful verification and positive states

Background:
- Very light neutral gray or off-white

Surface:
- White

Text:
- Very dark navy/gray for primary text
- Medium gray for secondary text
- Light gray for supporting text

Semantic colors:
- Success: green
- Warning: amber
- Error: red
- Informational: blue

Use semantic colors primarily for status communication rather than decoration.

Do not use too many accent colors.

Ensure sufficient contrast between text and backgrounds.

---

# 6. Typography

Use a highly readable modern sans-serif typeface.

Typography should prioritize:
- Readability
- Accessibility
- Clear hierarchy
- Professional appearance

Recommended hierarchy:

Display:
- Large
- Used sparingly for landing-page messaging

Page title:
- Strong and prominent

Section heading:
- Medium-large and semibold

Card heading:
- Medium and semibold

Body:
- Comfortable reading size

Supporting text:
- Smaller but still highly readable

Labels:
- Compact and semibold

Avoid excessive use of bold text.

Use sentence case rather than unnecessary ALL CAPS.

---

# 7. Navigation

## Applicant Navigation

Use a simple navigation structure such as:

- Dashboard
- My Applications
- Schemes
- Documents
- Notifications
- Help

Show the currently active section clearly.

The applicant should always be able to access:
- Current application status
- Pending actions
- Notifications

## Administrator Navigation

Use a sidebar navigation containing:

- Dashboard
- Applications
- Verification
- Selection
- Schemes
- Analytics
- Reports
- Notifications
- Settings

Administrator navigation should feel more information-dense than applicant navigation.

---

# 8. Header

Use a clean top header.

Include:
- MoTA/platform identity
- Current user information where appropriate
- Notifications
- Profile/account menu

The government/platform identity should be visible but should not dominate the interface.

Do not invent official government logos or seals.

If a logo is required for the prototype, use a neutral placeholder or simple textual identity rather than fabricating an official emblem.

---

# 9. Cards

Cards should be used to group related information.

Characteristics:
- White surface
- Subtle border
- Small or moderate corner radius
- Minimal shadow
- Clear internal spacing

Avoid:
- Excessively rounded cards
- Heavy shadows
- Decorative gradients

Cards should have clear purposes.

Examples:
- Application summary
- Application progress
- Document verification
- Eligibility result
- Notification
- Statistics
- Scheme information

---

# 10. Buttons

Use a clear button hierarchy.

Primary:
- Solid primary color
- Used for the main action on a page

Secondary:
- Outlined or subtle filled button
- Used for supporting actions

Tertiary:
- Text button
- Used for low-priority actions

Destructive:
- Used for rejection, deletion, or other irreversible actions

Examples:

Primary:
- Apply Now
- Continue
- Submit Application
- Approve

Secondary:
- Save Draft
- View Details
- Edit

Destructive:
- Reject Application

Avoid having many equally prominent buttons on one screen.

Every important page should have one visually obvious primary action.

---

# 11. Forms

Forms should be simple, structured, and accessible.

Use:
- Clear labels above fields
- Helpful descriptions where needed
- Visible required-field indicators
- Inline validation
- Clear error messages
- Logical grouping

Do not rely on placeholder text as the only field label.

For long applications, divide the form into logical steps.

Example:

1. Personal Information
2. Academic Information
3. Scheme Information
4. Documents
5. Review
6. Submission

Use a progress indicator for multi-step forms.

Users should be able to:
- Save progress
- Move backward
- Review information before submission

---

# 12. Application Status

Application status is a central part of the product.

Use a consistent status system.

Possible statuses:

- Draft
- Submitted
- Document Verification
- Eligibility Verification
- Under Review
- Deficiency Raised
- Resubmission Required
- Screening
- Selected
- Not Selected
- Approved
- Completed

Use both:
- Text
- Visual indicator

Do not communicate status using color alone.

Example:

✓ Verified
⚠ Action Required
● Under Review
○ Upcoming

---

# 13. Application Progress Tracker

Use a horizontal progress tracker on desktop and a vertical timeline where appropriate.

Example:

Application Submitted
        ↓
Document Verification
        ↓
Eligibility Verification
        ↓
Administrative Screening
        ↓
Selection
        ↓
Final Decision

Completed steps should be visually distinct from:
- Current step
- Future steps
- Blocked steps

The tracker should make the application journey understandable immediately.

---

# 14. Document Verification UI

Document verification is one of the central features of the product.

Design verification results clearly.

Each document should show:

- Document name
- File name
- Upload status
- Verification status
- Verification findings
- Required action, if any

Example:

Verified:
"✓ Document verified"

Needs attention:
"⚠ Action required"

Under review:
"● Under review"

AI-assisted findings may include:

- Document readable
- Name matched
- Date detected
- Certificate number detected
- Required field present
- Potential mismatch detected
- Document appears expired

AI results should always be presented as assistance, not as unquestionable final decisions.

Use language such as:
- AI-assisted verification
- Potential issue detected
- Recommended for review
- Requires administrator verification

Avoid implying that AI independently makes final eligibility or selection decisions.

---

# 15. AI Visual Language

AI should be represented subtly.

Do not use:
- Robots
- Glowing brains
- Sci-fi interfaces
- Excessive "AI" badges

Instead use:
- Small AI-assisted labels
- Verification indicators
- Confidence or review indicators where appropriate
- Clear explanations of detected issues

The interface should communicate:

"AI assists officials and applicants"

rather than:

"AI makes the decision."

Human oversight must remain visually apparent.

---

# 16. Deficiency UI

Deficiencies are an important part of the workflow.

When an issue exists, make it immediately visible.

A deficiency card should include:

- What is wrong
- Which document/information is affected
- Why action is required
- What the applicant should do
- Deadline if applicable
- Current status
- Action button

Example:

"Income certificate requires replacement."

"Reason: The uploaded certificate appears to be expired."

"Action: Upload a valid income certificate."

[Upload New Document]

Use warning styling without making the interface alarming.

---

# 17. Tables

Administrator interfaces will use tables heavily.

Tables should support:

- Search
- Filtering
- Sorting
- Status indicators
- Pagination where appropriate
- Row-level actions

Important columns should appear first.

Example:

Application ID
Applicant
Scheme
State
Submitted Date
Verification
Status
Action

Keep tables readable.

Avoid excessive borders.

Use subtle row separation.

---

# 18. Dashboard Design

Dashboards should prioritize information hierarchy.

Administrator dashboards should include:

- Total applications
- Applications under review
- Verified applications
- Applications with deficiencies
- Selected applicants
- Processing metrics
- Scheme-level statistics
- Recent activity
- Application trends

Applicant dashboards should prioritize:

- Current application
- Application progress
- Pending actions
- Deficiencies
- Notifications
- Important deadlines
- Available schemes

Do not overload dashboards with unnecessary charts.

Every visualization should answer a useful question.

---

# 19. Charts and Analytics

Use simple, readable charts.

Appropriate visualizations:
- Bar charts
- Line charts
- Donut charts used sparingly
- Progress indicators
- Summary metrics

Possible administrator analytics:

- Applications by scheme
- Applications by state
- Application status distribution
- Verification outcomes
- Deficiency categories
- Processing time
- Selection statistics

Charts should have:
- Clear titles
- Units
- Legends when necessary
- Useful labels

Avoid decorative charts.

---

# 20. Landing Page

The landing page should immediately communicate:

- What the platform is
- Who it serves
- What users can do
- Available scholarship/fellowship schemes
- The value of a unified digital workflow

Primary action:
"Apply for a Scholarship"

Secondary actions:
"Explore Schemes"
"Track Application"

Use a strong but restrained hero section.

The landing page should feel like a trusted public-service platform, not a marketing website.

---

# 21. Applicant Experience

The applicant interface should prioritize simplicity.

Applicants may have varying levels of technical familiarity.

Therefore:
- Use plain language
- Explain unfamiliar concepts
- Keep forms organized
- Make required actions obvious
- Show progress
- Provide clear feedback
- Avoid unnecessary technical terminology

The applicant should never wonder:

"What do I need to do next?"

---

# 22. Administrator Experience

The administrator interface should prioritize efficiency.

Officials should be able to quickly:

- Find applications
- Filter applications
- Review documents
- Understand verification results
- Identify deficiencies
- Examine eligibility information
- Take workflow actions
- Monitor scheme performance

Use information-dense layouts while maintaining readability.

---

# 23. Empty States

Design meaningful empty states.

Examples:

"No applications found."

"No pending deficiencies."

"You have no active applications."

Empty states should explain what happened and, where useful, provide a next action.

---

# 24. Loading States

Use skeleton loaders or clear loading indicators for areas that would normally load dynamically.

Do not leave blank white spaces while content is loading.

---

# 25. Error States

Errors should be understandable.

Avoid technical messages such as:

"500 Internal Server Error"

Prefer:

"Something went wrong while processing your request."

Provide an appropriate next action.

---

# 26. Notifications

Notifications should be categorized clearly.

Examples:

- Application update
- Document deficiency
- Verification completed
- Selection update
- Deadline reminder

Use notification badges sparingly.

Important notifications should remain visible until addressed.

---

# 27. Accessibility

Design for accessibility from the beginning.

Ensure:
- High color contrast
- Readable text sizes
- Clear focus states
- Keyboard-friendly interactions
- Buttons with clear labels
- Form labels that remain visible
- Status communicated through text and icons, not color alone
- Responsive layouts
- Clear error messages

Avoid tiny text and low-contrast gray text.

---

# 28. Responsive Behavior

The entire application must work on:

- Desktop
- Tablet
- Mobile

Desktop can use:
- Sidebar
- Multi-column dashboards
- Tables

Mobile should:
- Collapse navigation
- Stack cards
- Convert complex tables into readable cards or horizontally scrollable sections when necessary
- Keep primary actions accessible

Do not simply shrink the desktop interface.

Adapt layouts intentionally.

---

# 29. Motion

Use subtle animations only when they improve understanding.

Appropriate:
- Button hover
- Navigation transitions
- Progress updates
- Modal transitions
- Loading states

Avoid:
- Constant animations
- Large page transitions
- Decorative motion
- Excessive parallax

The interface should feel fast and stable.

---

# 30. Consistency Rules

Across every screen:

- Use the same typography
- Use the same spacing scale
- Use the same button hierarchy
- Use the same status colors
- Use the same card style
- Use the same navigation style
- Use consistent terminology
- Use consistent iconography
- Maintain clear visual hierarchy

A user should immediately recognize that every screen belongs to the same MoTA platform.

---

# 31. Prototype Behavior

This is a frontend prototype.

Use realistic mock data to demonstrate the complete workflow.

The prototype should visually simulate:

- Application submission
- Document verification
- AI-assisted findings
- Eligibility checks
- Deficiency detection
- Document resubmission
- Application status changes
- Administrator review
- Approval/rejection/request-correction states
- Dashboard analytics

Do not design the UI around backend limitations.

The goal is to demonstrate the intended end-to-end user experience.

---

# 32. Overall Design Goal

The final product should look like a credible, production-quality government digital platform.

The most important visual message should be:

"One transparent platform connecting applicants, administrators, documents, verification, selection, and post-selection management."

The interface should demonstrate that AI is an intelligent assistance layer inside a transparent workflow, while important decisions remain subject to appropriate human oversight.