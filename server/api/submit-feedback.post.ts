export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	console.log('GraphQL endpoint received:', body)

	return {
		data: {
			addComment: {
				comment: body.variables?.comment,
			},
		},
	}
})
