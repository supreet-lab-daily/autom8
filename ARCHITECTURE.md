# Architecture Documentation

## Overview

This solution implements a pure GitHub Actions-based Salesforce test automation system using composite actions. All logic is contained within reusable, modular actions that follow GitHub Actions best practices.

## Design Principles

1. **Modularity**: Each major function is a separate composite action
2. **Reusability**: Actions can be reused across multiple workflows
3. **Scalability**: Easy to extend and modify without affecting other components
4. **Non-Blocking**: Workflow never fails, only captures and reports issues
5. **Best Practices**: Follows GitHub Actions composite action patterns

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Workflow                            │
│         .github/workflows/salesforce-tests.yml             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Auth       │    │  Run Tests   │    │  Generate    │
│  Action      │───▶│   Action     │───▶│   Report     │
│              │    │              │    │   Action     │
└──────────────┘    └──────────────┘    └──────────────┘
                                              │
                                              ▼
                                    ┌──────────────┐
                                    │  Send        │
                                    │ Notification │
                                    │   Action     │
                                    └──────────────┘
```

## Composite Actions

### 1. salesforce-auth

**Purpose**: Authenticate to Salesforce org

**Location**: `.github/actions/salesforce-auth/action.yml`

**Inputs**:
- `username`: Salesforce username
- `password`: Salesforce password
- `security_token`: Security token
- `login_url`: Login URL (default: https://test.salesforce.com)
- `alias`: Org alias (default: test-sandbox)

**Functionality**:
- Installs Salesforce CLI
- Authenticates using web login
- Sets default org

### 2. run-salesforce-tests

**Purpose**: Execute Salesforce tests and capture results

**Location**: `.github/actions/run-salesforce-tests/action.yml`

**Inputs**:
- `test_level`: Test level (default: RunAllTestsInOrg)
- `wait_time`: Wait time in minutes (default: 10)
- `code_coverage`: Include coverage (default: true)

**Outputs**:
- `test_results_path`: Path to results JSON
- `has_failures`: Boolean indicating failures

**Functionality**:
- Creates reports directory
- Runs Salesforce tests
- Saves results as JSON
- Checks for failures

### 3. generate-report

**Purpose**: Generate comprehensive test report

**Location**: `.github/actions/generate-report/action.yml`

**Inputs**:
- `test_results_path`: Path to test results
- `coverage_threshold`: Minimum coverage % (default: 95)
- `report_format`: Format - json, markdown, or both (default: json)

**Outputs**:
- `report_path`: Path to generated report
- `failing_classes_count`: Number of failing classes
- `low_coverage_count`: Number of low coverage classes

**Functionality**:
- Installs jq for JSON processing
- Extracts test summary
- Identifies failing classes with committer info
- Identifies low coverage classes (< threshold)
- Generates JSON report
- Optionally generates Markdown report

### 4. send-notification

**Purpose**: Send notifications to Slack, MS Teams, or Email

**Location**: `.github/actions/send-notification/action.yml`

**Inputs**:
- `report_path`: Path to report JSON
- `slack_webhook_url`: Slack webhook (optional)
- `teams_webhook_url`: MS Teams webhook (optional)
- `email_to`: Email address (optional)
- `workflow_run_url`: GitHub workflow URL

**Functionality**:
- Parses report JSON
- Formats message for each platform
- Sends to configured channels
- Handles errors gracefully

## Data Flow

```
1. Workflow Triggered
   ↓
2. Checkout Code (with full history)
   ↓
3. Authenticate to Salesforce
   ↓
4. Run Tests (RunAllTestsInOrg)
   ↓
5. Generate Report
   ├─ Extract test results
   ├─ Identify failing classes
   ├─ Get committer info (for failing classes only)
   ├─ Identify low coverage classes (< 95%)
   └─ Generate JSON/Markdown reports
   ↓
6. Store Reports
   ├─ Upload as artifact
   └─ Commit to test-reports/TIMESTAMP/
   ↓
7. Send Notifications
   ├─ Slack (if configured)
   ├─ MS Teams (if configured)
   └─ Email (if configured)
   ↓
8. Comment on PR (if applicable)
```

## Report Storage Strategy

### Artifacts
- Stored for 30 days
- Downloadable from workflow runs
- Format: `salesforce-test-report-RUN_ID.zip`

### Repository
- Stored in `test-reports/TIMESTAMP/` directory
- Timestamped to avoid conflicts
- Committed to repository for historical tracking
- Format: `YYYYMMDD-HHMMSS/`

### Directory Structure
```
test-reports/
├── 20240115-020000/
│   ├── test-report.json
│   ├── test-report.md
│   ├── test-results.json
│   └── index.json
├── 20240116-020000/
│   └── ...
└── .gitkeep
```

## Error Handling

- All steps use `continue-on-error: true` where appropriate
- Workflow never fails, only captures issues
- Errors are logged and reported
- Notifications include error information

## Security Considerations

1. **Secrets Management**: All sensitive data stored in GitHub Secrets
2. **Token Permissions**: Minimal required permissions (contents: write, issues: write, pull-requests: write)
3. **No Hardcoded Credentials**: All credentials come from secrets
4. **Secure Authentication**: Uses Salesforce CLI web login

## Scalability

### Adding New Features

1. **New Composite Action**: Create in `.github/actions/`
2. **Modify Workflow**: Add step using new action
3. **Reuse Existing**: Leverage existing actions

### Extending Reports

1. Modify `generate-report` action
2. Add new fields to JSON structure
3. Update notification formatting

### Adding Notification Channels

1. Extend `send-notification` action
2. Add new input parameter
3. Implement formatting logic
4. Add curl/webhook call

## Best Practices Followed

1. ✅ **Composite Actions**: Reusable, modular components
2. ✅ **Input/Output**: Clear interfaces between actions
3. ✅ **Error Handling**: Graceful failure handling
4. ✅ **Documentation**: Comprehensive inline and external docs
5. ✅ **Version Control**: All code tracked in repository
6. ✅ **Non-Blocking**: Workflow doesn't fail on test failures
7. ✅ **Idempotency**: Can run multiple times safely
8. ✅ **Separation of Concerns**: Each action has single responsibility

## Testing Strategy

1. **Manual Testing**: Use `workflow_dispatch` trigger
2. **Incremental Testing**: Test each action individually
3. **Integration Testing**: Test full workflow end-to-end
4. **Error Scenarios**: Test with invalid credentials, missing files, etc.

## Maintenance

### Regular Tasks
- Review reports in `test-reports/` directory
- Monitor notification delivery
- Check workflow execution logs
- Update Salesforce CLI version (automatic)

### Updates
- Modify composite actions as needed
- Update thresholds and configurations
- Add new notification channels
- Extend report formats

## Future Enhancements

Potential improvements:
- Add more report formats (HTML, PDF)
- Support multiple Salesforce orgs
- Add trend analysis
- Integrate with more tools
- Add custom test class selection
- Support parallel test execution
