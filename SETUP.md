# Setup Guide

This guide will help you set up the Salesforce test automation with GitHub Actions.

## Step 1: Install Prerequisites

### Install Salesforce CLI

```bash
npm install -g @salesforce/cli
```

Verify installation:
```bash
sf --version
```

### Install Node.js Dependencies

```bash
npm install
```

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SF_USERNAME` | Your Salesforce username | `user@example.com` |
| `SF_PASSWORD` | Your Salesforce password | `YourPassword123` |
| `SF_SECURITY_TOKEN` | Salesforce security token | `ABC123XYZ789` |
| `SF_LOGIN_URL` | (Optional) Login URL | `https://test.salesforce.com` |

### Getting Your Security Token

1. Log in to Salesforce
2. Go to **Setup** → **My Personal Information** → **Reset My Security Token**
3. Click **Reset Security Token**
4. Check your email for the token

## Step 3: Test Locally (Optional)

### Test Report Generation

You can test the report generation without connecting to Salesforce:

```bash
node scripts/test-report-generation.js
```

This will:
- Use sample test data
- Generate all report formats (JSON, Markdown, HTML)
- Display the reports location

Open `reports/test-report.html` in your browser to view the report.

### Test with Real Salesforce Connection

If you have Salesforce CLI configured:

```bash
# Authenticate (if not already done)
sf org login web --alias test-sandbox

# Run tests
npm run run-tests

# Generate report
npm run generate-report
```

## Step 4: Configure Schedule (Optional)

Edit `.github/workflows/salesforce-tests.yml` to customize the schedule:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

Common schedules:
- `'0 */6 * * *'` - Every 6 hours
- `'0 9 * * 1-5'` - Weekdays at 9 AM UTC
- `'0 0 * * 0'` - Weekly on Sunday

## Step 5: Run Tests

### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **Salesforce Test Suite** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Automatic Trigger

The workflow runs automatically:
- On the configured schedule
- On push to `main` or `develop` branches
- On pull requests

## Step 6: View Results

After a workflow run:

1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download `salesforce-test-report`
5. Extract and open `test-report.html`

## Troubleshooting

### Authentication Fails

- Verify credentials in GitHub Secrets
- Ensure security token is correct
- Check if IP is whitelisted in Salesforce

### Tests Don't Run

- Verify Salesforce CLI is available in workflow
- Check test class names exist
- Review Salesforce org permissions

### Committer Info Missing

- Ensure `fetch-depth: 0` in checkout step (already configured)
- Verify class files exist in repository
- Check git history is available

## Next Steps

- Customize coverage threshold (default: 95%)
- Adjust test level (default: RunLocalTests)
- Configure notification channels (email, Slack, etc.)
- Add custom report formats

## Support

For issues or questions:
1. Check the [README.md](README.md) for detailed documentation
2. Review workflow logs in GitHub Actions
3. Test locally using `scripts/test-report-generation.js`
