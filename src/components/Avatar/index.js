import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const Avatar = loadable(() => import(/* webpackChunkName: "avatar_component" */'./Avatar'));

export default withErrorHandler(Avatar);
