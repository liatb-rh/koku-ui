import React from 'react';
import type { NavigateFunction } from 'react-router/dist/lib/hooks';
import type { Location } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface RouteComponentProps {
  location: Location;
  navigate: NavigateFunction;
  params: any;
}

export interface RouterComponentProps {
  router: RouteComponentProps;
}

export const withRouter = (Component: any) => {
  function ComponentWithRouterProp(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};


