const REVOKE_DELAY_MS = 60_000;

interface WritableStream {
  write: (data: Blob) => Promise<void>;
  close: () => Promise<void>;
}

interface FileHandle {
  createWritable: () => Promise<WritableStream>;
}

interface SaveFilePickerType {
  description?: string;
  accept: Record<string, string[]>;
}

type ShowSaveFilePicker = (options?: {
  suggestedName?: string;
  types?: SaveFilePickerType[];
}) => Promise<FileHandle>;

const mimeByExtension: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

function getSaveFilePicker(): ShowSaveFilePicker | null {
  const candidate = (window as unknown as { showSaveFilePicker?: ShowSaveFilePicker })
    .showSaveFilePicker;
  return typeof candidate === 'function' ? candidate : null;
}

function pickerTypesFor(name: string): SaveFilePickerType[] | undefined {
  const dot = name.lastIndexOf('.');
  if (dot < 0) return undefined;
  const ext = name.slice(dot).toLowerCase();
  const mime = mimeByExtension[ext];
  return mime ? [{ accept: { [mime]: [ext] } }] : undefined;
}

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

function anchorDownload(blob: Blob, name: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = name;
  link.rel = 'noopener';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), REVOKE_DELAY_MS);
}

export interface DownloadedFile {
  blob: Blob;
  filename: string;
}

/**
 * Opens the OS "Save As" dialog first (while the click gesture is still fresh) on
 * browsers that support it, then fetches the file; falls back to an <a download> click.
 */
export async function saveFileAs(
  suggestedName: string,
  fetchFile: () => Promise<DownloadedFile>,
): Promise<void> {
  const picker = getSaveFilePicker();

  if (picker) {
    let handle: FileHandle;
    try {
      handle = await picker({ suggestedName, types: pickerTypesFor(suggestedName) });
    } catch (error) {
      if (isAbort(error)) return;
      throw error;
    }
    const { blob } = await fetchFile();
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }

  const { blob, filename } = await fetchFile();
  anchorDownload(blob, suggestedName || filename);
}
