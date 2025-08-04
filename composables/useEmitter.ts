import mitt from 'mitt'

type Events = {
	'theme-changed': string
}

export const emitter = mitt<Events>()
