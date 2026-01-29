# Testing Guide

## Step 1: Push to GitHub

Your files are committed locally. Push them to GitHub:

```bash
git push -u origin main
```

If you encounter authentication issues, you may need to:
- Use a Personal Access Token (PAT) instead of password
- Configure SSH keys
- Use GitHub CLI: `gh auth login`

## Step 2: Configure GitHub Secrets

Before the workflow can run, configure these secrets in your repository:

1. Go to: `https://github.com/supreet-lab-daily/autom8/settings/secrets/actions`
2. Click **New repository secret** and add:

   - **SF_USERNAME**: Your Salesforce username
   - **SF_PASSWORD**: Your Salesforce password  
   - **SF_SECURITY_TOKEN**: Your Salesforce security token
   - **SF_LOGIN_URL**: (Optional) `https://test.salesforce.com` or your custom URL

## Step 3: Test the Workflow

### Option A: Manual Trigger (Recommended for First Test)

1. Go to: `https://github.com/supreet-lab-daily/autom8/actions`
2. Click on **Salesforce Test Suite** workflow
3. Click **Run workflow** button (top right)
4. Select branch: `main`
5. Click **Run workflow**

### Option B: Push a Change

Make any small change and push:

```bash
echo "# Test" >> README.md
git add README.md
git commit -m "Trigger workflow test"
git push
```

### Option C: Wait for Schedule

The workflow is scheduled to run daily at 2 AM UTC.

## Step 4: Monitor the Workflow

1. Go to **Actions** tab
2. Click on the running workflow
3. Watch the logs in real-time
4. Check for any errors

## Step 5: View Results

After completion:

1. Scroll to **Artifacts** section at the bottom
2. Download `salesforce-test-report`
3. Extract the ZIP file
4. Open `test-report.html` in your browser

## Troubleshooting

### Workflow Fails at Authentication Step

- Verify all secrets are set correctly
- Check that SF_USERNAME doesn't include @domain (use full email)
- Ensure SF_SECURITY_TOKEN is correct (reset if needed)

### Workflow Fails at Test Execution

- Verify Salesforce CLI is working: `sf --version`
- Check that test classes exist in your org
- Review Salesforce org permissions

### No Committer Information

- Ensure `fetch-depth: 0` is set (already configured)
- Verify class files exist in the repository
- Check git history is available

## Testing Locally First (Optional)

Before pushing, test locally:

```bash
# Install dependencies
npm install

# Test report generation (no Salesforce needed)
npm run test:integration

# Run unit tests
npm test

# If you have Salesforce CLI configured:
npm run run-tests
npm run generate-report
```

## Next Steps After Successful Test

1. ✅ Verify reports are generated correctly
2. ✅ Check that failing classes are identified
3. ✅ Confirm coverage analysis works
4. ✅ Verify committer information is displayed
5. Customize schedule if needed
6. Adjust coverage threshold if needed
7. Set up notifications (email, Slack, etc.)
