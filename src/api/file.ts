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

export interface FileInfo {
  file_idx?: number;
  file_name: string;
  file_type?: string;
  file_size?: number;
  file_ownership_idx?: number;
  file_download_url?: string;
  file_remark?: string;
}

export function getFileList() {
  return request({
    url: '/file/files/',
    method: 'get'
  });
}

export function addFile(fileInfo: FileInfo) {
  const csrfToken = getCsrfToken();
  return request({
    url: '/file/upload/',
    method: 'post',
    headers: { 'X-CSRFToken': csrfToken },
    data: fileInfo
  });
}

export function updateFile(fileInfo: FileInfo) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/file/files/${fileInfo.file_idx}/`,
    method: 'put',
    headers: { 'X-CSRFToken': csrfToken },
    data: fileInfo
  });
}

export function addFileURL(file_id: number, url: string) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/file/files/${file_id}/`,
    method: 'patch',
    headers: { 'X-CSRFToken': csrfToken },
    data: { 'file_download_url': url }
  });
}

export function addFileOwnershipId(file_id: number, ownership_id: number) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/file/files/${file_id}/`,
    method: 'patch',
    headers: { 'X-CSRFToken': csrfToken },
    data: { 'file_ownership_idx': ownership_id }
  });
}

export function deleteFile(file_id: number) {
  const csrfToken = getCsrfToken();
  return request({
    url: `/file/files/${file_id}/`,
    method: 'delete',
    headers: { 'X-CSRFToken': csrfToken }
  });
}

export function downloadFile(downloadURL: string) {
  return request({
    url: downloadURL,
    method: 'get'
  });
}

export function getFileContent(file_id: number) {
  return request({
    url: `/file/files/${file_id}`,
    method: 'get'
  });
}
