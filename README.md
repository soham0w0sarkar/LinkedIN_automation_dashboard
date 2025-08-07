# LinkedIn Automation Dashboard

A React-based admin dashboard with tabbed campaign management and separation of concerns implemented through component-based architecture.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Sidebar.jsx     # Navigation component
│   ├── FileUpload.jsx  # File upload functionality
│   ├── FileDropZone.jsx # Reusable file drop zone
│   ├── UploadedFilesList.jsx # List of uploaded files
│   ├── CrashReports.jsx # Crash reports management
│   ├── DownloadCenter.jsx # Download management
│   ├── TabManager.jsx  # Tab management interface
│   ├── CampaignModal.jsx # Campaign creation modal
│   ├── CampaignDashboard.jsx # Individual campaign dashboard
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   ├── useFileUpload.js # File upload logic
│   ├── useCrashReports.js # Crash reports logic
│   ├── useDownloads.js # Downloads logic
│   ├── useCampaigns.js # Campaign management logic
│   └── index.js        # Hook exports
├── utils/              # Utility functions
│   └── sectionHelpers.js # Section title/description helpers
├── pages/              # Page components
│   └── dashboard.jsx   # Main dashboard page
└── firebase.js         # Firebase configuration
```

## Separation of Concerns

### Components

- **Sidebar**: Handles navigation and section switching
- **FileUpload**: Manages file upload interface and logic
- **FileDropZone**: Reusable file upload zone component
- **UploadedFilesList**: Displays list of uploaded files
- **CrashReports**: Manages crash report display and actions
- **DownloadCenter**: Handles download interface
- **TabManager**: Manages multiple campaign tabs
- **CampaignModal**: Modal for creating new campaigns
- **CampaignDashboard**: Individual dashboard for each campaign

### Custom Hooks

- **useFileUpload**: Encapsulates file upload state and logic
- **useCrashReports**: Manages crash reports state and operations
- **useDownloads**: Handles downloads state
- **useCampaigns**: Manages multiple campaigns and tab state

### Utilities

- **sectionHelpers**: Helper functions for section titles and descriptions

## Benefits of This Structure

1. **Single Responsibility**: Each component and hook has a single, well-defined purpose
2. **Reusability**: Components like FileDropZone can be reused across the application
3. **Testability**: Smaller, focused components are easier to test
4. **Maintainability**: Changes to one feature don't affect others
5. **Scalability**: Easy to add new features without modifying existing code
6. **State Management**: Business logic is separated into custom hooks
7. **Campaign Management**: Each campaign has its own isolated dashboard

## Usage

The main dashboard component (`src/pages/dashboard.jsx`) now uses a tabbed interface where:

- **TabManager**: Handles multiple campaign tabs with add/remove functionality
- **CampaignDashboard**: Each tab contains a complete dashboard for that campaign
- **CampaignModal**: Allows users to create new campaigns with custom names
- Each campaign maintains its own state independently
- Users can switch between campaigns seamlessly

This creates a clean, maintainable architecture where:

- UI components handle presentation
- Custom hooks handle business logic
- Utility functions handle common operations
- Each piece can be developed, tested, and maintained independently
- Campaigns are completely isolated from each other
