import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavbarComponent from './components/ui/NavbarComponent';
import PostDetails from './components/PostDetails';
import UserPost from './components/UserPosts';
import checkForToken from './helpers/checkForToken';
import PrivateRoute from './routes/PrivateRoute';
import store from './store/store';

const Posts = React.lazy(() => import('./components/Posts'), 'default');
const SignIn = React.lazy(() => import('./components/SignIn'), 'default');
const SignUp = React.lazy(() => import('./components/SignUp'), 'default');

checkForToken(); //first time we check if there is a user logged in

export const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<div className="mb-2">
						<NavbarComponent/>
					</div>
					<Container>
						<ToastContainer />
						<Suspense fallback={<div>Loading</div>}>
							<Switch>
								<Route exact path="/" component={Posts}></Route>
								<Route exact path="/signin" component={SignIn} />
								<Route exact path="/signup" component={SignUp} />
								<Route exact path="/post/:id" component={PostDetails} />
								<PrivateRoute exact path="/posts" component={UserPost}></PrivateRoute>
							</Switch>
						</Suspense>
					</Container>
				</Router>
			</Provider>
		</>
	);
};
