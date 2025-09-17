import { makeInstaller } from '@pc-element/utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import '@pc-element/theme/index.css';

library.add(fas);
const installer = makeInstaller(components);

export * from '../components';
export default installer;
