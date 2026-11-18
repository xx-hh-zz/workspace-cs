import {
  getForms,
  getFormById,
  saveForm,
  submitForm,
  approveForm,
  rejectForm,
} from './mockData';
import type { WorkflowForm } from '@/types/form';

export const api = {
  getForms,
  getFormById,
  saveForm,
  submitForm,
  approveForm,
  rejectForm,
};

export type { WorkflowForm };
