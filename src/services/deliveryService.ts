import { apiGet, apiPost, apiPostForm, apiPut, apiDelete, apiGetBlob } from './httpClient';
import type { Delivery, CreateDeliveryData, UpdateDeliveryData, DeliveryFileVersion } from '../types';

export const deliveryService = {
  getByProject: (projectId: number) => apiGet<Delivery[]>(`/deliveries/project/${projectId}`),
  getById: (id: number) => apiGet<Delivery>(`/deliveries/${id}`),
  create: (payload: CreateDeliveryData) => apiPost<Delivery>('/deliveries', payload),
  update: (id: number, payload: UpdateDeliveryData) => apiPut<Delivery>(`/deliveries/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/deliveries/${id}`),
  submitWithFile: (id: number, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiPostForm<Delivery>(`/deliveries/${id}/submission`, form);
  },
  downloadFile: (id: number) => apiGetBlob(`/deliveries/${id}/file`),
  getVersions: (id: number) => apiGet<DeliveryFileVersion[]>(`/deliveries/${id}/versions`),
  downloadVersionFile: (id: number, versionId: number) =>
    apiGetBlob(`/deliveries/${id}/versions/${versionId}/file`),
};
