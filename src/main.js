/* QuarkSuit website: page frame, menu bar and hash routing.
   A link such as #documentation/d-score opens the Documentation at the element with id "d-score".
   Old #manual links open the Documentation. */

import './site.css';
import { pages } from './pages/index.js';

const MENU = [
  ['home', 'Home'],
  ['download', 'Download'],
  ['tutorial', 'Tutorial'],
  ['documentation', 'Documentation'],
  ['faq', 'FAQ'],
  ['citing', 'Citing'],
  ['people', 'People'],
];
const UPDATED = '7 October 2026';
const ALIAS = { manual: 'documentation' };

const app = document.getElementById('app');
app.innerHTML = `
  <div class="page">
    <header class="masthead">
      <div class="title"><a href="#home"><img class="logo" src="logo.png" alt="" width="60" height="60">QuarkSuit</a></div>
      <div class="subtitle">molecular docking, structure preparation and ligand design for Windows</div>
      <div class="org">TCCG Center &middot; University of Zakho</div>
    </header>
    <nav class="menubar">
      ${MENU.map(([id, label], i) => `<span class="item"><a href="#${id}" data-page="${id}">${label}</a>${i < MENU.length - 1 ? '<span class="sep">|</span>' : ''}</span>`).join('')}
    </nav>
    <main class="content" id="content"></main>
    <footer class="footer">
      QuarkSuit v1 &middot; TCCG Center, University of Zakho &middot; this page was last updated on ${UPDATED}
    </footer>
  </div>`;

const content = document.getElementById('content');

function show() {
  const [name, anchor] = decodeURIComponent(location.hash.replace(/^#/, '')).split('/');
  const known = pages[name] ? name : ALIAS[name];
  const id = known || 'home';
  const page = pages[id];
  content.innerHTML = page.render();
  document.title = id === 'home' ? 'QuarkSuit - molecular docking for Windows' : `${page.title} - QuarkSuit`;
  document.querySelectorAll('.menubar a').forEach(a => a.classList.toggle('current', a.dataset.page === id));
  const target = anchor && document.getElementById(anchor);
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

window.addEventListener('hashchange', show);
show();
