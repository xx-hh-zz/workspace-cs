import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FilterBar from '@/components/FormList/FilterBar';
import StatusTag from '@/components/FormList/StatusTag';
import DetailModal from '@/components/Modals/DetailModal';
import ApproveModal from '@/components/Modals/ApproveModal';
import RejectModal from '@/components/Modals/RejectModal';
import { useFormList } from '@/hooks/useFormList';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { api } from '@/services/api';
import { APPLY_TYPE_MAP } from '@/constants/enums';
import type { WorkflowForm, FormListQuery, FormStatus } from '@/types/form';

const statusFilters: { text: string; value: FormStatus }[] = [
  { text: '草稿', value: 'Draft' },
  { text: '待审批', value: 'Pending' },
  { text: '已通过', value: 'Approved' },
  { text: '已驳回', value: 'Rejected' },
];

export default function FormListPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [query, setQuery] = useState<FormListQuery>({ page: 1, pageSize: 10 });
  const { data, loading, refresh } = useFormList(query);

  const [detailOpen, setDetailOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selected, setSelected] = useState<WorkflowForm | null>(null);

  const handleApprove = async (comment: string) => {
    if (!selected) return;
    await api.approveForm(selected.id, comment);
    message.success('审批通过');
    setApproveOpen(false);
    refresh();
  };

  const handleReject = async (comment: string) => {
    if (!selected) return;
    await api.rejectForm(selected.id, comment);
    message.success('已驳回');
    setRejectOpen(false);
    refresh();
  };

  const columns = [
    { title: '申请编号', dataIndex: 'id', key: 'id', width: 200 },
    { title: '申请人', dataIndex: 'applicantName', key: 'applicantName' },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      key: 'applyType',
      render: (v: WorkflowForm['applyType']) => APPLY_TYPE_MAP[v],
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) => new Date(v).toLocaleString(),
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      filters: statusFilters,
      onFilter: (value: unknown, record: WorkflowForm) => record.status === value,
      render: (v: WorkflowForm['status']) => <StatusTag status={v} />,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: WorkflowForm) => {
        const canEdit = record.status === 'Draft' || record.status === 'Rejected';
        const canApprove = record.status === 'Pending' && (user.role === 'approver' || user.role === 'admin');
        return (
          <Space>
            <Button type="link" onClick={() => { setSelected(record); setDetailOpen(true); }}>
              查看
            </Button>
            {canEdit && (
              <Button type="link" onClick={() => navigate(`/forms/${record.id}/edit`)}>
                编辑
              </Button>
            )}
            {canApprove && (
              <>
                <Button type="link" onClick={() => { setSelected(record); setApproveOpen(true); }}>
                  通过
                </Button>
                <Button type="link" danger onClick={() => { setSelected(record); setRejectOpen(true); }}>
                  驳回
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title="审批列表"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/forms/new')}>
          新建申请
        </Button>
      }
    >
      <FilterBar value={query} onChange={setQuery} />
      <Table
        style={{ marginTop: 16 }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: query.page,
          pageSize: query.pageSize,
          total: data.length,
          onChange: (page, pageSize) => setQuery({ ...query, page, pageSize }),
        }}
      />
      <DetailModal open={detailOpen} data={selected} onClose={() => setDetailOpen(false)} />
      <ApproveModal
        open={approveOpen}
        onCancel={() => setApproveOpen(false)}
        onOk={handleApprove}
      />
      <RejectModal
        open={rejectOpen}
        onCancel={() => setRejectOpen(false)}
        onOk={handleReject}
      />
    </Card>
  );
}
