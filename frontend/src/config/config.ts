// config 관련 모아놓는 폴더
import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

export type Action = { type: 'PLUS' } | { type: 'MINUS' };

export interface FeedBackReducer {
  state: number;
  dispatch: Dispatch<Action>;
}

export function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'PLUS':
      return state + 1;
    case 'MINUS':
      if (state === 1) {
        return state;
      } else {
        return state - 1;
      }
    default:
      return state;
  }
}
