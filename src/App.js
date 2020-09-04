import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import HomePage from './components/home/HomePage';
import { HomeworkPage } from './components/homework/HomeworkPage';
import { QuickLinksPage } from './components/quicklinks/QuickLinksPage';
import { SchedulePage } from './components/schedule/SchedulePage';
import { SettingsPage } from './components/settings/SettingsPage';
import LoginPage from './components/login/LoginPage';
import PrivateRoute from './security/PrivateRoute';


function App() {
	return (
		<>
		<Auth0Provider
			domain="whsremote.us.auth0.com"
			clientId="PyU80nSaxxaGYtH8miA0jHV76hjBZ0ap"
			redirectUri={window.location.origin + "/home"}
			audience="whsremote"
		>

			<div>
				<Router>
					<Switch>
						<PrivateRoute path="/homework" component={HomeworkPage} />

						<PrivateRoute path="/quicklinks" component={QuickLinksPage} />

						<PrivateRoute path="/schedule" component={SchedulePage} />

						<PrivateRoute path="/settings" component={SettingsPage} />
						
						<PrivateRoute path="/home" component={HomePage}/>
						
						<Route exact path="/">
							<LoginPage />
						</Route>

						
					</Switch>
				</Router>
			</div>

  		</Auth0Provider>

		</>
		);
	}
	
	export default App;
	