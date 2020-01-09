import React, { Fragment } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage/HomePage';
import About from '../components/About';
import HelpPage from '../components/HelpPage';
import EditMealPage from '../containers/EditMealPage/EditMealPage';
import Footer from '../components/Footer/Footer';
import AddMealPage from '../containers/AddMealPage/AddMealPage'
import AddPartnerPage from "../containers/AddPartnerPage/AddPartnerPage";
import MealList from "../containers/MealList/MealList";
import EditPartnerPage from "../containers/EditPartnerPage/EditPartnerPage";
import Header from '../components/Header/Header'
import PrivateRoute from './PrivateRoute'

const history = createHistory()

const AppRouter = () => (
    <Router history={history} >
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute path='/cozinhando' component={AddMealPage} />
          <Route path='/cadastro' component={AddPartnerPage} />
          <Route path='/refeicoes' component={MealList} />
          <Route path='/cozinhando/porque' component={NotFoundPage} />
          <Route path='/cozinhando/hospitalidade' component={NotFoundPage} />
          <Route path='/cozinhando/responsabilidade' component={NotFoundPage} />
          <PrivateRoute path='/editar/usuario/:id' component={EditPartnerPage} />
          <PrivateRoute path='/editar/refeicao/:id' component={EditMealPage} />
          <PrivateRoute path='/painel' component={NotFoundPage} />
          <Route path='/sobre' component={About} />
          <Route path='/carreiras' component={NotFoundPage} />
          <Route path='/ajuda' component={HelpPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Route path="/" component={Footer} />
      </Fragment>
    </Router>
);

export { history, AppRouter as default}
