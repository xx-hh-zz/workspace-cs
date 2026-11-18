import { Modal, Descriptions, Timeline } from 'antd';
import { APPLY_TYPE_MAP, FORM_STATUS_MAP } from '@/constants/enums';
import type { WorkflowForm } from '@/types/form';

interface DetailModalProps {
  open: boolean;
  data: WorkflowForm | null;
  onClose: () => void;
}

export default function DetailModal({ open, data, onClose }: DetailModalProps) {
  if (!data) return null;
  return (
    <Modal open={open} title="申请详情" onCancel={onClose} footer={null} width={720}>
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="申请编号">{data.id}</Descriptions.Item>
        <Descriptions.Item label="申请人">{data.applicantName}</Descriptions.Item>
        <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
        <Descriptions.Item label="申请类型">{APPLY_TYPE_MAP[data.applyType]}</Descriptions.Item>
        <Descriptions.Item label="申请事由">{data.reason}</Descriptions.Item>
        {data.destination && <Descriptions.Item label="目的地">{data.destination}</Descriptions.Item>}
        {data.amount !== undefined && <Descriptions.Item label="金额">¥{data.amount}</Descriptions.Item>}
        {data.expectedDate && <Descriptions.Item label="期望日期">{data.expectedDate}</Descriptions.Item>}
        {data.remark && <Descriptions.Item label="备注">{data.remark}</Descriptions.Item>}
        <Descriptions.Item label="当前状态">{FORM_STATUS_MAP[data.status]}</Descriptions.Item>
        <Descriptions.Item label="提交时间">{new Date(data.createdAt).toLocaleString()}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: 16 }}>
        <h4>审批历史</h4>
        <Timeline
          items={data.approvalHistory.map((record) => ({
            children: (
              <div>
                <div>
                  <strong>
                    {record.action === 'submit' ? '提交' : record.action === 'approve' ? '通过' : '驳回'}
                  </strong>
                  {' '}— {record.operatorName}
                </div>
                <div style={{ color: '#888', fontSize: 12 }}>{new Date(record.operatedAt).toLocaleString()}</div>
                {record.comment && <div style={{ marginTop: 4 }}>{record.comment}</div>}
              </div>
            ),
          }))}
        />
      </div>
    </Modal>
  );
}
