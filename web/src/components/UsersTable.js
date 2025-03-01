import React, { useEffect, useState } from 'react';
import { API, showError, showSuccess, timestamp2string } from '../helpers';
import {
  Button,
  Form,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from '@douyinfe/semi-ui';
import { ITEMS_PER_PAGE } from '../constants';
import { renderGroup, renderNumber, renderQuota } from '../helpers/render';
import AddUser from '../pages/User/AddUser';
import EditUser from '../pages/User/EditUser';

function renderRole(role) {
  switch (role) {
    case 1:
      return <Tag size='large'>普通用户</Tag>;
    case 10:
      return (
        <Tag color='yellow' size='large'>
          管理员
        </Tag>
      );
    case 100:
      return (
        <Tag color='orange' size='large'>
          超级管理员
        </Tag>
      );
    default:
      return (
        <Tag color='red' size='large'>
          未知身份
        </Tag>
      );
  }
}

const UsersTable = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '分组',
      dataIndex: 'group',
      render: (text, record, index) => {
        return <div>{renderGroup(text)}</div>;
      },
    },
    {
      title: '统计信息',
      dataIndex: 'info',
      render: (text, record, index) => {
        return (
          <div>
            <Space spacing={1}>
              <Tooltip content={'剩余额度'}>
                <Tag color='white' size='large'>
                  {renderQuota(record.quota)}
                </Tag>
              </Tooltip>
              <Tooltip content={'已用额度'}>
                <Tag color='white' size='large'>
                  {renderQuota(record.used_quota)}
                </Tag>
              </Tooltip>
              <Tooltip content={'调用次数'}>
                <Tag color='white' size='large'>
                  {renderNumber(record.request_count)}
                </Tag>
              </Tooltip>
            </Space>
          </div>
        );
      },
    },
    {
      title: '邀请信息',
      dataIndex: 'invite',
      render: (text, record, index) => {
        return (
          <div>
            <Space spacing={1}>
              <Tooltip content={'邀请人数'}>
                <Tag color='white' size='large'>
                  {renderNumber(record.aff_count)}
                </Tag>
              </Tooltip>
              <Tooltip content={'邀请总收益'}>
                <Tag color='white' size='large'>
                  {renderQuota(record.aff_history_quota)}
                </Tag>
              </Tooltip>
              <Tooltip content={'邀请人ID'}>
                {record.inviter_id === 0 ? (
                  <Tag color='white' size='large'>
                    无
                  </Tag>
                ) : (
                  <Tag color='white' size='large'>
                    {record.inviter_id}
                  </Tag>
                )}
              </Tooltip>
            </Space>
          </div>
        );
      },
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text, record, index) => {
        return <div>{renderRole(text)}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => {
        return (
          <div>
            {record.DeletedAt !== null ? (
              <Tag color='red'>已注销</Tag>
            ) : (
              renderStatus(text)
            )}
          </div>
        );
      },
    },
    {
      title: '最后一次调用时间',
      dataIndex: 'last_request_time',
      render: (text) => {
        return <div>{renderTimestamp(text)}</div>;
      },
    },
    {
      title: '',
      dataIndex: 'operate',
      render: (text, record, index) => (
        <div>
          {record.DeletedAt !== null ? (
            <></>
          ) : (
            <>
              <Popconfirm
                title='确定？'
                okType={'warning'}
                onConfirm={() => {
                  manageUser(record.username, 'promote', record);
                }}
              >
                <Button theme='light' type='warning' style={{ marginRight: 1 }}>
                  提升
                </Button>
              </Popconfirm>
              <Popconfirm
                title='确定？'
                okType={'warning'}
                onConfirm={() => {
                  manageUser(record.username, 'demote', record);
                }}
              >
                <Button
                  theme='light'
                  type='secondary'
                  style={{ marginRight: 1 }}
                >
                  降级
                </Button>
              </Popconfirm>
              {record.status === 1 ? (
                <Button
                  theme='light'
                  type='warning'
                  style={{ marginRight: 1 }}
                  onClick={async () => {
                    manageUser(record.username, 'disable', record);
                  }}
                >
                  禁用
                </Button>
              ) : (
                <Button
                  theme='light'
                  type='secondary'
                  style={{ marginRight: 1 }}
                  onClick={async () => {
                    manageUser(record.username, 'enable', record);
                  }}
                  disabled={record.status === 3}
                >
                  启用
                </Button>
              )}
              <Button
                theme='light'
                type='tertiary'
                style={{ marginRight: 1 }}
                onClick={() => {
                  setEditingUser(record);
                  setShowEditUser(true);
                }}
              >
                编辑
              </Button>
              <Popconfirm
                title='确定是否要注销此用户？'
                content='相当于删除用户，此修改将不可逆'
                okType={'danger'}
                position={'left'}
                onConfirm={() => {
                  manageUser(record.username, 'delete', record).then(() => {
                    removeRecord(record.id);
                  });
                }}
              >
                <Button theme='light' type='danger' style={{ marginRight: 1 }}>
                  注销
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchGroup, setSearchGroup] = useState('');
  const [groupOptions, setGroupOptions] = useState([]);
  const [userCount, setUserCount] = useState(ITEMS_PER_PAGE);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState({
    id: undefined,
  });

  const setCount = (data) => {
    if (data.length >= activePage * ITEMS_PER_PAGE) {
      setUserCount(data.length + 1);
    } else {
      setUserCount(data.length);
    }
  };

  const removeRecord = (key) => {
    let newDataSource = [...users];
    if (key != null) {
      let idx = newDataSource.findIndex((data) => data.id === key);

      if (idx > -1) {
        // update deletedAt
        newDataSource[idx].DeletedAt = new Date();
        setUsers(newDataSource);
      }
    }
  };

  const loadUsers = async (startIdx) => {
    const res = await API.get(`/api/user/?p=${startIdx}`);
    const { success, message, data } = res.data;
    if (success) {
      if (startIdx === 0) {
        setUsers(data);
        setCount(data);
      } else {
        let newUsers = users;
        newUsers.push(...data);
        setUsers(newUsers);
        setCount(newUsers);
      }
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const onPaginationChange = (e, { activePage }) => {
    (async () => {
      if (activePage === Math.ceil(users.length / ITEMS_PER_PAGE) + 1) {
        // In this case we have to load more data and then append them.
        await loadUsers(activePage - 1);
      }
      setActivePage(activePage);
    })();
  };

  useEffect(() => {
    loadUsers(0)
      .then()
      .catch((reason) => {
        showError(reason);
      });
    fetchGroups().then();
  }, []);

  const manageUser = async (username, action, record) => {
    const res = await API.post('/api/user/manage', {
      username,
      action,
    });
    const { success, message } = res.data;
    if (success) {
      showSuccess('操作成功完成！');
      let user = res.data.data;
      let newUsers = [...users];
      if (action === 'delete') {
      } else {
        record.status = user.status;
        record.role = user.role;
      }
      setUsers(newUsers);
    } else {
      showError(message);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <Tag size='large'>已激活</Tag>;
      case 2:
        return (
          <Tag size='large' color='red'>
            已封禁
          </Tag>
        );
      default:
        return (
          <Tag size='large' color='grey'>
            未知状态
          </Tag>
        );
    }
  };

  const searchUsers = async (searchKeyword, searchGroup) => {
    if (searchKeyword === '' && searchGroup === '') {
      // if keyword is blank, load files instead.
      await loadUsers(0);
      setActivePage(1);
      return;
    }
    setSearching(true);
    const res = await API.get(
      `/api/user/search?keyword=${searchKeyword}&group=${searchGroup}`,
    );
    const { success, message, data } = res.data;
    if (success) {
      setUsers(data);
      setActivePage(1);
    } else {
      showError(message);
    }
    setSearching(false);
  };

  const handleKeywordChange = async (value) => {
    setSearchKeyword(value.trim());
  };

  const sortUser = (key) => {
    if (users.length === 0) return;
    setLoading(true);
    let sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      return ('' + a[key]).localeCompare(b[key]);
    });
    if (sortedUsers[0].id === users[0].id) {
      sortedUsers.reverse();
    }
    setUsers(sortedUsers);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === Math.ceil(users.length / ITEMS_PER_PAGE) + 1) {
      // In this case we have to load more data and then append them.
      loadUsers(page - 1).then((r) => {});
    }
  };

  const pageData = users.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const closeAddUser = () => {
    setShowAddUser(false);
  };

  const closeEditUser = () => {
    setShowEditUser(false);
    setEditingUser({
      id: undefined,
    });
  };

  const refresh = async () => {
    if (searchKeyword === '') {
      await loadUsers(activePage - 1);
    } else {
      await searchUsers();
    }
  };

  const fetchGroups = async () => {
    try {
      let res = await API.get(`/api/group/`);
      // add 'all' option
      // res.data.data.unshift('all');
      if (res === undefined) {
        return;
      }
      setGroupOptions(
        res.data.data.map((group) => ({
          label: group,
          value: group,
        })),
      );
    } catch (error) {
      showError(error.message);
    }
  };

  function renderTimestamp(timestamp) {
    return <>{timestamp2string(timestamp)}</>;
  }

  return (
    <>
      <AddUser
        refresh={refresh}
        visible={showAddUser}
        handleClose={closeAddUser}
      ></AddUser>
      <EditUser
        refresh={refresh}
        visible={showEditUser}
        handleClose={closeEditUser}
        editingUser={editingUser}
      ></EditUser>
      <Form
        onSubmit={() => {
          searchUsers(searchKeyword, searchGroup);
        }}
        labelPosition='left'
      >
        <div style={{ display: 'flex' }}>
          <Space>
            <Form.Input
              label='搜索关键字'
              icon='search'
              field='keyword'
              iconPosition='left'
              placeholder='搜索用户的 ID，用户名，显示名称，以及邮箱地址 ...'
              value={searchKeyword}
              loading={searching}
              onChange={(value) => handleKeywordChange(value)}
            />
            <Form.Select
              field='group'
              label='分组'
              optionList={groupOptions}
              onChange={(value) => {
                setSearchGroup(value);
                searchUsers(searchKeyword, value);
              }}
            />
            <Button
              label='查询'
              type='primary'
              htmlType='submit'
              className='btn-margin-right'
              style={{ marginRight: 8 }}
            >
              查询
            </Button>
          </Space>
        </div>
      </Form>

      <Table
        columns={columns}
        dataSource={pageData}
        pagination={{
          currentPage: activePage,
          pageSize: ITEMS_PER_PAGE,
          total: userCount,
          pageSizeOpts: [10, 20, 50, 100],
          onPageChange: handlePageChange,
        }}
        loading={loading}
      />
      <Button
        theme='light'
        type='primary'
        style={{ marginRight: 8 }}
        onClick={() => {
          setShowAddUser(true);
        }}
      >
        添加用户
      </Button>
    </>
  );
};

export default UsersTable;
