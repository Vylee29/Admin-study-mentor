export interface IFileAttachment {
  fileName: string;
  fileKey: string;
}

export type ReportModel = {
  reportId: string;
  questionName: string;
  FullName: string;
  content: string;
  userId: string;
  attachFiles?: IFileAttachment[];
  createdAt: Date;
  questionId: string;
  questionTitle: string;
  hasFeedback: boolean;
  contentFeedback: string;
};
export type ReportTable = ReportModel;
