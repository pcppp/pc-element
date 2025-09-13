import { makeInstaller } from '@pc-element/utils';
import components from './components';
import '@pc-element/theme/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const installer = makeInstaller(components);

export * from '@pc-element/components';
export default installer;
