export type ApplyType = 'travel' | 'purchase' | 'reimbursement' | 'other';
export type FormStatus = 'Draft' | 'Pending' | 'Approved' | 'Rejected';

export interface ApprovalRecord {
  action: 'submit' | 'approve' | 'reject';
  operatorName: string;
  operatedAt: string;
  comment?: string;
}

export interface WorkflowForm {
  id: string;
  applicantName: string;
  department: string;
  applyType: ApplyType;
  reason: string;
  destination?: string;
  amount?: number;
  expectedDate?: string;
  remark?: string;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
  approvalHistory: ApprovalRecord[];
}

export interface FormListQuery {
  page?: number;
  pageSize?: number;
  status?: FormStatus | 'all';
  applyType?: ApplyType | 'all';
  keyword?: string;
}
