import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { WorkflowForm } from '@/types/form';

export const useFormDetail = (id?: string) => {
  const [data, setData] = useState<WorkflowForm | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }
    setLoading(true);
    api.getFormById(id).then((form) => {
      setData(form);
      setLoading(false);
    });
  }, [id]);

  return { data, loading };
};

export default useFormDetail;
