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

interface RestAction {
  type: 'xhr';
  method: 'POST' | 'GET';
  url: string;
  onSuccess?: ActionOutcome;
  onFailure?: ActionOutcome;
}

interface GraphqlAction {
  type: 'graphql';
  query: string;
  url: string;
  variables?: Record<string, unknown>;
  onSuccess?: ActionOutcome;
  onFailure?: ActionOutcome;
}

type LoadAction = RestAction | GraphqlAction;

interface FormSection {
  type: 'FORM';
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