# 🧪 Apex Test Report

**Date:** 2026-02-09T23:49:16.115Z  
**Test Run ID:** 707O200002CFwdK

## 🔴 Summary

| Metric | Value |
|--------|-------|
| Tests Run | 1992 |
| Passing | ✅ 1956 |
| Failing | ❌ 36 |
| Pass Rate | 98% |
| Org Coverage | 90% |

## ❌ Failing Tests

### `ActionCadenceTrackerAITriggerHandlerTest`
- `testNoUpdateLead_WorkingStatus`: System.AssertException: Assertion Failed: Lead status should remain unchanged: Expected: Qualify, Ac

### `OpportunityContactRoleAIHandlerTest`
- `testInfluenceCreationAndOppUpdate`: System.AssertException: Assertion Failed: Latest Lead Gen Rep Poulated: Expected: 005O200000TwlykIAB

### `LastTouchLeadCloneUnifiedScheduler_Test`
- `testScheduleCreatesCronJob`: LastTouchLeadCloneUnifiedBatch.LeadCloneBatchException:  ===> Error while resolving Avery user for L
- `testSchedulerRunsBatch`: LastTouchLeadCloneUnifiedBatch.LeadCloneBatchException:  ===> Error while resolving Avery user for L

### `AssignOwnerToSalesTargetLeadTest`
- `TestAccountActiveOwner`: System.AssertException: Assertion Failed: Account Owner is set to lead Owner: Expected: 005fK000001T
- `TestAccountInActiveOwner`: System.AssertException: Assertion Failed: Account Owner manager is set to lead Owner: Expected: 005f

### `ContractHandlerTest`
- `testCreateContractSuccess`: System.AssertException: Assertion Failed: Contract should have been created.

### `ESMCustomMatrixEligibilityImplTest`
- `testcheckEligibility`: System.NullPointerException: Attempt to de-reference a null object

### `TaskAUHandlerTest`
- `testAllTasksToCompleted`: System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTempla
- `testDMLException`: System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTempla
- `testDMLExceptionAUHandler`: System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTempla
- `testTaskStatusChange_ToCompleted`: System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTempla
- `testTaskStatusChange_ToInProgress`: System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTempla

### `TestFactory`
- `TestMethod1`: System.DmlException: Insert failed. First exception on row 0; first error: INSUFFICIENT_ACCESS_ON_CR

### `PreventDuplicateDSRCreationTest`
- `preventCreationOfDuplicateDSRsTest1`: System.NoAccessException: No access to entity 'Brownfield_Opportunity__dlm'
- `preventCreationOfDuplicateDSRsTest2`: System.NoAccessException: No access to entity 'Brownfield_Opportunity__dlm'

### `AccountProcessBatchHandlerTest`
- `testAccMovesToAwait`: System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'
- `testAccUnderReview`: System.AssertException: Assertion Failed: Account set to under review when D&b info is missing: Expe
- `testEnrichAccountDC`: System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'
- `testNullRefCreatingParent`: System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'

### `SupportTeamMemberTriggerTest`
- `testAUSuccessLeadStatusChangeOnly`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBDFailureLeadOfDifferentTeam`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBDFailureNonLeadUnauthorizedDeletion`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBDFailureSelfDeletionPrevention`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBDSuccessAuthorizedDeletion`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBIFailureSelfLeadCreationRule2`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBIFailureUnauthorizedCreationRule1`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBUFailureSelfUpdatePrevention`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBUFailureUnauthorizedModification`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testBUSuccessAuthorizedModification`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testCatchDMLException`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testGroupAdderSuccessAddGroupMembership`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testGroupRemoverSuccessRemoveGroupMembership`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testSuccessRemoveGroupMembership`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E
- `testSuccessUpdateExistingSettingAndDeleteSetting`: System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_E

## 📉 Low Coverage (< 95%)

| Class | Coverage | Lines |
|-------|----------|-------|
| `AccountEmailBatch` | 4.3% | 1/23 |
| `TaskActionPlanUpdateQueueable` | 20.3% | 12/59 |
| `AccountProcessBatchHandler` | 30.1% | 40/133 |
| `LeadAgentTriggerHandler` | 39.3% | 11/28 |
| `ESMCustomMatrixEligibilityImpl` | 59.9% | 115/192 |
| `ApprovalWorkItemService` | 64.8% | 35/54 |
| `AccountApprovalBatchQueueable` | 68.8% | 11/16 |
| `AssignOwnerToSalesTargetLead` | 68.8% | 11/16 |
| `CommunitiesSelfRegController` | 76.2% | 32/42 |
| `LeadAfterTriggerService` | 79.3% | 23/29 |
| `EmailMessageHandler` | 79.4% | 50/63 |
| `MicrobatchSelfRegController` | 80.0% | 32/40 |
| `LogBatchPurger` | 80.3% | 110/137 |
| `SiteRegisterController` | 81.5% | 22/27 |
| `ApprovalWorkItemCallout` | 81.8% | 9/11 |
