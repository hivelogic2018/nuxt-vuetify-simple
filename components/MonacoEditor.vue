<script setup lang="ts">
import { onMounted, ref } from 'vue'

const editorContainer = ref<HTMLDivElement | null>(null)

onMounted(async () => {
	if (!import.meta.client) return

	const monaco = await import('monaco-editor')

	// monaco.editor.defineTheme('my-dark-theme', {
	//   base: 'vs-dark',
	//   inherit: true,
	//   rules: [
	//     { token: 'comment', fontStyle: 'italic', foreground: '6A9955' },
	//     { token: 'string', foreground: 'CE9178' },
	//     { token: 'keyword', foreground: 'C586C0' },
	//     { token: 'number', foreground: 'B5CEA8' },
	//   ],
	//   colors: {
	//     'editor.background': '#1A3B46',
	//     'editor.lineHighlightBackground': '#333333',
	//   },
	// })

	monaco.editor.defineTheme('my-dark-theme', {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '9CA3AF', fontStyle: 'italic' },
			{ token: 'string', foreground: '98C379' },
			{ token: 'keyword', foreground: 'C586C0' },
			{ token: 'number', foreground: 'D19A66' },
			{ token: 'identifier', foreground: 'E5C07B' },
			{ token: 'type.identifier', foreground: '61AFEF' },
			{ token: 'tag', foreground: 'E06C75' },
			{ token: 'attribute.name', foreground: 'D19A66' },
			{ token: 'delimiter', foreground: 'ABB2BF' },
		],
		colors: {
			// Background & foreground
			'editor.background': '#083c47',            // Matches FormKit base editor background
			'editor.foreground': '#ffffff',

			// Cursor & selection
			'editor.lineHighlightBackground': '#154f5b',
			'editor.lineHighlightBorder': '#083c47',
			'editor.selectionBackground': '#154f5b',
			'editor.inactiveSelectionBackground': '#154f5b',
			'editorCursor.foreground': '#AEAFAD',
			'editorLineNumber.foreground': '#475569',

			// Find highlights
			'editor.findMatchBackground': '#515c6a',
			'editor.findMatchHighlightBackground': 'rgba(234, 92, 0, 0.33)',

			// Brackets
			'editorBracketHighlight.foreground1': '#ffd700',
			'editorBracketHighlight.foreground2': '#da70d6',
			'editorBracketHighlight.foreground3': '#179fff',

			// Guides
			'editorIndentGuide.background': '#666666',
			'editorIndentGuide.activeBackground': '#999999',
		},
	})


	// monaco.editor.defineTheme('my-dark-theme', {
	//   base: 'vs-dark',
	//   inherit: true,
	//   rules: [
	//     { token: 'comment', foreground: '9CA3AF', fontStyle: 'italic' },       // muted slate
	//     { token: 'string', foreground: '34D399' },                             // emerald
	//     { token: 'keyword', foreground: 'C084FC' },                            // violet
	//     { token: 'number', foreground: 'FBBF24' },                             // amber
	//     { token: 'identifier', foreground: 'F472B6' },                         // pink
	//     { token: 'type.identifier', foreground: '60A5FA' },                    // blue
	//     { token: 'tag', foreground: 'A78BFA' },                                // purple
	//     { token: 'attribute.name', foreground: 'FCD34D' },                     // yellow
	//     { token: 'delimiter', foreground: 'D1D5DB' },                          // light gray
	//   ],
	//   colors: {
	//     'editor.background': '#1A3B46',              // slate-900
	//     'editor.foreground': '#E2E8F0',              // slate-200
	//     'editor.lineHighlightBackground': '#1E293B', // slate-800
	//     'editorCursor.foreground': '#FCD34D',        // yellow-300
	//     'editorLineNumber.foreground': '#475569',    // slate-600
	//     'editor.selectionBackground': '#2563EB44',   // blue-600 with transparency
	//     'editor.inactiveSelectionBackground': '#1E3A8A33', // blue-900 soft
	//   }
	// })


	monaco.editor.create(editorContainer.value!, {
		value: '// Start coding!',
		language: 'javascript',
		theme: 'my-dark-theme',
		minimap: { enabled: false },
		automaticLayout: true,
	})
})
</script>

<template>
	<div ref="editorContainer" style="height: 400px; width: 100%;" class="view-lines monaco-mouse-cursor-text monaco-editor-container"/>
</template>
