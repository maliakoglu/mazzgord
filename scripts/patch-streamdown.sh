#!/bin/bash
# streamdown shiki patch — bundledLanguages -> createHighlighterCore
f="node_modules/streamdown/dist/code-block-IT6T5CEO.js"
if [ ! -f "$f" ] || grep -q "createHighlighterCore" "$f"; then
  exit 0
fi
cp "$f" "$f.bak"
python3 -c "
f='$f'
with open(f) as fh: c=fh.read()
c=c.replace(\"import {createHighlighter,bundledLanguages}from'shiki'\",\"import {createHighlighterCore}from'shiki/core';import gl from'shiki/themes/github-light.mjs';import gd from'shiki/themes/github-dark.mjs'\")
old='T=e=>Object.hasOwn(bundledLanguages,e),K=(e,t)=>{let o=T(e)?e:\"text\",r=E(o,t);if(m.has(r))return m.get(r);let s=createHighlighter({themes:t,langs:[o],engine:\$});return m.set(r,s),s}'
new='bundledLanguages={bash:()=>import(\"shiki/langs/bash.mjs\"),css:()=>import(\"shiki/langs/css.mjs\"),go:()=>import(\"shiki/langs/go.mjs\"),html:()=>import(\"shiki/langs/html.mjs\"),javascript:()=>import(\"shiki/langs/javascript.mjs\"),json:()=>import(\"shiki/langs/json.mjs\"),jsx:()=>import(\"shiki/langs/jsx.mjs\"),markdown:()=>import(\"shiki/langs/markdown.mjs\"),python:()=>import(\"shiki/langs/python.mjs\"),shellscript:()=>import(\"shiki/langs/shellscript.mjs\"),sql:()=>import(\"shiki/langs/sql.mjs\"),toml:()=>import(\"shiki/langs/toml.mjs\"),tsx:()=>import(\"shiki/langs/tsx.mjs\"),typescript:()=>import(\"shiki/langs/typescript.mjs\"),yaml:()=>import(\"shiki/langs/yaml.mjs\"),sh:()=>import(\"shiki/langs/bash.mjs\"),shell:()=>import(\"shiki/langs/shellscript.mjs\"),yml:()=>import(\"shiki/langs/yaml.mjs\"),py:()=>import(\"shiki/langs/python.mjs\"),md:()=>import(\"shiki/langs/markdown.mjs\"),golang:()=>import(\"shiki/langs/go.mjs\")},bundledThemes={\"github-light\":gl,\"github-dark\":gd},T=e=>Object.hasOwn(bundledLanguages,e),K=(e,t)=>{let o=T(e)?e:\"text\",r=E(o,t);if(m.has(r))return m.get(r);let th=t.map(x=>typeof x===\"string\"?(bundledThemes[x]||x):x);let s=T(e)?bundledLanguages[e]().then(mod=>createHighlighterCore({themes:th,langs:[mod.default||mod],engine:\$})):createHighlighterCore({themes:th,langs:[],engine:\$});return m.set(r,s),s}'
if old not in c:
    print('ERROR: old T,K not found')
    exit(1)
c=c.replace(old,new)
with open(f,'w') as fh: fh.write(c)
print('streamdown patched successfully')
"
