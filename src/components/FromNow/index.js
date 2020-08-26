import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const FromNow = loadable(() => import(/* webpackChunkName: "from_now_component" */'./FromNow'));

export default withErrorHandler(FromNow);
