import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const Field = loadable(() => import(/* webpackChunkName: "field_component" */'./Field'));

export default withErrorHandler(Field);
