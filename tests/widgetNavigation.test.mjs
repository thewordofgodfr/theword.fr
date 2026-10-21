import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

test('verse links select Reading at the first render, including when the module was loaded on Home', async () => {
  const previousWindow = globalThis.window;
  globalThis.window = { location: { hash: '#home', search: '' } };
  try {
    const result = await build({entryPoints:['src/contexts/AppContext.tsx'],bundle:true,platform:'node',format:'esm',write:false,packages:'external',logLevel:'silent'});
    const require = createRequire(import.meta.url);
    const source = result.outputFiles[0].text
      .replaceAll('"react"', JSON.stringify(pathToFileURL(require.resolve('react')).href))
      .replaceAll('"react/jsx-runtime"', JSON.stringify(pathToFileURL(require.resolve('react/jsx-runtime')).href));
    const {AppProvider,useApp} = await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
    const Probe = () => React.createElement('span',{'data-page':useApp().state.currentPage});
    for (const [hash,search,page] of [
      ['#home','?b=John&c=3&v=16','reading'],
      ['#reading','?b=Psalms&c=23&v=1','reading'],
      ['','?book=Genesis&chapter=1&verse=1','reading'],
      ['#home','','home'],
      ['#search','','search'],
      ['#notes','','notes'],
      ['#home','?b=John&c=0','home'],
    ]) {
      globalThis.window.location = {hash,search};
      const html = renderToStaticMarkup(React.createElement(AppProvider,null,React.createElement(Probe)));
      assert.match(html,new RegExp(`data-page="${page}"`), `${search}${hash}`);
    }
  } finally {
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
  }
});
