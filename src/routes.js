import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import FeaturesIndex from './components/features_index';
import FeaturesNew from './components/features_new';
import FeaturesShow from './components/features_show';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={FeaturesIndex} />
		<Route path="features/new" component={FeaturesNew} />
		<Route path="features/:id" component={FeaturesShow} />
	</Route>
);