/* Pages of the site: route id -> { title, render } */

import { home } from './home.js';
import { download } from './download.js';
import { tutorial } from './tutorial.js';
import { manual } from './manual.js';
import { faq } from './faq.js';
import { citing } from './citing.js';
import { people } from './people.js';

export const pages = { home, download, tutorial, manual, faq, citing, people };
