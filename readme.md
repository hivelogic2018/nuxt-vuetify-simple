yarn, yarn dev,

to remove vite cache: `rm -rf .nuxt node_modules/.cache/vite`

to run with logs: `npm run dev 2>&1 | tee nuxt-dev.log`


still having

JSON layout encountered some validation errors:

http://localhost:3000/_nuxt/node_modules/@json-layout/core/src/compile/index.js?v=2b0bb96b


{//properties/firstName: Array(4)}
//properties/firstName
:
Array(4)
0
:
"options.markdown is not a function"
1
:
"failed to normalize layout, use default component"
2
:
"options.markdown is not a function"
3
:
"failed to produce default layout, hide this fragment"
length
:
4