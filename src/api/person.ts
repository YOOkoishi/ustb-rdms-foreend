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

export interface PersonInfo {
  person_idx?: number;
  person_name: string;
  person_phone?: string;
  person_email?: string;
  person_department?: string;
  person_remark?: string;
}

export function getPersonList() {
  return request({
    url: '/person/persons',
    method: 'get'
  });
}

export function getResponsibleDevice() {
  return request({
    url: '/device/persondevice',
    method: 'get'
  });
}

export function addPerson(personInfo: PersonInfo) {
  const csrfToken = getCsrfToken();
  return request({
    url: '/person/persons/',
    method: 'post',
    headers: { 'X-CSRFToken': csrfToken },
    data: personInfo
  });
}

export function updatePerson(personInfo: PersonInfo) {
  const csrfToken = getCsrfToken();
  const person_idx = personInfo.person_idx;
  const data = { ...personInfo };
  delete data.person_idx;
  return request({
    url: `/person/persons/${person_idx}/`,
    method: 'put',
    headers: { 'X-CSRFToken': csrfToken },
    data: data
  });
}

export function deletePerson(person_idx: number) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/person/persons/${person_idx}/`,
    method: 'delete',
    headers: { 'X-CSRFToken': csrfToken }
  });
}
