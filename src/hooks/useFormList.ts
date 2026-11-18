import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { WorkflowForm, FormListQuery } from '@/types/form';

export const useFormList = (query?: FormListQuery) => {
  const [data, setData] = useState<WorkflowForm[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const list = await api.getForms();
    let result = [...list];
    if (query?.status && query.status !== 'all') {
      result = result.filter((f) => f.status === query.status);
    }
    if (query?.applyType && query.applyType !== 'all') {
      result = result.filter((f) => f.applyType === query.applyType);
    }
    if (query?.keyword) {
      const kw = query.keyword.toLowerCase();
      result = result.filter(
        (f) =>
          f.id.toLowerCase().includes(kw) ||
          f.applicantName.toLowerCase().includes(kw) ||
          f.reason.toLowerCase().includes(kw),
      );
    }
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [JSON.stringify(query)]);

  return { data, loading, refresh };
};

export default useFormList;
