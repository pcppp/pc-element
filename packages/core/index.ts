import { makeInstaller } from '@pc-element/utils';
import components from './components';
import '@pc-element/theme/index.css';
const installer = makeInstaller(components);
export * from '@pc-element/components';
export default installer;
