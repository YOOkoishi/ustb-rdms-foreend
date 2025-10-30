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

export interface PersonDeviceRelation {
  id?: number;
  person_idx?: number;
  person_name?: string;
  device_idx?: number;
  device_name?: string;
  responsibility?: string;
}

export function getRelationList() {
  return request({
    url: '/person_device/relations',
    method: 'get'
  });
}

export function addRelation(relation: PersonDeviceRelation) {
  const csrfToken = getCsrfToken();
  return request({
    url: '/person_device/relations/',
    method: 'post',
    headers: { 'X-CSRFToken': csrfToken },
    data: relation
  });
}

export function deleteRelation(id: number) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/person_device/relations/${id}/`,
    method: 'delete',
    headers: { 'X-CSRFToken': csrfToken }
  });
}
