import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Form, Row, Spin, Tag } from '@douyinfe/semi-ui';
import {
  compareObjects,
  API,
  showError,
  showSuccess,
  showWarning,
} from '../../../helpers';

export default function SettingsSigning(props) {
  const level = [
    { key: '1', label: '基础用户', value: '1' },
    { key: '2', label: '成员', value: '2' },
    { key: '3', label: '活跃用户', value: '3' },
  ];
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    SigningEnabled: false,
    SigningQuota: '',
    SigningLevel: '',
    UpperQuota: '',
  });
  const refForm = useRef();
  const [inputsRow, setInputsRow] = useState(inputs);

  function onSubmit() {
    debugger
    const updateArray = compareObjects(inputs, inputsRow);
    if (!updateArray.length) return showWarning('你似乎并没有修改什么');
    const requestQueue = updateArray.map((item) => {
      let value = '';
      if (typeof inputs[item.key] === 'boolean') {
        value = String(inputs[item.key]);
      } else {
        value = inputs[item.key];
      }
      return API.put('/api/option/', {
        key: item.key,
        value,
      });
    });
    setLoading(true);
    Promise.all(requestQueue)
      .then((res) => {
        if (requestQueue.length === 1) {
          if (res.includes(undefined)) return;
        } else if (requestQueue.length > 1) {
          if (res.includes(undefined)) return showError('部分保存失败，请重试');
        }
        showSuccess('保存成功');
        props.refresh();
      })
      .catch(() => {
        showError('保存失败，请重试');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const currentInputs = {};
    for (let key in props.options) {
      if (Object.keys(inputs).includes(key)) {
        currentInputs[key] = props.options[key];
      }
    }
    setInputs(currentInputs);
    setInputsRow(structuredClone(currentInputs));
    refForm.current.setValues(currentInputs);
    localStorage.setItem(
      'SigningLevel',
      String(inputs.SigningLevel),
    );
  }, [props.options]);

  return (
    <>
      <Spin spinning={loading}>
        <Form
          values={inputs}
          getFormApi={(formAPI) => (refForm.current = formAPI)}
          style={{ marginBottom: 15 }}
        >
          <Form.Section text={'签到设置'}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Switch
                  field={'SigningEnabled'}
                  label={'启用签到'}
                  size='large'
                  checkedText='｜'
                  uncheckedText='〇'
                  onChange={(value) => {
                    setInputs({
                      ...inputs,
                      SigningEnabled: value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Select
                  label='签到最低等级'
                  optionList={level}
                  field={'SigningLevel'}
                  extraText={'=>配置等级'}
                  placeholder={''}
                  style={{ width: 180 }}
                  onChange={(value) =>
                    setInputs({
                      ...inputs,
                      SigningLevel: String(value),
                    })
                  }
                />
              </Col>
              <Col span={8}>
                <Form.InputNumber
                  label={'获取额度上限 '}
                  step={1}
                  min={1}
                  suffix={'Token'}
                  extraText={'默认下限是50001'}
                  placeholder={'输入token值'}
                  field={'SigningQuota'}
                  onChange={(value) =>
                    setInputs({
                      ...inputs,
                      SigningQuota: String(value),
                    })
                  }
                />
              </Col>
              <Col span={8}>
                <Form.InputNumber
                  label={'用户额度上限 '}
                  step={1}
                  min={1}
                  suffix={'Token'}
                  extraText={'默认5000000，10$'}
                  placeholder={'输入token值'}
                  field={'UpperQuota'}
                  onChange={(value) =>
                    setInputs({
                      ...inputs,
                      UpperQuota: String(value),
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Button size='large' onClick={onSubmit}>
                保存签到设置
              </Button>
            </Row>
          </Form.Section>
        </Form>
      </Spin>
    </>
  );
}
