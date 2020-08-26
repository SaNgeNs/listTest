import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const Tag = loadable(() => import(/* webpackChunkName: "tag_component" */'./Tag'));

export default withErrorHandler(Tag);
