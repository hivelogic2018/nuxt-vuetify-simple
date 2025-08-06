import type { FormKitSchemaNode } from '@formkit/core'

import type { GoalTrackerData } from './goalTracker'

type ActionOutcome = {
	successHandler?: string
	message?: string
	failureHandler?: string
}

type RestAction = {
	type: 'xhr'
	method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
	url: string
	onSuccess?: ActionOutcome
	onFailure?: ActionOutcome
}

type GraphqlAction = {
	type: 'graphql'
	query: string
	url: string
	variables?: Record<string, unknown>
	onSuccess?: ActionOutcome
	onFailure?: ActionOutcome
}

type LoadAction = RestAction | GraphqlAction

type FormSection = {
	type: 'FORM'
	title: string
	data: GoalTrackerData
	structure: {
		schema: FormKitSchemaNode[]
	}
	onSubmit: {
		loadAction: LoadAction
	}
}

type PageSchema = {
	sections: FormSection[]
}

export type { ActionOutcome, LoadAction, FormSection, PageSchema }
