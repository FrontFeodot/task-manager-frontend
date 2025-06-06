export interface IConfirmModal {
  title?: string;
  message?: string;
  args?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback?: (...props: any) => void;
}
