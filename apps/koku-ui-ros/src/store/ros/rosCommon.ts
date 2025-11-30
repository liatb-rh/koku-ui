import type { RosPathsType, RosType } from '@koku-ui/utils/http/reports/ros';
export const rosStateKey = 'ros';

export function getFetchId(rosPathsType: RosPathsType, rosType: RosType, rosQueryString: string) {
  return `${rosPathsType}--${rosType}--${rosQueryString}`;
}
