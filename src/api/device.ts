import request from '@/utils/request';

function getCsrfToken(): string {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.indexOf('csrftoken=') === 0) {
      return trimmed.split('=')[1];
    }
  }
  return '';
}

export interface DeviceInfo {
  device_idx?: number;
  device_name: string;
  device_type?: string;
  device_manager_idx?: number[];
  location_name?: string;
  location_address?: string;
  max_tube_voltage_kv?: number;
  max_tube_current_ma?: number;
  device_QR_code?: string;
  device_remark?: string;
  device_img?: string;
}

export function getDeviceList() {
  return request({
    url: '/device/devices/',
    method: 'get'
  });
}

export function getResponsibleDevice() {
  return request({
    url: '/device/persondevice',
    method: 'get'
  });
}

export function addDevice(deviceInfo: DeviceInfo) {
  const csrfToken = getCsrfToken();
  return request({
    url: '/device/devices/',
    method: 'post',
    headers: { 'X-CSRFToken': csrfToken },
    data: deviceInfo
  });
}

export function updateDevice(deviceInfo: DeviceInfo) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/device/devices/${deviceInfo.device_idx}/`,
    method: 'put',
    headers: { 'X-CSRFToken': csrfToken },
    data: deviceInfo
  });
}

export function deleteDevice(device_idx: number) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/device/devices/${device_idx}/`,
    method: 'delete',
    headers: { 'X-CSRFToken': csrfToken }
  });
}
