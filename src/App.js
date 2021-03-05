import React from 'react';
import NavbarComponent from './components/ui/NavbarComponent';
import { Switch, Route } from 'react-router-dom';

export const App = () => {
	return (
		<div>
			<Provider store={store}>
				<Switch>
					<Route exact path="/" component={Post}></Route>
				</Switch>
			</Provider>
			<NavbarComponent />
		</div>
	);
};
