import type { FormKitSchemaNode } from '@formkit/core';

interface GoalTrackerData {
  goalType: string;
  name: string;
  notes: string;
  reminder: boolean;
}

interface ActionOutcome {
  targetDataStore?: string;
  successHandler?: string;
  message?: string;
  failureHandler?: string;
}

interface LoadAction {
  type: string;
  method: string;
  url: string;
  onSuccess?: ActionOutcome;
  onFailure?: ActionOutcome;
}

interface FormSection {
  type: string;
  title: string;
  data: GoalTrackerData;
  structure: {
    schema: FormKitSchemaNode[];
  };
  onSubmit: {
    loadAction: LoadAction;
  };
}

interface PageSchema {
  sections: FormSection[];
}

export type { GoalTrackerData, ActionOutcome, LoadAction, FormSection, PageSchema };