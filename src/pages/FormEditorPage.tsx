import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Steps, Form, Button, message, Modal, Space } from 'antd';
import { LeftOutlined, SaveOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import StepBasicInfo from '@/components/FormSteps/StepBasicInfo';
import StepDetailInfo from '@/components/FormSteps/StepDetailInfo';
import StepConfirm from '@/components/FormSteps/StepConfirm';
import { useFormDetail } from '@/hooks/useFormDetail';
import { api } from '@/services/api';
import type { WorkflowForm } from '@/types/form';

export default function FormEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [form] = Form.useForm();
  const { data: detail, loading } = useFormDetail(id);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        ...detail,
        expectedDate: detail.expectedDate ? dayjs(detail.expectedDate) : undefined,
      });
    } else if (!id) {
      form.resetFields();
    }
  }, [detail, id, form]);

  const steps = [
    { title: '基本信息', content: <StepBasicInfo /> },
    { title: '详细信息', content: <StepDetailInfo /> },
    { title: '确认提交', content: <StepConfirm values={form.getFieldsValue(true)} /> },
  ];

  const next = async () => {
    try {
      await form.validateFields(
        currentStep === 0
          ? ['applicantName', 'department', 'applyType', 'reason']
          : ['destination', 'amount', 'expectedDate'],
      );
      setCurrentStep(currentStep + 1);
    } catch {
      message.error('请检查表单填写');
    }
  };

  const saveDraft = async () => {
    const values = form.getFieldsValue(true);
    const payload: Partial<WorkflowForm> = {
      ...values,
      id,
      expectedDate: values.expectedDate ? dayjs(values.expectedDate).format('YYYY-MM-DD') : undefined,
      status: 'Draft',
    };
    await api.saveForm(payload);
    message.success('草稿保存成功');
    navigate('/forms');
  };

  const handleSubmit = () => {
    Modal.confirm({
      title: '确认提交',
      content: '提交后将进入审批流程，是否继续？',
      okText: '确认提交',
      cancelText: '取消',
      onOk: async () => {
        setSubmitting(true);
        try {
          const values = form.getFieldsValue(true);
          const payload: Partial<WorkflowForm> = {
            ...values,
            id,
            expectedDate: values.expectedDate ? dayjs(values.expectedDate).format('YYYY-MM-DD') : undefined,
            status: 'Draft',
          };
          const saved = await api.saveForm(payload);
          await api.submitForm(saved.id);
          message.success('提交成功，进入审批流程');
          navigate('/forms');
        } finally {
          setSubmitting(false);
        }
      },
    });
  };

  return (
    <Card loading={loading} title={id ? '编辑申请' : '新建申请'}>
      <Button icon={<LeftOutlined />} onClick={() => navigate('/forms')} style={{ marginBottom: 16 }}>
        返回列表
      </Button>
      <Steps current={currentStep} items={steps.map((s) => ({ title: s.title }))} />
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ applicantName: '当前用户', department: '研发部' }}
        >
          {steps[currentStep].content}
        </Form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          {currentStep > 0 && <Button onClick={() => setCurrentStep(currentStep - 1)}>上一步</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              下一步
            </Button>
          )}
        </Space>
        <Space>
          <Button icon={<SaveOutlined />} onClick={saveDraft}>
            保存草稿
          </Button>
          {currentStep === steps.length - 1 && (
            <Button type="primary" icon={<CheckCircleOutlined />} loading={submitting} onClick={handleSubmit}>
              提交审批
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
}
