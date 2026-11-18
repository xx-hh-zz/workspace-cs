export interface CurrentUser {
  name: string;
  role: 'applicant' | 'approver' | 'admin';
}

export const useCurrentUser = (): CurrentUser => {
  return { name: '当前用户', role: 'admin' };
};

export default useCurrentUser;
