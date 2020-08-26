import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const TypesIcon = loadable(() => import(/* webpackChunkName: "types_icon_component" */'./TypesIcon'));

export default withErrorHandler(TypesIcon);
