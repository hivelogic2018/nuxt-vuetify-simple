const sectionSuccessHandler = (data: any) => {
	console.log('sectionSuccessHandler triggered', data)
	if (data && typeof data === 'object') {
		return { ...data, processedAt: new Date().toISOString() }
	}
	return { data, processedAt: new Date().toISOString() }
}

const sectionFailureHandler = (error: Error) => {
	console.error('sectionFailureHandler triggered', error.message)
	return { error: 'An error occurred while processing the section.', details: error.message }
}

export const handlerRegistry = {
	sectionSuccessHandler,
	sectionFailureHandler,
}

export type HandlerKey = keyof typeof handlerRegistry
