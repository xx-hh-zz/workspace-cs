import type { ApplyType, FormStatus } from '@/types/form';

export const APPLY_TYPE_MAP: Record<ApplyType, string> = {
  travel: '差旅申请',
  purchase: '采购申请',
  reimbursement: '费用报销',
  other: '其他',
};

export const FORM_STATUS_MAP: Record<FormStatus, string> = {
  Draft: '草稿',
  Pending: '待审批',
  Approved: '已通过',
  Rejected: '已驳回',
};

export const APPLY_TYPE_OPTIONS = Object.entries(APPLY_TYPE_MAP).map(([value, label]) => ({
  value: value as ApplyType,
  label,
}));

export const STATUS_OPTIONS = Object.entries(FORM_STATUS_MAP).map(([value, label]) => ({
  value: value as FormStatus,
  label,
}));
