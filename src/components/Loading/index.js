import loadable from '@loadable/component';
import withErrorHandler from 'Components/withErrorHandler';

const Loading = loadable(() => import(/* webpackChunkName: "loading_component" */'./Loading'));

export default withErrorHandler(Loading);
