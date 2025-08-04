export default defineEventHandler(async (event) => {
	console.log(`Received ${event.method} request.`)
	return { status: 'success', message: `Method DELETE received.` }
})
