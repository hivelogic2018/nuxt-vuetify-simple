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
      { token: 'comment', foreground: '9CA3AF', fontStyle: 'italic' },       // muted slate
      { token: 'string', foreground: '34D399' },                             // emerald
      { token: 'keyword', foreground: 'C084FC' },                            // violet
      { token: 'number', foreground: 'FBBF24' },                             // amber
      { token: 'identifier', foreground: 'F472B6' },                         // pink
      { token: 'type.identifier', foreground: '60A5FA' },                    // blue
      { token: 'tag', foreground: 'A78BFA' },                                // purple
      { token: 'attribute.name', foreground: 'FCD34D' },                     // yellow
      { token: 'delimiter', foreground: 'D1D5DB' },                          // light gray
    ],
    colors: {
      'editor.background': '#1A3B46',              // slate-900
      'editor.foreground': '#E2E8F0',              // slate-200
      'editor.lineHighlightBackground': '#1E293B', // slate-800
      'editorCursor.foreground': '#FCD34D',        // yellow-300
      'editorLineNumber.foreground': '#475569',    // slate-600
      'editor.selectionBackground': '#2563EB44',   // blue-600 with transparency
      'editor.inactiveSelectionBackground': '#1E3A8A33', // blue-900 soft
    }
  })


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
  <div ref="editorContainer" style="height: 400px; width: 100%;" class="view-lines monaco-mouse-cursor-text"></div>
</template>
