/* eslint-env browser */
import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import {version} from './package';

document.querySelector('.version').innerText = `v${version}`;
