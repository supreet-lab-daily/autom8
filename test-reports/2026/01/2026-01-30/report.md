# 🧪 Salesforce Apex Test Report

**Generated:** 2026-01-30T15:17:48.127Z
**Test Run ID:** 707O200002A6ai3
**Workflow Run:** [View Details](https://github.com/supreet-lab-daily/autom8/actions/runs/21519937563)

---

## 🔴 Summary

| Metric | Value |
|--------|-------|
| **Tests Run** | 1992 |
| **Passing** | ✅ 1952 |
| **Failing** | ❌ 40 |
| **Pass Rate** | 98% |
| **Outcome** | Failed |
| **Org-Wide Coverage** | 90% |
| **Test Run Coverage** | 93% |
| **Classes Below 95%** | ⚠️ 45 |

---

## ❌ Failing Test Classes

### `SupportTeamMemberTriggerTest`

**Failed Methods:**

#### `testAUSuccessLeadStatusChangeOnly`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBDFailureLeadOfDifferentTeam`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBDFailureNonLeadUnauthorizedDeletion`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBDFailureSelfDeletionPrevention`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBDSuccessAuthorizedDeletion`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBIFailureSelfLeadCreationRule2`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBIFailureUnauthorizedCreationRule1`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBUFailureSelfUpdatePrevention`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBUFailureUnauthorizedModification`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testBUSuccessAuthorizedModification`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testCatchDMLException`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testGroupAdderSuccessAddGroupMembership`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testGroupRemoverSuccessRemoveGroupMembership`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testSuccessRemoveGroupMembership`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

#### `testSuccessUpdateExistingSettingAndDeleteSetting`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, You can only create Support Team Member records for the teams you are a Lead of (a6eO20000005hSXIAY).: []
```

**Stack Trace:**
```
Class.SupportTeamMemberTriggerTest.makeBaseData: line 155, column 1
```

### `TaskAUHandlerTest`

**Failed Methods:**

#### `testAllTasksToCompleted`

**Error Message:**
```
System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTemplateVersion. Ensure a "Final" ActionPlanTemplate exists that is of "Sales" type and targets "Opportunity": List has no rows for assignment to SObject
```

**Stack Trace:**
```
Class.TaskAUHandlerTest.testAllTasksToCompleted: line 234, column 1
```

#### `testDMLException`

**Error Message:**
```
System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTemplateVersion. Ensure a "Final" ActionPlanTemplate exists that is of "Sales" type and targets "Opportunity": List has no rows for assignment to SObject
```

**Stack Trace:**
```
Class.TaskAUHandlerTest.testDMLException: line 339, column 1
```

#### `testDMLExceptionAUHandler`

**Error Message:**
```
System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTemplateVersion. Ensure a "Final" ActionPlanTemplate exists that is of "Sales" type and targets "Opportunity": List has no rows for assignment to SObject
```

**Stack Trace:**
```
Class.TaskAUHandlerTest.testDMLExceptionAUHandler: line 460, column 1
```

#### `testTaskStatusChange_ToCompleted`

**Error Message:**
```
System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTemplateVersion. Ensure a "Final" ActionPlanTemplate exists that is of "Sales" type and targets "Opportunity": List has no rows for assignment to SObject
```

**Stack Trace:**
```
Class.TaskAUHandlerTest.testTaskStatusChange_ToCompleted: line 136, column 1
```

#### `testTaskStatusChange_ToInProgress`

**Error Message:**
```
System.AssertException: Assertion Failed: TEST SETUP ERROR: Failed to find suitable ActionPlanTemplateVersion. Ensure a "Final" ActionPlanTemplate exists that is of "Sales" type and targets "Opportunity": List has no rows for assignment to SObject
```

**Stack Trace:**
```
Class.TaskAUHandlerTest.testTaskStatusChange_ToInProgress: line 38, column 1
```

### `LastTouchLeadCloneUnifiedScheduler_Test`

**Failed Methods:**

#### `testScheduleCreatesCronJob`

**Error Message:**
```
LastTouchLeadCloneUnifiedBatch.LeadCloneBatchException:  ===> Error while resolving Avery user for LastTouchLeadCloneUnifiedBatch : Avery (Einstein Agent User) could not be resolved.
```

**Stack Trace:**
```
Class.LastTouchLeadCloneUnifiedBatch.resolveAveryUser: line 223, column 1
Class.LastTouchLeadCloneUnifiedBatch.start: line 45, column 1
```

#### `testSchedulerRunsBatch`

**Error Message:**
```
LastTouchLeadCloneUnifiedBatch.LeadCloneBatchException:  ===> Error while resolving Avery user for LastTouchLeadCloneUnifiedBatch : Avery (Einstein Agent User) could not be resolved.
```

**Stack Trace:**
```
Class.LastTouchLeadCloneUnifiedBatch.resolveAveryUser: line 223, column 1
Class.LastTouchLeadCloneUnifiedBatch.start: line 45, column 1
```

### `TestFactory`

**Failed Methods:**

#### `TestMethod1`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY, insufficient access rights on cross-reference id: []
```

**Stack Trace:**
```
Class.TestFactory.TestMethod1: line 261, column 1
```

### `AssignOwnerToSalesTargetLeadTest`

**Failed Methods:**

#### `TestAccountActiveOwner`

**Error Message:**
```
System.AssertException: Assertion Failed: Account Owner is set to lead Owner: Expected: 005fK000001TKysQAG, Actual: 005O200000TjwryIAB
```

**Stack Trace:**
```
Class.AssignOwnerToSalesTargetLeadTest.TestAccountActiveOwner: line 73, column 1
```

#### `TestAccountInActiveOwner`

**Error Message:**
```
System.AssertException: Assertion Failed: Account Owner manager is set to lead Owner: Expected: 005fK000001TKysQAG, Actual: 005O200000TjwrxIAB
```

**Stack Trace:**
```
Class.AssignOwnerToSalesTargetLeadTest.TestAccountInActiveOwner: line 97, column 1
```

### `AccountProcessBatchHandlerTest`

**Failed Methods:**

#### `testAccMovesToAwait`

**Error Message:**
```
System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'
```

**Stack Trace:**
```
Class.AccountProcessBatchHandlerTest.testAccMovesToAwait: line 123, column 1
```

#### `testAccUnderReview`

**Error Message:**
```
System.AssertException: Assertion Failed: Account set to under review when D&b info is missing: Expected: Under review, Actual: New
```

**Stack Trace:**
```
Class.AccountProcessBatchHandlerTest.testAccUnderReview: line 172, column 1
```

#### `testEnrichAccountDC`

**Error Message:**
```
System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'
```

**Stack Trace:**
```
Class.AccountProcessBatchHandlerTest.testEnrichAccountDC: line 44, column 1
```

#### `testNullRefCreatingParent`

**Error Message:**
```
System.NoAccessException: No access to entity 'DNB_Account_Data_V1__dlm'
```

**Stack Trace:**
```
Class.AccountProcessBatchHandlerTest.testNullRefCreatingParent: line 93, column 1
```

### `ContractHandlerTest`

**Failed Methods:**

#### `testCreateContractSuccess`

**Error Message:**
```
System.AssertException: Assertion Failed: Contract should have been created.
```

**Stack Trace:**
```
External entry point
Class.ContractHandlerTest.testCreateContractSuccess: line 309, column 1
```

### `ESMCustomMatrixEligibilityImplTest`

**Failed Methods:**

#### `testcheckEligibility`

**Error Message:**
```
System.NullPointerException: Attempt to de-reference a null object
```

**Stack Trace:**
```
Class.ESMCustomMatrixEligibilityImpl.checkEligibility: line 207, column 1
Class.ESMCustomMatrixEligibilityImpl.invokeMethod: line 36, column 1
Class.ESMCustomMatrixEligibilityImpl.call: line 65, column 1
Class.ESMCustomMatrixEligibilityImplTest.testcheckEligibility: line 63, column 1
```

### `LeadSLAAutomationBatchTest`

**Failed Methods:**

#### `testBatchScheduler`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record: []
```

**Stack Trace:**
```
Class.LeadSLAAutomationBatchTest.setupData: line 36, column 1
```

#### `testInvalidUsers`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record: []
```

**Stack Trace:**
```
Class.LeadSLAAutomationBatchTest.setupData: line 36, column 1
```

#### `testLeadOneDaySLA`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record: []
```

**Stack Trace:**
```
Class.LeadSLAAutomationBatchTest.setupData: line 36, column 1
```

#### `testLeadThreeDaySLA`

**Error Message:**
```
System.DmlException: Insert failed. First exception on row 0; first error: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record: []
```

**Stack Trace:**
```
Class.LeadSLAAutomationBatchTest.setupData: line 36, column 1
```

### `ActionCadenceTrackerAITriggerHandlerTest`

**Failed Methods:**

#### `testNoUpdateLead_WorkingStatus`

**Error Message:**
```
System.AssertException: Assertion Failed: Lead status should remain unchanged: Expected: Qualify, Actual: Disqualified
```

**Stack Trace:**
```
Class.ActionCadenceTrackerAITriggerHandlerTest.testNoUpdateLead_WorkingStatus: line 165, column 1
```

### `PreventDuplicateDSRCreationTest`

**Failed Methods:**

#### `preventCreationOfDuplicateDSRsTest1`

**Error Message:**
```
System.NoAccessException: No access to entity 'Brownfield_Opportunity__dlm'
```

**Stack Trace:**
```
Class.PreventDuplicateDSRCreationTest.preventCreationOfDuplicateDSRsTest1: line 49, column 1
```

#### `preventCreationOfDuplicateDSRsTest2`

**Error Message:**
```
System.NoAccessException: No access to entity 'Brownfield_Opportunity__dlm'
```

**Stack Trace:**
```
Class.PreventDuplicateDSRCreationTest.preventCreationOfDuplicateDSRsTest2: line 72, column 1
```

---

## 📉 Classes Below 95% Coverage

> **Warning:** 45 classes are below the 95% coverage threshold.

| Class | Coverage | Lines Covered/Total | Last Modified By |
|-------|----------|---------------------|------------------|
| `AccountEmailBatch` | 🔴 4.3% | 1/23 | Unknown |
| `TaskActionPlanUpdateQueueable` | 🔴 20.3% | 12/59 | Unknown |
| `AccountProcessBatchHandler` | 🔴 30.1% | 40/133 | Unknown |
| `LeadAgentTriggerHandler` | 🔴 39.3% | 11/28 | Unknown |
| `ESMCustomMatrixEligibilityImpl` | ⚠️ 59.9% | 115/192 | Unknown |
| `ApprovalWorkItemService` | ⚠️ 64.8% | 35/54 | Unknown |
| `AccountApprovalBatchQueueable` | ⚠️ 68.8% | 11/16 | Unknown |
| `AssignOwnerToSalesTargetLead` | ⚠️ 68.8% | 11/16 | Unknown |
| `CommunitiesSelfRegController` | ⚠️ 76.2% | 32/42 | Unknown |
| `LeadAfterTriggerService` | ⚠️ 79.3% | 23/29 | Unknown |
| `EmailMessageHandler` | ⚠️ 79.4% | 50/63 | Unknown |
| `MicrobatchSelfRegController` | ⚠️ 80.0% | 32/40 | Unknown |
| `LogBatchPurger` | ⚠️ 80.3% | 110/137 | Unknown |
| `SiteRegisterController` | ⚠️ 81.5% | 22/27 | Unknown |
| `ApprovalWorkItemCallout` | ⚠️ 81.8% | 9/11 | Unknown |

_... and 30 more classes below threshold_

---

_Report generated automatically by Salesforce DevOps Pipeline_
