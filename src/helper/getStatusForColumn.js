const getStatusForColumn = (status) => {
  return {
    title: 'وضعیت',
    dataIndex: 'status',

    key: 'status',
    render: (status) => {
      return (
        <div style={{ padding: '7px' }}>
          {status ? "فعال" : "غیرفعال"}
        </div>
      );
    },

  }
}