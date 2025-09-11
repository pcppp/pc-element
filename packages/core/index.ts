import { makeInstaller } from '@pc-element/utils';
import components from './components';
const installer = makeInstaller(components);
export * from '@pc-element/components';
export default installer;
