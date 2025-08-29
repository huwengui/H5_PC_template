// API接口定义文件
import request from '@/utils/request';

// 用户相关API
export const login = data => {
  return request.post('/user/login', data);
};

export const getUserInfo = () => {
  return request.get('/user/info');
};

// 数据相关API
export const getDataList = params => {
  return request.get('/data/list', { params });
};

export const getDataDetail = id => {
  return request.get(`/data/${id}`);
};

export const createData = data => {
  return request.post('/data', data);
};

export const updateData = (id, data) => {
  return request.put(`/data/${id}`, data);
};

export const deleteData = id => {
  return request.delete(`/data/${id}`);
};
