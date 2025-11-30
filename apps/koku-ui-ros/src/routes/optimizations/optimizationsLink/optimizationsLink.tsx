import { OptimizationsLink as UiOptimizationsLink } from '@koku-ui/ui-lib/components/optimizations/link';
import { getQuery } from '@koku-ui/utils/http/queries/query';
import type { RosReport } from '@koku-ui/utils/http/reports/ros';
import { RosPathsType, RosType } from '@koku-ui/utils/http/reports/ros';
import type { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { rosActions, rosSelectors } from 'store/ros';

export interface OptimizationsLinkOwnProps {
  cluster?: string | string[];
  linkPath?: string;
  linkState?: any;
  project?: string | string[];
}

export interface OptimizationsLinkStateProps {
  report?: RosReport;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
}

type OptimizationsLinkProps = OptimizationsLinkOwnProps & OptimizationsLinkStateProps;

const reportPathsType = RosPathsType.recommendations;
const reportType = RosType.ros;

const OptimizationsLink: React.FC<OptimizationsLinkProps> = ({ cluster, linkPath, linkState, project }) => {
  const { report } = useMapToProps({ cluster, project });
  const count = report?.meta ? report.meta.count : 0;
  return <UiOptimizationsLink count={count} linkPath={linkPath} linkState={linkState} />;
};

const useMapToProps = ({ cluster, project }: OptimizationsLinkOwnProps): OptimizationsLinkStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const reportQuery = {
    ...(cluster && { cluster }), // Flattened cluster filter
    ...(project && { project }), // Flattened project filter
  };
  const reportQueryString = getQuery(reportQuery);
  const report: any = useSelector((state: RootState) =>
    rosSelectors.selectRos(state, reportPathsType, reportType, reportQueryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    rosSelectors.selectRosFetchStatus(state, reportPathsType, reportType, reportQueryString)
  );
  const reportError = useSelector((state: RootState) =>
    rosSelectors.selectRosError(state, reportPathsType, reportType, reportQueryString)
  );

  useEffect(() => {
    if ((cluster || project) && !reportError && reportFetchStatus !== FetchStatus.inProgress) {
      dispatch(rosActions.fetchRosReport(reportPathsType, reportType, reportQueryString));
    }
  }, [cluster, project, reportQueryString]);

  return {
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
  };
};

export default OptimizationsLink;
