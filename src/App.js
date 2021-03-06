import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store/store';
import NavbarComponent from './components/ui/NavbarComponent';
import checkForToken from './helpers/checkForToken';
import PrivateRoute from './routes/PrivateRoute';
import UserPost from './components/UserPost';

const Post = React.lazy(() => import('./components/Post'), 'default');
const SignIn = React.lazy(() => import('./components/SignIn'), 'default');
const SignUp = React.lazy(() => import('./components/SignUp'), 'default');

checkForToken(); //first time we check if there is a user logged in

export const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<NavbarComponent />
					<Suspense fallback={<div>Loading</div>}>
						<Switch>
							<Route exact path="/" component={Post}></Route>

							<Route exact path="/signin" component={SignIn} />
							<Route exact path="/signup" component={SignUp} />
							<PrivateRoute exact path="/posts" component={UserPost}></PrivateRoute>
						</Switch>
					</Suspense>
				</Router>
			</Provider>
		</>
	);
};
